<script setup>
import PageLayout from "../../components/PageLayout.vue";
import WaveLayout from "../../components/WaveLayout.vue";
import Page01 from "../../components/home/page01.vue";
import Wave01 from "../../components/home/Wave01.vue";
import Page02 from "../../components/home/page02.vue";
</script>

<template>
  <div>
    <PageLayout>
      <Page01 />
    </PageLayout>
    <WaveLayout :waveBgc="{ backgroundColor: '#d0d0d0'}">
      <Wave01 />
    </WaveLayout>
    <PageLayout>
      <Page02 />
    </PageLayout>
  </div>
</template>
