<template>
    <div>
        <h2 class="text-2xl mb-4">Privacy</h2>
        <form class="space-y-4 mx-auto">
        <div class="flex items-center gap-1.5">
            <input type="checkbox" v-model="privacy.searchEngineIndexing">
            <label>Search Engine Indexing</label>
        </div>
        <div>
            <label>Visiblity</label>
            <select v-model="privacy.visibility" class="mb-1">
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
        </div>
        <button type="submit" class="btn-primary">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useSettings } from '@/composables/useSettings';

const { privacy } = useSettings();

</script>