<template>
  <form class="deposit-form__wrapper" @submit.prevent="handleSubmit">
    <CardNumberInput
        id="card-number"
        v-model="formState.cardNumber"
        :isErrored="!validationResults.cardNumber.isValid"
        is-required
    >
      <template #leftIcon>
        <div :class="{
          'deposit-form__card-number__icon': validationResults.cardNumber.isValid,
          'icon-invalid': !validationResults.cardNumber.isValid
        }">
          <PiggyIcon></PiggyIcon>
        </div>
      </template>
      <template #label>Card number</template>
      <template #error>
        {{ validationResults.cardNumber.message }}
      </template>
    </CardNumberInput>
    <div class="deposit-form__additional-info">
      <CardNameInput
          id="card-holder"
          v-model="formState.cardHolderName"
          :isErrored="!validationResults.cardHolderName.isValid"
          is-required
      >
        <template #label>Name and surname</template>
        <template #error>
          {{ validationResults.cardHolderName.message }}
        </template>
      </CardNameInput>
      <CVVInput
          id="cvv"
          v-model="formState.cvv"
          :isErrored="!validationResults.cvv.isValid"
          is-required
      >
        <template #label>CVV</template>
        <template #error>
          {{ validationResults.cvv.message }}
        </template>
      </CVVInput>
    </div>
    <Button
        :is-disabled="!isFormValid"
        :type="ButtonType.SUBMIT"
        class="deposit-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<script setup lang="ts">
import { useValidation } from "@/composables/formValidate.ts";

import CardNumberInput from "@/components/CardNumberInput.vue";
import CardNameInput from "@/components/CardNameInput.vue";
import CVVInput from "@/components/CVVInput.vue";
import Button from "@/components/Button.vue";
import { ButtonType } from "@/types/components.js";

import PiggyIcon from '@/assets/icons/piggy.svg?component';

const initialState = {
  cardNumber: '',
  cardHolderName: '',
  cvv: '',
};

const rules = [
  {
    field: 'cardNumber',
    message: 'Card number is required',
    validate: (value: string) => value.trim().length > 0,
  },
  {
    field: 'cardHolderName',
    message: 'Card holder name is required',
    validate: (value: string) => value.trim().length > 0,
  },
  {
    field: 'cvv',
    message: 'CVV is required',
    validate: (value: string) => value.trim().length > 0,
  },
];

const { formState, validationResults, validateAll, isFormValid } = useValidation(initialState, rules);

const handleSubmit = () => {
  validateAll();

  if (isFormValid.value) {
    console.log("Form is valid and ready for submission");
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.deposit-form {
  &__wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }

  &__additional-info {
    display: flex;
    width: 100%;
    gap: 20px;
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__card-number {
    &__icon {
      color: $primary-color;
    }
  }
}
</style>