<template>
    <div class="container">
        <vue-table :table="table" @loading-finish="tableLoadingFinish" @do-search="doSearch" @filter-rows="filterRows"></vue-table>
        <vue-chart class="chart" :loaded="chartLoaded" :chartData="chartData" />
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import VueTable from '../components/VueTable.vue'
import VueChart from '../components/VueChart.vue'
import { useConfigStore } from '../store'
import { useDateUtils } from '../composables/useDateUtils'
import { useFilterRows } from '../composables/useFilterRows'

    const configStore = useConfigStore();
    const baseUrl = configStore.getHostUrl;
    const key = configStore.getKey;
    const path = "/api/stocks";
    const chartData = reactive({});
    const chartLoaded = ref(false);
    let initialRowsData = reactive([]);
    const table = reactive({
      isLoading: false,
      columns: [],
      rows: [],
      totalRecordCount: 0,
    });
    const limit = ref(10);

    const { getDateWithOffset } = useDateUtils()
    const currentDate = computed(() => getDateWithOffset())

    const doSearch = async (offset) => {
      table.isLoading = true;
      chartLoaded.value = false
      let pageNo = 0;
      if (offset && (offset / limit.value) >= 1) {
        pageNo = Math.ceil(((offset+1) / limit.value));
      }
      try {
         const queryParams = new URLSearchParams(
                {dateFrom: currentDate.value, dateTo: currentDate.value, page: pageNo, key: key, limit: limit.value }
            );
            const response = await fetch(`${baseUrl}${path}?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            initialRowsData = data.data;
            table.rows = initialRowsData;
            table.totalRecordCount = data.meta.total;

            const uniqueFields = [...new Set(Object.keys(table.rows[0]))]; 

            // Генерируем массив колонок
            table.columns = uniqueFields.map(field => ({
                label: convertToCamelCase(field),
                field: field,
                width: "3.5%",
                sortable: false
            }));

            const labels = table.rows.map(item => item.barcode)
            const chartValues = table.rows.map(item => item.price);
            
            chartData.labels = labels;
            chartData.datasets = [
                {
                    label: 'Price',
                    backgroundColor: '#f87979',
                    data: chartValues
                }
            ];
            chartLoaded.value = true
        } catch (err) {
            console.error('Error fetching', err);
        }
    };

    function convertToCamelCase(str) {
        return str.replace(/_([a-z])/gi, function(match, letter) {
            return letter.toUpperCase();
        });
    }
    doSearch(0);
    const tableLoadingFinish = () => {
      table.isLoading = false;
    };

    const filterRows = (text) => {
        table.isLoading = true;
        table.rows = useFilterRows(initialRowsData, text.value,["warehouse_name", "supplier_article"])
        table.isLoading = false;
    }
</script>