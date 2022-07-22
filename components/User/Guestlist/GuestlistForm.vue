<template>
  <!-- Guestlist Form -->
  <form @submit.prevent="addGuestList()">
    <div class="field has-text-right">
      <button
        type="button"
        class="button is-light"
        @click.prevent="$emit('cancel')"
      >
        Cancel
      </button>
    </div>

    <div class="field is-horizontal" style="margin-bottom: 2rem">
      <div class="field-label is-normal"></div>
      <div class="field-body">
        <div class="title is-4">
          Invite guests
          <span class="help text-muted">Get link for your specific guest.</span>

          <figure class="image image-guest">
            <img class="is-rounded" src="~/assets/images/guest.PNG" />
          </figure>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Mode</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="radio">
              <input
                type="radio"
                name="mode"
                value="manual"
                v-model="form.mode"
              />
              Manual
            </label>
            <label class="radio">
              <input
                type="radio"
                name="mode"
                value="import"
                v-model="form.mode"
              />
              Import (xls, xlsx, csv)
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- mode: manual -->
    <section v-show="form.mode === 'manual'">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Guest</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="form.guest"
                placeholder="Nazmi &amp; Pasangan"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Tel</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input
                class="input"
                type="number"
                step="1"
                v-model="form.tel"
                placeholder="Tel (whatsapp)"
              />
            </div>
          </div>
          <!-- <div class="field is-narrow">
              <div v-if="phoneNumber" class="control">
                <a :href="formatWhatsappLink(phoneNumber)" target="_blank">
                  <fa :icon="['fab', 'whatsapp']" class="fa-2x whatsapp" />
                </a>
              </div>
            </div> -->
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Pax</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input
                class="input"
                type="number"
                step="1"
                v-model="form.pax"
                placeholder="Pax"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- mode: import -->
    <section v-show="form.mode === 'import'">
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="file has-name">
              <label class="file-label">
                <input
                  ref="fileupload"
                  type="file"
                  @change="onFileChange"
                  accept=".xlsx, .xls, .csv"
                  class="file-input"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <fa icon="upload" />
                  </span>
                  <span class="file-label"> Choose a file </span>
                </span>
              </label>
            </div>
            <p class="help has-text-grey">
              {{ importedGuestlistData.length }} guest{{
                importedGuestlistData.length > 1 ? "s" : ""
              }}
              imported!
            </p>
          </div>
          <!-- <div class="field">
              <button type="button" class="button is-light">Clear Excel</button>
            </div> -->
        </div>
      </div>
    </section>

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
              Add Guestlist
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
import * as XLSX from "xlsx/xlsx.mjs";

export default {
  data() {
    return {
      form: {
        url: "",
        mode: "manual",
        guest: "",
        tel: "",
        pax: "",
      },
      importedGuestlistData: [],
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
    onFileChange(oEvent) {
      let oFile = oEvent.target.files[0];
      if (!oFile) return;

      this.importedGuestlistData = [];
      let reader = new FileReader();

      let self = this;
      reader.onload = function (e) {
        let data = e.target.result;
        data = new Uint8Array(data);
        let workbook = XLSX.read(data, { type: "array" });
        // console.log(workbook);
        let result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            raw: true,
          });
          if (roa.length) result[sheetName] = roa;
        });
        // see the result, caution: it works after reader event is done.
        self.importedGuestlistData = Object.values(result)[0].reduce(
          (out, e) => {
            let TEL = String(e.TEL).replace(/\D/g, "");
            TEL = TEL[0] === "6" ? TEL : `6${TEL}`;
            if (e.GUEST && TEL) {
              out.push({ gues: e.WISHLIST, tel: TEL, pax: e.PAX });
            }

            return out;
          },
          []
        );

        self.$refs.fileupload.value = null;

        if (!self.importedGuestlistData.length) {
          self.$swal.fire({
            position: "top-end",
            icon: "error",
            text: "No guestlist found from imported file! Please ensure file is following correct column format. (GUEST, TEL, PAX(optional))",
            // showConfirmButton: false,
            // timer: 3000,
          });
          return;
        }
        // self.addWishlistModal = true;
        console.log(object);
      };
      reader.readAsArrayBuffer(oFile);
    },
    addGuestList() {
      console.log("TODO: addGuestList");
    },
  },
};
</script>

<style lang="scss">
.image-guest {
  margin-top: 1rem;
  width: 100%;
  border: 1px solid #dcdfe6;
}
</style>