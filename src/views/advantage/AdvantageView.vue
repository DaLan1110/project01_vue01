<script setup>
import { ref } from 'vue'
import PageLayout from "../../components/PageLayout.vue";
import WaveLayout from "../../components/WaveLayout.vue";
import Page01 from "../../components/advantage/page01.vue";
import Page02 from "../../components/advantage/page02.vue";
import Page03 from "../../components/advantage/page03.vue";
import Wave01 from "../../components/advantage/Wave001.vue";
import Wave02 from "../../components/advantage/Wave002.vue";
import Wave03 from "../../components/advantage/Wave003.vue";

const pageBgcAdvantage = ref('#d0d0d0');

const waveBgcDownAdvantage = ref('#d0d0d0')
</script>

<template>
  <div>
    <PageLayout>
      <Page01 />
    </PageLayout>
    <PageLayout>
      <Page02 />
    </PageLayout>
    <WaveLayout :waveBgc="{ backgroundColor: '#DDDDFF' }">
      <Wave01 />
    </WaveLayout>
    <PageLayout>
      <Page03 />
    </PageLayout>
    <WaveLayout :waveBgc="{ backgroundColor: '#b59ec2' }" :waveBgcDown="waveBgcDownAdvantage">
      <Wave02 />
    </WaveLayout>
    <PageLayout :pageBgc="pageBgcAdvantage">
      <Wave03 />
    </PageLayout>
  </div>
</template>

<style>
</style>
