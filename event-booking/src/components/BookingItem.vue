<template>
    <SectionCard>
        <div class="flex justify-between">
            <div class="flex space-x-1">
                <div> {{ title }} -</div>
                <div>status: {{ status }} </div>
            </div>
            <RoundButton @click="$emit('cancel')" variant="danger">Cancel</RoundButton>
        </div>
        
    </SectionCard>
</template>

<script setup>
import SectionCard from "@/components/SectionCard.vue"
import RoundButton from "@/components/RoundButton.vue";
defineProps({
    title: String,
    status: String,
});
</script>