<script setup>
import { ref, onMounted, computed } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToggleSwitch from 'primevue/toggleswitch'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';


// const prefix = ref('');
const newKey = ref('');
const storageItems = ref([]);

// Fetch all local storage items
const fetchStorageItems = () => {
  const keys = Object.keys(localStorage).filter(key => !key.startsWith('__vue'));
  storageItems.value = keys.map((key) => ({
    key,
    value: localStorage.getItem(key),
  }));
};

// Set a new value in local storage with the prefix
const setValue = () => {
  if (newKey.value) {
    // const fullKey = prefix.value ? `${prefix.value}_${newKey.value}` : newKey.value;
    localStorage.setItem(newKey.value, JSON.stringify(false));
    newKey.value = '';
    fetchStorageItems();
  }
};

// Toggle the value in local storage
const toggleValue = (key) => {
  const currentValue = localStorage.getItem(key);
  const value = JSON.parse(currentValue)
  const newValue = !value;
  localStorage.setItem(key, JSON.stringify(newValue));
  fetchStorageItems();
};

// Computed property to filter storage items
const filteredStorageItems = computed(() => {
  return storageItems.value.filter(item => !item.key.toLowerCase().startsWith('__vue'));
});

// Fetch storage items on component mount
onMounted(fetchStorageItems);
</script>

<template>
  <div class="layout-container">
    <h1>Illumi</h1>
    <InputText class="p-field flex flex-col gap-1" v-model="newKey" placeholder="Feature Flag Name" />
    <!--    <InputText class="p-field" v-model="newValue" placeholder="Value" />-->
    <Button @click="setValue">Add Feature Flag Name</Button>
    <DataTable :value="filteredStorageItems" dataKey="key">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Feature Flags</span>
        </div>
      </template>
      <Column field="key" header="Key"></Column>
      <Column field="value" header="Value"></Column>
      <Column header="Toggle">
        <template #body="slotProps">
          <ToggleSwitch @click="toggleValue(slotProps.data.key)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>
