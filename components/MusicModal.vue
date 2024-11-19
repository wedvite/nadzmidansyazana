<template>
  <div v-if="show" class="overlay" :class="{ closing: closingAnimation }">
    <div class="content" @click.stop>
      <img
				data-aos="zoom-in"
				data-aos-duration="1000"
				data-aos-delay="500"
				src="~/assets/images/custom/walimatulurus.png"
				alt="walimatulurus"
				style="width: 60%; margin-bottom: 2.5rem"
			/>

			<img
				data-aos="zoom-in"
				data-aos-duration="2000"
				data-aos-delay="500"
				src="~/assets/images/custom/SN.png"
				style="width: 50%; margin-bottom: 3rem"
			/>
      <button
        data-aos="zoom-in"
        data-aos-duration="2000"
        data-aos-delay="500"
        class="toggle-button"
        @click="closeModal"
      >
        Buka
      </button>
    </div>
  </div>
  <div v-else id="music-section">
    <audio  controls autoplay>
      <source src="music.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  name: "MusicModal",
  data() {
    return {
      show: true,
      closingAnimation: false,
    };
  },
  methods: {
    preventDefault(e) {
      e.preventDefault();
    },

    preventDefaultForScrollKeys(e) {
      const keys = {
        37: 1, // left arrow
        38: 1, // up arrow
        39: 1, // right arrow
        40: 1, // down arrow
        32: 1, // spacebar
        33: 1, // pageup
        34: 1, // pagedown
        35: 1, // end
        36: 1, // home
      };

      if (keys[e.keyCode]) {
        this.preventDefault(e);
        return false;
      }
    },

    disableScroll() {
      window.addEventListener("wheel", this.preventDefault, { passive: false });
      window.addEventListener("mousewheel", this.preventDefault, {
        passive: false,
      });
      window.addEventListener("DOMMouseScroll", this.preventDefault, {
        passive: false,
      });
      window.addEventListener("touchmove", this.preventDefault, {
        passive: false,
      });
      window.addEventListener(
        "keydown",
        this.preventDefaultForScrollKeys,
        false
      );
    },

    enableScroll() {
      window.removeEventListener("wheel", this.preventDefault, {
        passive: false,
      });
      window.removeEventListener("mousewheel", this.preventDefault, {
        passive: false,
      });
      window.removeEventListener("DOMMouseScroll", this.preventDefault, {
        passive: false,
      });
      window.removeEventListener("touchmove", this.preventDefault, {
        passive: false,
      });
      window.removeEventListener(
        "keydown",
        this.preventDefaultForScrollKeys,
        false
      );
    },

    closeModal() {
      // Trigger the closing animation
      this.closingAnimation = true;

      // Set a delay to allow the animation to finish before actually changing the show state
      setTimeout(() => {
        this.show = false;
        this.closingAnimation = false;
      }, 1000); // Adjusted delay to match 1-second animation
    },
  },
  watch: {
    show(newVal) {
      if (newVal === true) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
  },
  mounted() {
    if (this.show) {
      this.disableScroll();
    }
  },
  beforeDestroy() {
    this.enableScroll();
  },
};
</script>

<style scoped lang="scss">
$primary-color: #0f133b;
$secondary-color: #83578E;

/* Full-screen overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 1s ease, transform 1s ease; /* 1-second transition */
}

.overlay.closing {
  opacity: 0;
  transform: translateY(-100%); /* Simulate door closing animation */
}

.content {
  // background: $primary-color;
  background-image: url("~assets/frames/custom/custom.png");
  background-size: 100% auto;
  background-position: center center;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 520px;
  height: 100vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

/* Button inside the content */
.toggle-button {
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  background-color: $secondary-color;
  color: #F7F7F7;
  border: none;
  border-radius: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.toggle-button:hover {
  background-color: $primary-color;
  color: #F7F7F7;
  transform: scale(1.05);
}

.toggle-button:focus {
  outline: none;
}

#music-section {
  background: $primary-color;
  display: flex;
}

/* Style the audio player to make it slim */
audio {
	width: 90%;
	height: 30px; /* Slim height */
	border-radius: 20px; /* Optional rounded corners */
	background-color: #f5f5f5; /* Background color */
	border: none;
	outline: none;
  margin: auto;
}
</style>
