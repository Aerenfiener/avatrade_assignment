<template>
  <div class="modal">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/variables.scss';
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background-color: $background-trace;
  border-radius: 10px;
  border: 1px solid $gray-weak;
  z-index: 1000;
  padding: 20px;

  &__content {
    padding: 20px;
  }
}
</style>
