<template>
    <Bar v-if="loaded" :data="chartData" />
</template>
<script setup>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const props = defineProps({
        chartData: Object,
        loaded: Boolean
    })
</script>