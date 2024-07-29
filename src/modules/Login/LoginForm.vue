<template>
  <div class="login-form">
    <h1 class="login-form__title">Welcome!</h1>
    <form class="login-form__wrapper" @submit.prevent="handleSubmit">
      <Input
          id="username"
          v-model="formState.username"
          :is-errored="!validationResults.username.isValid"
          placeholder="Email"
      >
        <template #leftIcon>
          <MailIcon
              :class="{
                'login-form__input__left-icon': validationResults.username.isValid,
                'icon-invalid': !validationResults.username.isValid
              }"
          />
        </template>
        <template #error>
          <span v-if="!validationResults.username.isValid">
            {{ validationResults.username.message }}
          </span>
        </template>
      </Input>
      <PasswordInput
          id="password"
          v-model="formState.password"
          :is-errored="!validationResults.password.isValid"
          placeholder="Password"
      >
        <template #leftIcon>
          <PasswordIcon
              :class="{
                'login-form__input__left-icon': validationResults.password.isValid,
                'icon-invalid': !validationResults.password.isValid
              }"
          />
        </template>
        <template #error>
          <span v-if="!validationResults.password.isValid">{{ validationResults.password.message }}</span>
        </template>
      </PasswordInput>
      <Button
          :is-disabled="!isFormValid"
          :is-loading="isLoading"
          :type="ButtonType.SUBMIT"
          class="login-form__button"
      >
        Login
      </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useRouter } from 'vue-router';
import { useStore } from '@/stores';

import { useValidation } from "@/composables/formValidate.ts";
import { loginService } from "@/services/auth.ts";

import Input from '@/components/Input.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import Button from '@/components/Button.vue';

import MailIcon from '@/assets/icons/mail.svg?component';
import PasswordIcon from '@/assets/icons/password.svg?component';
import { ButtonType } from "@/types/components.js";

const store = useStore();
const router = useRouter();

const isLoading = ref<boolean>(false);

const initialState = {
  username: '',
  password: '',
};

const rules = [
  {
    field: 'username',
    message: 'Username is required',
    validate: (value: string) => value.trim().length > 0,
  },
  {
    field: 'password',
    message: 'Password is required',
    validate: (value: string) => value.trim().length > 0,
  },
];

const { formState, validationResults, validateAll, isFormValid } = useValidation(initialState, rules);

const handleSubmit = async () => {
  validateAll();

  if (isFormValid.value) {
    try {
      isLoading.value = true;
      await loginService(formState)
      store.state.isAuthenticated = true;
      router.push({ name: 'Deposit' });
    } catch (e: Error) {
      console.error(`There is a error in auth: ${ e?.message }`);
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.login {
  display: flex;
  height: 100vh;

  .decorative-panel {
    display: flex;
    opacity: 1;
    visibility: visible;
    width: 30vw;
    background-color: $background-strong;
    transition: opacity 0.5s ease, visibility 0.5s ease, width 0.5s ease-in-out;

    @include respond-to(lg) {
      transition: opacity 0.5s ease, visibility 0.5s ease, width 0.5s ease-in-out;
      width: 0;

      opacity: 0;
      visibility: hidden;
    }
  }

  .login-form {
    display: flex;
    width: 70vw;
    margin-top: 20vh;
    align-items: center;
    flex-direction: column;

    &__wrapper {
      width: 347px;
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__title {
      color: $primary-color;
      margin-bottom: 40px;
    }

    &__input {
      &__left-icon {
        color: $primary-color;
      }
    }

    &__button {
      margin-top: 19px;
    }
  }
}
</style>
