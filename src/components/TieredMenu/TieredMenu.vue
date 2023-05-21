<template>
  <Portal>
    <transition name="p-connected-overlay">
      <div
        v-if="visible"
        ref="container"
        :id="id"
        :class="containerClass"
        @click="onOverlayClick"
        v-bind="{ ...$attrs }"
      >
        <TieredMenuSub
          :ref="menubarRef"
          :id="id + '_list'"
          class="p-tieredmenu-root-list"
          :tabindex="!disabled ? tabindex : -1"
          role="menubar"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :aria-disabled="disabled || undefined"
          aria-orientation="vertical"
          :aria-activedescendant="focused ? focusedItemId : undefined"
          :menuId="id"
          :focusedItemId="focused ? focusedItemId : undefined"
          :items="processedItems"
          :templates="$slots"
          :activeItemPath="activeItemPath"
          :exact="exact"
          :level="0"
          :pt="pt"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeyDown"
          @item-click="onItemClick"
          @item-mouseenter="onItemMouseEnter"
        />
      </div>
    </transition>
  </Portal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { watch } from 'vue'
import { reactive, useAttrs } from 'vue'
import { uniqueId } from '../../utils/uniqueId'
import ObjectUtil from '../../utils/object-util'
import { computed } from 'vue'

type Props = {
  appendto: string
  model: Array<any>
  popup: boolean
  autoZindex: boolean
  baseZindex: number
  exact: boolean
  disabled: boolean
  tabindex: number
}

const props = withDefaults(defineProps<Props>(), {
  appendto: 'body',
  autoZindex: true,
  baseZindex: 0,
  exact: true,
  disabled: false,
  tabindex: 0
})

const attrs = useAttrs()
let id = (attrs.id as string | undefined) || 'x-tiered-menu'
let focus = ref(false)
let focusedItemInfo = reactive({ index: -1, level: 0, parentKey: "''" })
let activeItemPath = ref([])
let visible = ref(!props.popup)
let ditry = ref(false)

let container = ref<HTMLElement | null>(null)
let outsideClickListener: any = null

watch(
  () => attrs.id,
  (i) => {
    id = i || uniqueId()
  }
)

watch(activeItemPath, (path) => {
  if (!props.popup) {
    if (ObjectUtil.isNotEmpty(path)) {
    }
  }
})

const containerClass = computed(() => {
  return [
    'p-tieredmenu p-component',
    {
      'p-tieredmenu-overlay': props.popup
    }
  ]
})

function bindOutsideClickListener() {
  if (!outsideClickListener) {
    outsideClickListener = (e) => {}
  }
}
</script>
