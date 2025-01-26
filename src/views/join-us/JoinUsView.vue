<script setup>
import { ref } from 'vue'
import PageLayout from "../../components/PageLayout.vue"
import Page01 from '../../components/join-us/page01.vue'

const pageBgcJoinUs = ref('#C7C7E2')
</script>

<template>
  <div>
    <PageLayout :pageBgc="pageBgcJoinUs">
      <Page01/>
    </PageLayout>
  </div>
</template>

<style>
</style>