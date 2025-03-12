<template>
  <main class="max-w-2xl mx-auto px-4">
    <nav class="font-center text-medium text-gray-500 border-b border-gray-200 mb-4">
      <ul class="flex flex-wrap -mb-px">
        <li v-for="tab in tabs" :key="tab.key">
          <TabLink :tab="tab" :currentTab="currentTab" @click="currentTab = tab.key"></TabLink>
        </li>
      </ul>
    </nav>
    <FadeTransition>
      <component :is="currentTabComponent"/>
    </FadeTransition>
  </main>
</template>


<script setup lang="ts">
import TabLink from '@/components/TabLink.vue';
import type {Tab, TabKey} from '@/types';
import { ref, computed } from 'vue';
import GeneralSettings from '@/components/GeneralSettings.vue';
import NotificationSettings from '@/components/NotificationSettings.vue';
import PrivacySettings from '@/components/PrivacySettings.vue';
import FadeTransition from '@/components/FadeTransition.vue';

const tabs: Tab[] = [
  {
    key: 'General',
    label: 'General',
    component: GeneralSettings
  },
  {
    key: 'Notifications',
    label: 'Notifications',
    component: NotificationSettings
  },
  {
    key: 'Privacy',
    label: 'Privacy',
    component: PrivacySettings
  },
];
const currentTab = ref<TabKey>('General');
const currentTabComponent = computed(() => tabs.find(tab => tab.key === currentTab.value)?.component);

</script>



