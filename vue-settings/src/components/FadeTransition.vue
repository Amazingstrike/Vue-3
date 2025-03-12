<template>
    <Transition mode="out-in" name="fade">
        <slot></slot>
    </Transition>
</template>

<style scoped>
 /* we will explain what these classes do next! */
 .fade-enter-active,
 .fade-leave-active {
   transition: all 0.2s ease;
 }
 
 .fade-enter-from,
 .fade-leave-to {
   opacity: 0;
 }
 </style>