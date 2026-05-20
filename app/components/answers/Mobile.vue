<template>
  <div class="answers-m">
    <div class="answers-m__top">
      <div class="answers-m__top-title">Часто задаваемые вопросы</div>
    </div>
    <div class="answers-m__list">
      <div class="answer-m">
        <div class="answer-m__text">
          Как узнать, подойдёт ли картридж к моему принтеру?
        </div>
        <div class="answer-m__arrow">
          <Icon name="ds:icon-slider-arrow" :size="10" />
        </div>
      </div>
      <div class="answer-m">
        <div class="answer-m__text">
          Как узнать, подойдёт ли картридж к моему принтеру?
        </div>
        <div class="answer-m__arrow">
          <Icon name="ds:icon-slider-arrow" :size="10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const rating = ref<number>(4);
</script>

<style lang="scss" scoped>
.answers-m {
  background: #fff;
  border-radius: 6px;
  padding: 10px;
  margin: 0 -10px;
  &__top {
    display: flex;
    gap: 14px;
    &-title {
      font-weight: 500;
    }
  }
  &__list {
    margin-top: 5px;
  }
}

.answer-m {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid $borderColor;
  &:last-child {
    border-bottom: none;
  }
  &__text {
    font-size: 14px;
  }
  &__arrow {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    border-radius: 50%;
    background-color: $secondaryColor;
    align-items: center;
    justify-content: center;
    display: flex;
  }
}
</style>
