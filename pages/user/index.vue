<template>
  <div class="columns">
    <div class="column is-one-fifth">
      <aside class="menu">
        <!-- <p class="menu-label">General</p> -->
        <ul class="menu-list">
          <li v-for="(list, index) in menuList" :key="index">
            <a
              role="button"
              class="pointer"
              :class="{ 'is-active': currentMenu === list.value }"
              @click="currentMenu = list.value"
            >
              {{ list.label }}
            </a>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <component :is="currentMenu" />
    </div>
  </div>
</template>

<script>
import Wishlist from "~/components/User/Wishlist";
import Guestlist from "~/components/User/Guestlist/index";
export default {
  layout: "user",
  middleware: ["authenticated"],
  components: { Wishlist, Guestlist },
  data() {
    return {
      currentMenu: "Wishlist",
      menuList: [
        { label: "Wishlist", value: "Wishlist" },
        { label: "Guestlist", value: "Guestlist" },
      ],
    };
  },
};
</script>

<style>
</style>