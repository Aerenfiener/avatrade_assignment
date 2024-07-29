<template>
  <Input
      id="password"
      v-model="inputValue"
      :type="inputType"
      :is-errored="props.isErrored"
      placeholder="Password"
  >
    <template #label>
      <slot name="label"></slot>
    </template>
    <template #leftIcon>
      <slot name="leftIcon"/>
    </template>
    <template #rightIcon>
      <Button :visual-type="ButtonVisualType.INVISIBLE" @click="onTogglePasswordShown">
        <EyeShowIcon v-if="isPasswordShown" class="password__icon password__icon__eye-show"></EyeShowIcon>
        <EyeHideIcon v-else class="password__icon password__icon__eye-hide"></EyeHideIcon>
      </Button>
    </template>
    <template #error>
      <slot name="error" />
    </template>
  </Input>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

import EyeShowIcon from '@/assets/icons/eye-show.svg?component';
import EyeHideIcon from '@/assets/icons/eye-hide.svg?component';

import { ButtonVisualType, InputType } from "@/types/components.js";

const props = withDefaults(
    defineProps<{
      id: string;
      modelValue: string;
      label?: string;
      type?: string;
      isErrored?: boolean;
      isRequired: boolean,
    }>(),
    {
      isRequired: false,
      isErrored: false,
      type: 'text'
    },
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const isPasswordShown = ref<boolean>(false);
const inputValue = ref<string>(props.modelValue);

const onTogglePasswordShown = (): void => {
  isPasswordShown.value = !isPasswordShown.value;
}

const inputType = computed((): InputType => {
  return isPasswordShown.value ? InputType.TEXT : InputType.PASSWORD;
})

watch(inputValue, (newValue: string) => {
  emits('update:modelValue', newValue);
});
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.password {
  &__icon {
    color: $text-muted;
    cursor: pointer;
  }

  &__icon__eye-show {
    margin-top: 1.9px;
    margin-right: 2.47px;
    width: 20.3px;
    height: 20.3px;
  }

  &__icon__eye-hide {
    width: 24px;
    height: 24px;
  }
}
</style>
