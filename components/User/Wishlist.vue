<template>
  <div>
    <vue-good-table
      id="wishlist-table"
      :columns="columns"
      :rows="wishlist"
      :line-numbers="true"
      :sort-options="sortOpts"
      :pagination-options="paginationOpts"
      theme="nocturnal"
      styleClass="vgt-table condensed bordered"
    >
      <template slot="table-actions">
        <div class="file is-small" style="padding: 0.5rem">
          <label class="file-label">
            <input
              ref="fileupload"
              class="file-input"
              type="file"
              accept=".xlsx, .xls, .csv"
              @change="onFileChange"
            />
            <span class="file-cta">
              <span class="file-icon">
                <fa icon="upload" />
              </span>
              <span class="file-label"> Import (.csv) </span>
            </span>
          </label>
        </div>
      </template>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <button
            class="button is-link is-small"
            @click.prevent="openUpdateModal(props.row)"
          >
            Update
          </button>
          <button
            class="button is-danger is-small"
            @click.prevent="deleteList(props.row)"
          >
            Delete
          </button>
        </span>

        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>
    </vue-good-table>

    <Modal v-model="addWishlistModal" title="Import Wishlist (.csv)">
      <div>
        <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
          <tbody>
            <tr v-for="(list, index) in importedWishlistData" :key="index">
              <td>{{ list.item }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <template slot="confirm">
        <button class="button is-success" @click="doSaveWishlist()">
          Save Wishlist ({{ importedWishlistData.length }})
        </button>
      </template>
    </Modal>

    <Modal
      v-if="updatedData"
      v-model="updateWishlistModal"
      title="Update List"
      :btn-disabled="disableUpdateModalBtn"
      @on-confirm="doUpdateWishlist()"
      @on-close="updatedData = null"
    >
      <div class="field">
        <label class="label">Item</label>
        <div class="control">
          <input v-model="updatedData.item" class="input" type="text" />
        </div>
      </div>

      <div class="field">
        <label class="label">Sponsored By</label>
        <div class="control">
          <input v-model="updatedData.sponsoredBy" class="input" type="text" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "~/components/Common/Modal";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

import { mapState } from "vuex";
import * as XLSX from "xlsx/xlsx.mjs";

export default {
  components: {
    Modal,
    VueGoodTable,
  },
  data() {
    return {
      paginationOpts: {
        enabled: true,
        mode: "records",
        position: "bottom",
        nextLabel: "next",
        prevLabel: "prev",
        rowsPerPageLabel: "Per page",
        ofLabel: "of",
        pageLabel: "page", // for 'pages' mode
      },
      sortOpts: {
        enabled: true,
        initialSortBy: [{ field: "item", type: "asc" }],
      },
      columns: [
        {
          label: "Item",
          field: "item",
          thClass: "has-textcentered item-col",
          tdClass: "has-text-left",
          width: "200px",
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: "Sponsored By",
          field: "sponsoredBy",
          thClass: "has-text-centered sponsor-col",
          tdClass: "has-text-left",
          width: "200px",
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: "Action",
          field: "action",
          type: "string",
          thClass: "has-text-right",
          tdClass: "has-text-right",
          sortable: false,
          width: "160px",
        },
        {
          label: "Timestamp",
          field: "details.unix",
          type: "number",
          hidden: true,
        },
      ],
      addWishlistModal: false,
      updateWishlistModal: false,
      importedWishlistData: [],
      updatedData: null,
    };
  },
  created() {
    this.$store.dispatch("wishlist/getWishlist");
  },
  computed: {
    ...mapState({
      wishlist: (state) => state.wishlist.list,
    }),
    disableUpdateModalBtn() {
      return !this.updatedData?.item;
    },
  },
  methods: {
    openUpdateModal(payload) {
      this.updatedData = {
        id: payload.id,
        item: payload.item,
        sponsoredBy: payload.sponsoredBy || "",
      };
      this.updateWishlistModal = true;
    },
    deleteList(payload) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: `Delete "${payload.item}" from wishlist`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          confirmButtonColor: "#f14668",
        })
        .then((result) => {
          this.$store.dispatch("wishlist/deleteList", payload.id);
          if (result.isConfirmed) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              text: "Item successfully deleted!",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    },
    doSaveWishlist() {
      this.$store.dispatch(
        "wishlist/importWishlist",
        this.importedWishlistData
      );
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        text: "Wishlist successfully imported!",
        showConfirmButton: false,
        timer: 3000,
      });
      this.importedWishlistData = [];
      this.addWishlistModal = false;
    },
    doUpdateWishlist() {
      console.log("doUpdateWishlist", this.updatedData);
      this.$store.dispatch("wishlist/updateList", this.updatedData);
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        text: "Wishlist successfully updated!",
        showConfirmButton: false,
        timer: 3000,
      });
      this.updatedData = null;
      this.updateWishlistModal = false;
    },
    onFileChange(oEvent) {
      let oFile = oEvent.target.files[0];
      if (!oFile) return;

      this.importedWishlistData = [];
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
        self.importedWishlistData = Object.values(result)[0].reduce(
          (out, e) => {
            // let TEL = String(e.TEL).replace(/\D/g, "");
            // TEL = TEL[0] === "6" ? TEL : `6${TEL}`;
            if (e.WISHLIST) {
              out.push({ item: e.WISHLIST });
            }

            return out;
          },
          []
        );

        if (!self.importedWishlistData.length) {
          self.$swal.fire({
            position: "top-end",
            icon: "error",
            text: "No wishlist item found from imported file! Please ensure file is following correct column format. (WISHLIST)",
            // showConfirmButton: false,
            // timer: 3000,
          });
          return
        }
        self.addWishlistModal = true;
        self.$refs.fileupload.value = null;
      };
      reader.readAsArrayBuffer(oFile);
    },
  },
};
</script>

<style lang="scss">
#wishlist-table {
  .item-col,
  .sponsor-col {
    min-width: 200px;
  }
}
</style>