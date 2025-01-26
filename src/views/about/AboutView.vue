<script setup>
import PageLayout from "../../components/PageLayout.vue";
import WaveLayout from "../../components/WaveLayout.vue";
import Wave01 from "../../components/about/Wave01.vue";
import Page01 from '../../components/about/page01.vue'
</script>

<template>
  <div>
    <PageLayout>
      <Page01 />
    </PageLayout>
    <WaveLayout id="aboutHistory" :waveBgc="{ backgroundColor: '#9a91b8' }">
      <Wave01 />
    </WaveLayout>
  </div>
</template>

<style>
</style>
