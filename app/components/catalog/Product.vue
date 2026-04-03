<template>
  <div class="product">
    <div class="product__label">
      <span class="ui-label ui-label--yellow">Хит</span>
    </div>
    <div class="product__image">
      <NuxtImg src="/images/product.jpg" alt="" />
    </div>
    <div class="product__info">
      <div class="product__price">
        <div class="product__price-current">2010 ₽</div>
        <div class="product__price-old">2010 ₽</div>
        <div class="product__price-discount">3%</div>
      </div>
      <div class="product__title">
        Картридж СF259XL для HP LJ Pro M304, LJ Pro M404
      </div>
      <div class="product__nums">
        <div class="product__nums-item product__nums-rating">
          <Icon name="my-icon:icon-star" />
          <span>5</span>
        </div>
        <div class="product__nums-item product__nums-reviews">
          <Icon name="my-icon:icon-comment" />
          <span>98</span>
        </div>
      </div>
    </div>
    <div class="product__action">
      <UiButton block>Доставка завтра</UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  border-radius: 16px;
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1023px) {
    gap: 12px;
  }
  &__label {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
    padding: 8px;
    border-radius: 100px;
    color: #ffffff;
    background-color: #eb6d05;
    display: flex;
    height: 24px;
    align-items: center;
    letter-spacing: -2%;
  }
  &__image {
    width: 100%;
    padding: 0 20px;
    aspect-ratio: 1.43;
    @media (max-width: 1023px) {
      padding: 0;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__info {
    padding: 0 6px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__price {
    display: flex;
    gap: 6px;
    align-items: baseline;
    &-current {
      font-size: 24px;
      font-weight: 500;
      line-height: 1;
      @media (max-width: 1023px) {
        font-size: 20px;
      }
    }
    &-old {
      font-size: 18px;
      font-weight: 400;
      line-height: 1.2;
      text-decoration: line-through;
      @media (max-width: 1023px) {
        font-size: 14px;
      }
    }
    &-discount {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.2;
      color: #2fa201;
      @media (max-width: 1023px) {
        font-size: 14px;
      }
    }
  }
  &__title {
    font-size: 18px;
    line-height: 1.4;
    max-width: 300px;
    @media (max-width: 1023px) {
      font-size: 14px;
    }
  }
  &__nums {
    display: flex;
    gap: 16px;
    &-item {
      display: flex;
      gap: 6px;
      align-items: center;
      @media (max-width: 1023px) {
        font-size: 14px;
      }
      .iconify {
        width: 20px;
        height: 20px;
      }
    }
    &-reviews {
      display: flex;
      gap: 6px;
    }
  }
}
</style>
