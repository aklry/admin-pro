<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: '',
  },
  theme: {
    type: String,
    required: true,
    default: '',
  },
})
onMounted(() => {
  setText()
  setTheme()
})
const tagRef = ref<HTMLElement>()
const setText = () => {
  tagRef.value!.innerHTML = props.text
}
const setTheme = () => {
  tagRef.value!.style.backgroundColor = props.theme
}
</script>

<template>
  <div class="tag-container">
    <span ref="tagRef" class="tag" v-bind="props"></span>
  </div>
</template>

<style scoped lang="less">
.tag-container {
  display: inline-block;

  .tag {
    padding: 5px 10px;
    margin-right: 5px;
    height: 24px;
    font-size: 12px;
    color: #fff;
    border-radius: 15px;
    line-height: 12px;
  }
}
</style>
