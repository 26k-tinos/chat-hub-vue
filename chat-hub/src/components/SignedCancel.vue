<template>
  <div 
    class="flex items-center justify-center h-12 w-28 text-2xl rounded-lg button-cancel"
    style="cursor: pointer"
    @click="$store.commit('modelClose')">
    Cancel
  </div>
</template>

<script>
export default {
  name: 'SignedCancel',
  components:{
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
.button-cancel {
    border-color: #6666FF;
    border-width: 1px;
    color: #6666FF;
  }
</style>