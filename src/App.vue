<script setup>
</script>
<template>
  <nav class="nav">
    <RouterLink to="/" class="nav__link">Home</RouterLink>
    <RouterLink to="/incomes" class="nav__link">Incomes</RouterLink>
    <RouterLink to="/stocks" class="nav__link">Stocks</RouterLink>
    <RouterLink to="/orders" class="nav__link">Orders</RouterLink>
    <RouterLink to="/sales" class="nav__link">Sales</RouterLink>
  </nav>
    <RouterView />
</template>

