<template>
	<section id="invitation" class="section has-text-centered">
		<div
			data-aos="zoom-in"
			v-if="i.invitation_section.title"
			class="main-title"
		>
			{{ i.invitation_section.title }}
		</div>

		<div v-if="i.invitation_section.show_parents" class="parents">
			<div data-aos="zoom-out-left" data-aos-duration="1000">
				{{ i.parents.name }}
			</div>
			<template v-if="i.parents.andWith">
				<div data-aos="zoom-in">&amp;</div>
				<div data-aos="zoom-out-right" data-aos-duration="1000">
					{{ i.parents.andWith }}
				</div>
			</template>
		</div>

		<div
			data-aos="zoom-in"
			class="intro"
			v-html="i.invitation_section.text"
		/>

		<div
			class="couples"
			:class="{ reverse: i.groom_or_bride_first === 'bride' }"
		>
			<div
				:data-aos="
					i.groom_or_bride_first === 'bride'
						? 'fade-left'
						: 'fade-right'
				"
				data-aos-duration="1000"
				v-html="i.groom[i.invitation_section.couple_name_type]"
			></div>
			<div data-aos="zoom-in" class="amp">&amp;</div>
			<div
				:data-aos="
					i.groom_or_bride_first === 'groom'
						? 'fade-left'
						: 'fade-right'
				"
				data-aos-duration="1000"
				v-html="i.bride[i.invitation_section.couple_name_type]"
			></div>
		</div>

		<div class="date">
			<div data-aos="zoom-in" class="heading-1">
				{{ i.lang === "en" ? "On" : "Pada" }}
			</div>
			<!-- <div data-aos="zoom-in" class="intro-sub">on</div> -->
			<div data-aos="zoom-in" class="heading-2">{{ i.date.greg }}</div>
			<div data-aos="zoom-in" class="heading-2" v-if="i.day">
				{{ i.day }}
			</div>
		</div>

		<div class="time">
			<div data-aos="zoom-in" class="heading-1">
				{{ i.lang === "en" ? "From" : "Masa" }}
			</div>
			<!-- <div data-aos="zoom-in" class="intro-sub">at</div> -->
			<div data-aos="zoom-in" class="heading-2">
				{{ i.time.from }} - {{ i.time.to }}
			</div>
		</div>

		<div class="place">
			<div data-aos="zoom-in" class="heading-1">
				{{ i.lang === "en" ? "At" : "Bertempat di" }}
			</div>
			<!-- <div data-aos="zoom-in" class="intro-sub">at</div> -->
			<div
				data-aos="zoom-in"
				class="heading-2"
				v-html="i.address.exact_html"
			></div>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState({
			i: (state) => state.info,
			currentGuest: (state) => state.protected.currentGuest,
		}),
	},
	mounted() {
		// const { g } = this.$route.query;
		// if (g) {
		//   let el = document.getElementsByClassName("guest")[0];
		//   if (el) {
		//     el.innerHTML = g;
		//     el.classList.add("available");
		//   }
		// }

		const { id } = this.$route.params;
		if (id) {
			this.$store.dispatch("protected/getGuestDetails", id);
		}
	},
	watch: {
		currentGuest: {
			handler(nv) {
				if (nv) {
					let el = document.getElementsByClassName("guest")[0];
					if (el) {
						el.innerHTML = nv.guest;
						el.classList.add("available");
					}
				}
			},
			deep: true,
		},
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
}

@media only screen and (min-width: 520px) {
	.intro {
		width: 80%;
	}
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

.parents,
.couples,
.guest {
	text-transform: uppercase;
	font-style: italic;
	font-weight: bolder;
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
		font-weight: bolder;
		font-size: 1.2rem;
		font-style: italic;
	}
}
</style>

<style lang="scss">
.guest.available {
	display: block;
	margin: 1rem 0;
  text-transform: uppercase;
	font-style: italic;
	font-size: 1.2rem;
	font-weight: bolder;

	&.guest-box {
		padding: 0.5rem 1rem;
		border-radius: 10px;
		border: 1px solid #4a4a4a;
		word-wrap: break-word;
	}
}
</style>


