<template>
  <section
    id="tentative"
    class="hero is-medium has-text-centered"
    :class="'bgt-' + theme"
  >
    <div class="hero-body">
      <div data-aos="zoom-in" class="main-title">{{ t.title }}</div>
      <template v-if="t.style === 'row'">
        <div class="tentatives is-marginless">
          <div
            v-for="(t, index) in sortedT"
            :key="index"
            class="row has-text-centered"
            data-aos="flip-left"
            data-aos-duration="700"
          >
            <div>{{ t.time }}</div>
            <div>{{ t.details }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(t, index) in sortedT"
          :key="index"
          class="columns is-mobile tentatives is-marginless"
        >
          <div
            data-aos="fade-right"
            data-aos-duration="700"
            class="column is-4 has-text-right"
          >
            {{ t.time }}
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="700"
            class="column has-text-left"
          >
            {{ t.details }}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      theme: (state) => state.info.theme,
      t: (state) => state.info.tentative_section,
    }),
    sortedT: function () {
      return this.t.tentatives.sort(function (a, b) {
        return (
          new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
        );
      });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var.scss";
#tentative {
  font-family: $primary-font;
  // text-transform: uppercase;
}

.main-title {
  // font-size: 1rem;
  // margin-bottom: 1rem;
  // font-weight: bold;
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: $countdown-font !important;
}

.tentatives {
  font-size: 1rem;
  .column {
    padding: 0.5rem 0.75rem;
  }

  .row:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>

