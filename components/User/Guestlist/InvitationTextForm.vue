<template>
  <form @submit.prevent="setInvitationText()">
    <div class="field has-text-right">
      <button
        type="button"
        class="button is-light"
        @click.prevent="$emit('cancel')"
      >
        Cancel
      </button>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Invitation Text</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              rows="10"
              v-model="form.inviteText"
              placeholder="Invite Text (Optional)"
            />
          </div>
          <div class="help has-text-grey">
            &lt;URL&gt; will be replaced with actual wedding link.
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal" style="margin-top: 1.5rem">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button
              type="submit"
              class="button is-success"
              :disabled="formDisable"
            >
              Set Invitation Text
            </button>
            <button
              type="button"
              class="button is-text"
              @click.prevent="resetForm()"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        inviteText:
          "With great pleasure, we're inviting you to join in the celebration of the marriage of our family members. \n\n<URL>",
      },
    };
  },
  created() {
    this.defaultForm = Object.freeze({ ...this.form });
  },
  computed: {
    formDisable() {
      // TODO:
      return false;
    },
  },
  methods: {
    resetForm() {
      this.form = { ...this.defaultForm };
    },
    setInvitationText() {
      console.log("TODO: addGuestList");
    },
  },
};
</script>

<style>
</style>