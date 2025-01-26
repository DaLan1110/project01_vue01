<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "./components/AppLayout.vue";
import HeadWave from "./components/HeadWave.vue";

import FooterWave from "./components/FootWave.vue";
import FooterContact from "./components/FootContact.vue";

import HomeHeadTitle from "./components/home/Title.vue";
import AboutHeadTitle from "./components/about/AboutTtitle.vue";
import AdvantageHeadTitle from "./components/advantage/AdvantageTitle.vue";
import BranchHeadTitle from "./components/branch/BranchTitle.vue";
import JoinUsHeadTitle from "./components/join-us/JoinUsTitle.vue";
import MenuHeadTitle from "./components/menu/MenuTitle.vue";
import PersonalHeadTitle from "./components/personal/PersonalTitle.vue";
import ShoppingCartNoMidTitle from "./components/order/shoppingCartNoMidTitle.vue";

const route = useRoute();
const showFooterWave = ref(true);

watch(
  () => route.path,
  (newPath) => {
    showFooterWave.value = newPath !== "/join-us";
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <AppLayout id="head" />
    <HeadWave>
      <template #home>
        <HomeHeadTitle />
      </template>
      <template #about>
        <AboutHeadTitle />
      </template>
      <template #advantage>
        <AdvantageHeadTitle />
      </template>
      <template #branch>
        <BranchHeadTitle />
      </template>
      <template #join-us>
        <JoinUsHeadTitle />
      </template>
      <template #menu>
        <MenuHeadTitle />
      </template>
      <template #shoppingCart>
        <ShoppingCartNoMidTitle />
      </template>
      <template #personal>
        <PersonalHeadTitle />
      </template>
    </HeadWave>
    <RouterView />
    <FooterWave v-if="showFooterWave" />
    <FooterContact />
  </div>
</template>

<style scoped>
</style>