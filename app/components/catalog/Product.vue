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
        <div class="product__nums-rating">
          <span>5</span>
        </div>
        <div class="product__nums-reviews">
          <span>98</span>
        </div>
      </div>
      <div class="product__action">
        <button class="ui-button ui-button--yellow">Доставка завтра</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  border-radius: 16px;
  background: #ffffff;
  position: relative;
  &__label {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
  }
  &__image {
    width: 100%;
    aspect-ratio: 1.43;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
