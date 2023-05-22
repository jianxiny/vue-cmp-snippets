<template>
  <Portal>
    <transition name="p-connected-overlay">
      <div v-if="visible" ref="container" :id="id" :class="containerClass" @click="onOverlayClick" v-bind="{ ...$attrs }">
        <TieredMenuSub :ref="menubarRef" :id="id + '_list'" class="p-tieredmenu-root-list"
          :tabindex="!disabled ? tabindex : -1" role="menubar" :menuId="id"
          :focusedItemId="focused ? focusedItemId : undefined" :items="processedItems" :templates="$slots"
          :activeItemPath="activeItemPath" :exact="exact" :level="0" @focus="onFocus" @blur="onBlur" @keydown="onKeyDown"
          @item-click="onItemClick" @item-mouseenter="onItemMouseEnter" />
      </div>
    </transition>
  </Portal>
</template>

<script setup lang="ts">
import { watch, ref, computed, reactive, useAttrs } from 'vue'
import { uniqueId } from '../../utils/uniqueId'
import ObjectUtil from '../../utils/object-util'
import { overlayBus } from '../lib/overlayeventbus/OverlayEventBus'
import objectUtil from '../../utils/object-util'

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
let focused = ref(false)
let focusedItemInfo = reactive({ index: -1, level: 0, parentKey: "''" })
let activeItemPath = ref([])
let visible = ref(!props.popup)
let ditry = ref(false)

let container = ref<HTMLElement | null>(null)
let menubar = ref<HTMLElement | null>(null)
const menubarRef = (el) => {
  menubar.value = el ? el.$el : null
}
let outsideClickListener: any = null

watch(
  () => attrs.id,
  (i) => {
    id = (i as string) || uniqueId()
  }
)

watch(activeItemPath, (path) => {
  if (!props.popup) {
    if (ObjectUtil.isNotEmpty(path)) {
    }
  }
})

const focusedItemId = computed(() => {
  return focusedItemInfo.index !== -1
    ? `${id}${objectUtil.isNotEmpty(focusedItemInfo.parentKey) ? '_' + focusedItemInfo.parentKey : ''
    }_${focusedItemInfo.index}`
    : null
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
    outsideClickListener = (e) => { }
  }
}

function onOverlayClick(event) {
  overlayBus.emit('overlay-click', {
    originEvent: event,
    target: this.target
  })
}
</script>
