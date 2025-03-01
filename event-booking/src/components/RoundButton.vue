<template>
    <button :class="['text-sm font-medium border  rounded-full px-3 py-1', variants[variant] ?? variants.default]" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script setup>
const variants = {
    'default': 'bg-gray-300 border-gray-200 hover:bg-gray-200',
    'danger': 'bg-red-200 enabled:hover:bg-red-100 text-red-900'
};
defineEmits(['click']);
defineProps({
    variant: {
        type: String,
        default: 'default'
    }
})
</script>