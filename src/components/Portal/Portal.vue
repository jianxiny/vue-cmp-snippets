<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <template v-if="inline">
    <slot></slot>
  </template>
  <template v-else-if="mounted">
    <Teleport :to="appendTo">
      <slot></slot>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {domhandler} from "../../utils";

type Props =  {
    appendTo: string, // inline when "self"
    disabled: boolean
}

const props = defineProps<Props>()

const mounted = ref(false)

onMounted(() => {
  mounted.value = domhandler.isClient()
})

let inline = computed(() => props.disabled || props.appendTo === "self")
</script>
