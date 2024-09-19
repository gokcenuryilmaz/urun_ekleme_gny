<template>
  <div class="progress-bar bg-info" role="progressbar" :style="{ width: progress + '%'}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    {{ currentItem }}/10
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: 'AppProgress',
  data() {
    return {
      currentItem: 0,
      progress: 0
    }
  },
  created() {
    this.loadProgressFromLocalStorage();
    eventBus.$on("progressBarUpdated", (productListCount) => {
      this.currentItem = productListCount;
      this.progress = productListCount * 10;
      this.saveProgressToLocalStorage();
    });
  },
  methods: {
    loadProgressFromLocalStorage() {
      const savedProgress = localStorage.getItem('progress');
      if (savedProgress) {
        const { currentItem, progress } = JSON.parse(savedProgress);
        this.currentItem = currentItem;
        this.progress = progress;
      }
    },
    saveProgressToLocalStorage() {
      const progressData = {
        currentItem: this.currentItem,
        progress: this.progress
      };
      localStorage.setItem('progress', JSON.stringify(progressData));
    }
  }
}
</script>

<style scoped>
/* Stil tanımları buraya gelebilir */
</style>
