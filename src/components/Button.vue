<template>
  <div :class="{
    'button': props.visualType === ButtonVisualType.DEFAULT,
    'button-invisible': props.visualType === ButtonVisualType.INVISIBLE,
  }">
    <button :type="props.type" :disabled="props.isDisabled || isLoading" @click="emits('click')">
      <div class="button__content">
        <slot/>
        <span v-if="isLoading && props.visualType !== ButtonVisualType.INVISIBLE" class="button__loader-icon__wrapper">
        <LoaderIcon class="button__loader-icon"></LoaderIcon>
      </span>
      </div>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ButtonType, ButtonVisualType } from "@/types/components.js";
import LoaderIcon from '@/assets/icons/spinner.svg?component';

const props = withDefaults(
    defineProps<{
      isDisabled?: boolean;
      isLoading?: boolean;
      visualType?: ButtonVisualType
      type?: ButtonType;
    }>(),
    {
      isDisabled: false,
      isLoading: false,
      visualType: ButtonVisualType.DEFAULT,
      type: ButtonType.BUTTON
    },
);

const emits = defineEmits(['click'])
</script>