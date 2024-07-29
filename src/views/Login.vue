<template>
  <div class="login">
    <div class="decorative-panel"></div>
    <LoginForm/>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from "@/modules/Login/LoginForm.vue";
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.login {
  display: flex;
  height: 100vh;
  justify-content: center;

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
}
</style>
