<template>
      <router-link to="/login"></router-link>
    <router-view></router-view>
 <!-- <router-link to="/login">Login</router-link> -->
 <!-- <router-view></router-view> -->

</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref()
</script>

<style scoped>

</style>
