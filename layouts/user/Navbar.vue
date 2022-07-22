<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item no-select" href="/"> My Site </a>

        <a
          role="button"
          class="navbar-burger no-select"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <!-- <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Features </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> Wishlist </a>
              <a class="navbar-item"> Guestlist </a>
            </div>
          </div>
        </div> -->

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-light no-select" @click="doSignOut()">
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function () {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    });
  },
  methods: {
    doSignOut() {
      this.$store.dispatch("auth/signOut").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
</style>