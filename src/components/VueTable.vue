<template>
     <div>
        <label>FilterBy (warehouse_name and supplier_article):</label><input v-model="filterTerm" />
    </div>
    <vue-table-lite
        :is-loading="table.isLoading"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        @do-search="doSearch"
        @is-finished="tableLoadingFinish"
        class="table"
    ></vue-table-lite>
</template>
<script setup>
    import { ref, watch} from 'vue';
    import VueTableLite from "vue3-table-lite";
    const props = defineProps({
        table: Object
    })
    const filterTerm = ref("");
    const emit = defineEmits(['loadingFinish', 'doSearch', 'filterRows'])
    const tableLoadingFinish = () => {
      emit("loadingFinish");
    };

    const doSearch = (e) => {
        emit("doSearch",e);
    }

    watch(filterTerm, () => {
        emit("filterRows", filterTerm);
    });
</script>
