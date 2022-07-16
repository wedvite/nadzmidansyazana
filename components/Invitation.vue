<template>
  <section id="invitation" class="section has-text-centered">
    <div v-if="i.invitation_section.title" class="main-title">{{i.invitation_section.title}}</div>

    <div v-if="i.invitation_section.show_parents" class="parents">
      <div>{{i.parents.father.fullname}}</div>
      <div>&amp;</div>
      <div>{{i.parents.mother.fullname}}</div>
    </div>

    <div class="intro" v-html="i.invitation_section.text"></div>
    <div class="couples" :class="{'reverse': i.groom_or_bride_first === 'bride'}">
      <template v-if="i.invitation_section.couple_name_type === 'fullname'">
        <div v-html="i.groom.fullname"></div>
        <div class="amp">&amp;</div>
        <div v-html="i.bride.fullname"></div>
      </template>
      <template v-else>
        <div>{{i.groom.nickname}}</div>
        <div class="amp">&amp;</div>
        <div>{{i.bride.nickname}}</div>
      </template>
    </div>

    <div class="date">
      <div class="heading-1">{{ i.lang === "en" ? "Date" : "Pada" }}</div>
      <!-- <div class="intro-sub">on</div> -->
      <div class="heading-2">{{ i.date.greg }}</div>
      <div class="heading-2" v-if="i.day">{{ i.day }}</div>
    </div>

    <div class="time">
      <div class="heading-1">
        {{ i.lang === "en" ? "Time" : "Masa" }}
      </div>
      <!-- <div class="intro-sub">at</div> -->
      <div class="heading-2">{{i.time.from}} - {{i.time.to}}</div>
    </div>

    <div class="place">
      <div class="heading-1">
        {{ i.lang === "en" ? "Place" : "Bertempat di" }}
      </div>
      <!-- <div class="intro-sub">at</div> -->
      <div class="heading-2" v-html="i.address.exact_html"></div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      i: state => state.info
    })
  },
  mounted() {
    let g = this.$route.query.g;
    if (g) {
      let el = document.getElementsByClassName('guest')[0];
      if (el) {
        el.innerHTML = g;
        el.classList.add("available");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var.scss";
#invitation {
  font-family: $primary-font;
  // text-transform: uppercase;
}

.main-title {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.intro {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.parents,
.couples {
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  font-weight: bold;

  &.reverse {
    flex-direction: column-reverse;
  }

  & > .amp {
    font-size: 1rem;
  }
}

.parents {
  margin-bottom: 1.5rem;
}

.couples {
  margin-bottom: 2.5rem;
}

.place,
.date,
.time {
  font-size: 1rem;
  margin-bottom: 1.5rem;

  .heading-1 {
    font-size: 0.9rem;
  }

  .heading-2 {
    text-transform: uppercase;
    font-family: $primary-font;
    font-weight: bolder !important;
    font-size: 1.2rem !important;
    font-style: italic;
  }
}
</style>

<style lang="scss">
.guest.available {
  display: block;
  margin: 1rem 0;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.2rem;


  &.guest-box {
    padding: 0.5rem 1rem;
    background: #4a4a4a;
    border-radius: 10px;
    border: 1px solid #4a4a4a;
    word-wrap: break-word;
  }
}
</style>


