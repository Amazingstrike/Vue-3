<template>
    <SectionCard>
        <div class="flex justify-between">
            <div class="flex space-x-2">
                <div> {{ title }} </div>
                <div><component :is="icon" :class="{'animate-spin': pending }"/></div>
            </div>
            <RoundButton @click="$emit('cancel')" variant="danger">Cancel</RoundButton>
        </div>
        
    </SectionCard>
</template>

<script setup>
import {computed} from 'vue';
import {LoaderCircle, Check} from 'lucide-vue-next';
import SectionCard from "@/components/SectionCard.vue"
import RoundButton from "@/components/RoundButton.vue";

const props = defineProps({
    title: String,
    status: String,
});
defineEmits(['cancel']);
const pending = computed(() => props.status === 'pending');
const icon = computed (() => pending.value ? LoaderCircle : Check);
</script>