<template>
  <Input
      id="card-holder"
      v-model="inputValue"
      :type="InputType.TEXT"
      :is-errored="props.isErrored"
      :is-required="props.isRequired"
      :mask-function="maskCardName"
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
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue';

import Input from "@/components/Input.vue";

import { InputType } from "@/types/components.ts";

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

const emits = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

const slots = useSlots();
const isLeftIcon = computed(() => !!slots.leftIcon);
const isRightIcon = computed(() => !!slots.rightIcon);
const isLabel = computed(() => !!slots.label);
const isErrorAvailable = computed(() => !!slots.error);

watch(inputValue, (newValue: string) => {
  emits('update:modelValue', newValue);
});

const maskCardName = (value: string): string => {
  return value.toUpperCase();
};
</script>
