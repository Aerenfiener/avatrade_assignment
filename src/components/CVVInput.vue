<template>
  <div class="cvv__input">
  <Input
      id="cvv"
      v-model="inputValue"
      :is-errored="props.isErrored"
      :is-required="props.isRequired"
      :mask-function="maskCVV"
      :type="InputType.TEXT"
  >
    <template v-if="isLabel" #label>
      <slot name="label">CVV</slot>
    </template>
    <template v-if="isLeftIcon" #leftIcon>
      <slot name="leftIcon"/>
    </template>
    <template v-if="isRightIcon" #rightIcon>
      <slot name="leftIcon"/>
    </template>
    <template v-if="isErrorAvailable" #error>
      <slot name="error">Invalid CVV</slot>
    </template>
  </Input>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue';

import Input from "@/components/Input.vue";

import { InputType } from "@/types/components.ts";
import { CVV_MAX_LENGTH } from "@/types/constants.ts";

const props = withDefaults(
    defineProps<{
      id: string;
      modelValue: string;
      isErrored?: boolean;
      isRequired: boolean;
    }>(),
    {
      isRequired: false,
      isErrored: false,
    },
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const slots = useSlots();
const isLeftIcon = computed(() => !!slots.leftIcon);
const isRightIcon = computed(() => !!slots.rightIcon);
const isLabel = computed(() => !!slots.label);
const isErrorAvailable = computed(() => !!slots.error);

const inputValue = ref(props.modelValue);

watch(inputValue, (newValue: string) => {
  emits('update:modelValue', newValue);
});

const maskCVV = (value: string): string => {
  value = value.replace(/\D/g, '');
  if (value.length > CVV_MAX_LENGTH) {
    value = value.slice(0, CVV_MAX_LENGTH);
  }
  return value;
};
</script>

