<template>
  <div>
    <div v-show="mode === 'addGuestlist'">
      <GuestlistForm @cancel="mode = 'index'" />
    </div>

    <div v-show="mode === 'setInvitationText'">
      <InvitationTextForm @cancel="mode = 'index'" />
    </div>

    <div v-show="mode === 'index'">
      <div class="box">
        <div class="box-title">
          <div class="has-text-right">
            <button
              type="button"
              class="button is-success"
              @click.prevent.stop="mode = 'setInvitationText'"
            >
              Set
            </button>
          </div>
          <div class="title is-4">Invitation Text</div>
        </div>
      </div>

      <div class="box">
        <div class="box-title">
          <div class="has-text-right">
            <button
              type="button"
              class="button is-success"
              @click.prevent.stop="mode = 'addGuestlist'"
            >
              Add
            </button>
          </div>
          <div class="title is-4">Guestlist</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuestlistForm from "./GuestlistForm.vue";
import InvitationTextForm from "./InvitationTextForm.vue";
export default {
  components: { GuestlistForm, InvitationTextForm },
  data() {
    return {
      mode: "index",
    };
  },
};
</script>

<style lang="scss">
.box-title {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}
</style>