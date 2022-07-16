import { fireStoreWishlist as conf } from "~/wedvite.config";
import { fireDb } from "~/plugins/firebase";
import { orderBy } from "lodash";

export const state = () => ({
  list: [],
  loading: false
});

export const actions = {
  getWishlist({ commit }) {
    commit("SET_LOADING", true);
    fireDb
      .collection(conf.collection)
      .doc(conf.doc)
      .onSnapshot(doc => {
        commit("SET_LOADING", false);

        doc = doc.data();
        // console.log("Current data: ", doc);
        if (doc?.list) commit("SET_WISHLIST", Object.values(doc.list));
      });
  },
  updateList({ }, list) {
    if (list?.id) {
      fireDb
        .collection(conf.collection)
        .doc(conf.doc)
        .update({
          [`list.${list.id}`]: list
        })
    }
  }
}

export const mutations = {
  SET_WISHLIST(state, data) {
    state.list = orderBy(data, ['sponsoredBy'], ['desc']);
  },
  SET_LOADING(state, val) {
    state.loading = val;
  }
};