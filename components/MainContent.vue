<template>
  <section
    id="main-content"
    class="hero is-fullheight"
    :class="[
      'bg-' + i.theme,
      'bg-image-' + i.theme,
      i.main_section && i.main_section.text_transform
        ? i.main_section.text_transform
        : 'is-capitalized',
    ]"
  >
    <div class="hero-body">
      <div v-if="!i.override_main" class="container has-text-centered">
        <div data-aos="zoom-in" data-aos-offset="0" :class="'title-' + i.theme">
          {{ i.main_section.title }}
        </div>

        <div
          class="couples"
          :class="[
            'couples-' + i.theme,
            i.groom_or_bride_first === 'bride' ? 'reverse' : '',
            i.main_section && i.main_section.couples_text_transform
              ? i.main_section.couples_text_transform
              : '',
          ]"
        >
          <div
            :data-aos="
              i.groom_or_bride_first === 'bride'
                ? 'fade-left'
                : 'fade-right'
            "
            data-aos-offset="0"
            data-aos-duration="1000"
          >
            {{ i.groom[i.main_section.name_type] }}
          </div>
          <div data-aos="zoom-in" class="amp">&amp;</div>
          <div
            :data-aos="
              i.groom_or_bride_first === 'groom'
                ? 'fade-left'
                : 'fade-right'
            "
            data-aos-offset="0"
            data-aos-duration="1000"
          >
            {{ i.bride[i.main_section.name_type] }}
          </div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-offset="0"
          class="dates"
          :class="'dates-' + i.theme"
        >
          <div class="date-gregorian">{{ i.date.greg }}</div>
          <div v-if="i.date.hijri" class="date-hijri">{{ i.date.hijri }}</div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-offset="0"
          class="venue"
          :class="'venue-' + i.theme"
          v-html="i.address.general"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      i: (state) => state.info,
    }),
  },
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var.scss";

#main-content {
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
}

@media (min-width: 320px) and (max-width: 1024px) and (orientation: landscape) {
  #main-content {
    height: 720px;
  }
}

// .hero-body {
//   margin-bottom: 3rem;
// }

.couples {
  display: flex;
  flex-direction: column;
  font-family: $cover-font;

  &.reverse {
    flex-direction: column-reverse;
  }
}

.date-gregorian,
.venue {
  font-family: $primary-font;
}
</style>

