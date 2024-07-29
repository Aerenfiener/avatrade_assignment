<template>
  <Input
      id="card-number"
      v-model="inputValue"
      :type="InputType.TEXT"
      :is-errored="props.isErrored"
      :is-required="props.isRequired"
      :mask-function="maskCardNumber"
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

const maskCardNumber = (value: string): string => {
  value = value.replace(/\D/g, '');
  if (value.length > 16) {
    value = value.slice(0, 16);
  }
  return value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};
</script>
<style lang="scss" scoped>
.cvv {
  &__input {
    width: 100px;
  }
}
</style>
