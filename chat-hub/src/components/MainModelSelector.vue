<template>
  <div class="flex h-40 pl-20 pt-28 pb-4 items-center">

    <!-- Check Box -->
    <label class="flex items-center text-2xl mr-8 chathub-chat-head">
      <input type="checkbox" :checked="isChecked" @input="$emit('update:checked', $event.target.checked)" class="bg-gray-100 w-6 h-6 mr-4"/>
      Model
    </label>

    <!-- Select -->
    <label class="text-3xl font-bold mr-6 chathub-chat-type">
      <select :value="selectedModel" @input="$emit('update:selectedModel', $event.target.value)">
        <option value="chatgpt">Chat GPT</option>
        <option value="bard">Bard</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MainModelSelector',
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
    selectedModel: {
      type: String,
      default: 'chatgpt',
    },
  },
}
</script>

<style lang="scss" scoped>

</style>