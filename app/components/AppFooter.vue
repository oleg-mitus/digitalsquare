<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__logo">
          <img src="~/assets/images/logo.png" alt="Company Logo" />
        </div>
        <div class="footer__socials">
          <a href="#" target="_blank" class="footer__social-link">
            <Icon name="my-icon:icon-youtube" size="44px" />
          </a>
          <a href="#" target="_blank" class="footer__social-link">
            <Icon name="my-icon:icon-vk" size="44px" />
          </a>
          <a href="#" target="_blank" class="footer__social-link">
            <Icon name="my-icon:icon-market" size="44px" />
          </a>
          <a href="#" target="_blank" class="footer__social-link">
            <Icon name="my-icon:icon-ds" size="44px" />
          </a>
        </div>
      </div>

      <div class="footer__main">
        <div class="footer__col footer__col--contacts">
          <div class="footer__phone">
            <a href="tel:88003334387" class="footer__phone-link"
              >8 800 333 43 87</a
            >
            <p class="footer__phone-desc">c 10:00 до 19:00 мск</p>
          </div>
          <div class="footer__address">
            <p class="footer__address-title">Адрес</p>
            <p class="footer__address-text">
              г. Санкт-Петербург, ул. Кантемировская, 39
            </p>
          </div>
          <button class="footer__btn" @click="handleCallback">
            Заказать обратный звонок
            <Icon name="my-icon:icon-arrow" size="14px" />
          </button>
        </div>

        <div class="footer__col footer__col--nav">
          <div
            v-for="(menu, index) in navigation"
            :key="index"
            class="footer__nav-group"
            :class="{ 'is-active': activeMenu === index }"
          >
            <h4 class="footer__nav-title" @click="toggleMenu(index)">
              {{ menu.title }}
              <Icon
                name="my-icon:icon-caret"
                class="footer__nav-arrow"
                size="12px"
              />
            </h4>
            <ul class="footer__nav-list">
              <li v-for="link in menu.links" :key="link">
                <a href="#" class="footer__nav-link">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__col footer__col--subscribe">
          <h4 class="footer__title">Подпишитесь на акции</h4>
          <form @submit.prevent="subscribe" class="footer__form">
            <div class="footer__subscribe-input">
              <input
                v-model="email"
                type="email"
                placeholder="E-mail"
                required
                class="footer__input"
              />
              <button type="submit" class="footer__submit">
                <Icon name="my-icon:icon-arrow-left" size="16px" />
              </button>
            </div>
            <div class="footer__checkbox">
              <UiCheckbox v-model="agree"
                >Даю согласие на обработку персональных данных</UiCheckbox
              >
            </div>
          </form>
        </div>
      </div>

      <div class="footer__bottom">
        &copy; Copyright (c) 2005-{{ currentYear }} Цифровой квадрат
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface NavGroup {
  title: string;
  links: string[];
}

const email = ref<string>('');
const agree = ref<boolean>(true);
const activeMenu = ref<number | null>(null);
const currentYear = computed(() => new Date().getFullYear());

const navigation: NavGroup[] = [
  {
    title: 'Каталог картриджей',
    links: [
      'Категория 1',
      'Категория 2',
      'Категория 3',
      'Категория 4',
      'Категория 5',
    ],
  },
  {
    title: 'Помощь',
    links: [
      'Как заказать',
      'Оплата заказа',
      'Доставка',
      'Гарантия',
      'Легкий возврат',
      'Акции и скидки',
      'Абонентская программа',
      'Условия работы и продажи',
      'Отследить заказ',
    ],
  },
  {
    title: 'Цифровой квадрат',
    links: [
      'О компании',
      'Статьи',
      'Новости и обзоры',
      'Реквизиты компании',
      'Написать директору',
      'Заправка картриджей в СПБ',
      'Абонентская программа',
      'Условия работы и продажи',
      'Отследить заказ',
    ],
  },
];

const toggleMenu = (index: number) => {
  if (window.innerWidth <= 768) {
    activeMenu.value = activeMenu.value === index ? null : index;
  }
};

const handleCallback = () => {
  alert('Модальное окно обратного звонка');
};

const subscribe = () => {
  console.log('Подписка на:', email.value);
  email.value = '';
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: $footerColor;
  color: #ffffff;
  padding: 30px 40px;
  border-radius: 10px 10px 0 0;

  &__logo {
    img {
      width: 135px;
      height: auto;
      display: block;
    }
  }

  &__container {
    max-width: 1600px;
    margin: 0 auto;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 46px;
  }

  &__socials {
    display: flex;
    gap: 10px;
  }

  &__social-link {
    color: #fff;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }
  }

  &__main {
    display: flex;
    gap: 50px;
    margin-bottom: 40px;
    justify-content: space-between;
  }

  &__col {
    &--nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      flex: 1;
    }
  }

  &__phone {
    display: flex;
    flex-direction: column;
    gap: 6px;
    &-link {
      font-size: 26px;
      color: #fff;
      text-decoration: none;
      &:hover {
        opacity: 0.7;
      }
    }
    &-desc {
      font-size: 14px;
      color: rgba(#ffffff, 0.5);
      margin: 0;
    }
  }

  &__address {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 20px;
    &-text {
      font-size: 14px;
      color: rgba(#ffffff, 0.5);
      margin: 0;
    }
    &-title {
      font-size: 14px;
      margin: 0;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  &__btn {
    margin-top: 30px;
    padding: 10px;
    height: 44px;
    background: #ffffff;
    border: none;
    color: $blackColor;
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    gap: 26px;
    box-sizing: border-box;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }
  }

  &__nav-title {
    margin: 0;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
    .footer__nav-arrow {
      display: none;
    }
  }

  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 10px;
    }
  }

  &__nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    &:hover {
      color: #ccc;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
    position: relative;
    .ui-checkbox {
      font-size: 13px;
      color: rgba(#ffffff, 0.5);
    }
  }
  &__subscribe {
    &-input {
      position: relative;
    }
  }
  &__input {
    height: 44px;
    width: 100%;
    width: 365px;
    max-width: 365px;
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 54px;
    font-size: 14px;
  }

  &__submit {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 2px;
    top: 2px;
    background: #fec93b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      opacity: 0.8;
    }
  }

  &__bottom {
    padding-top: 20px;
    font-size: 12px;
    color: rgba(#ffffff, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px 12px;
    padding-bottom: calc(20px + $bottomBarHeight);
    &__top {
      margin-bottom: 0;
    }
    &__form {
      margin-top: 10px;
    }
    &__main {
      gap: 20px;
      flex-direction: column-reverse;
      margin-top: 20px;
    }
    &__input {
      width: 100%;
      max-width: none;
    }

    &__col--nav {
      grid-template-columns: 1fr;
    }

    &__nav-title {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 15px;

      .footer__nav-arrow {
        display: block;
      }
    }

    &__nav-list {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    &__nav-group.is-active {
      .footer__nav-list {
        max-height: 500px;
        padding-bottom: 15px;
      }
      .footer__nav-arrow {
        transform: rotate(-135deg);
      }
    }

    &__social-link {
      span {
        width: 26px;
        height: 26px;
      }
    }
  }
}
</style>
