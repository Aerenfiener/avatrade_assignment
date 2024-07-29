<template>
  <div class="input-group">
    <label v-if="isLabel" :for="id" :class="{ 'text-invalid': props.isErrored }">
      <slot name="label"/>
      <span v-if="props.isRequired">*</span>
    </label>
    <div class="input_wrapper">
      <div class="left-icon">
        <slot name="leftIcon"/>
      </div>
      <div class="right-icon">
        <slot name="rightIcon"/>
      </div>
      <input
          :id="id"
          v-model="inputValue"
          :placeholder="props.placeholder"
          :class="{
          invalid: props.isErrored,
          'input__left-icon': isLeftIcon,
          'input__right-icon': isRightIcon,
        }"
          :type="type"
          class="input"
          @input="onInput"
      />
    </div>
    <div v-if="props.isErrored && isErrorAvailable" class="error-message">
      <slot name="error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, useSlots } from 'vue';

import { InputType } from "@/types/components.ts";

const props = withDefaults(
    defineProps<{
      id: string;
      modelValue: string;
      placeholder?: string;
      label?: string;
      type?: InputType;
      isErrored?: boolean;
      isRequired: boolean;
      maskFunction?: (value: string) => string;
    }>(),
    {
      isRequired: false,
      isErrored: false,
      type: InputType.TEXT,
    },
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'input', value: string): void;
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

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  if (props.maskFunction) {
    value = props.maskFunction(value);
  }

  inputValue.value = value;
  emits('input', value);
};
</script>