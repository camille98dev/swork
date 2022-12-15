<template>
  <div class="comparePageContainer">
    <div><ComparePage @on-select-item-page="onSelectItemPage($event)"/></div>
    <div style="width: 100%; margin-top: 18px">
      <ComparisonResult :selected_item_page="selected_item_page" />
      <ReportPage />
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

import ComparePage from "./ComparePage.vue";
import ComparisonResult from "./ComparisonResult.vue";
import ReportPage from "./ReportPage.vue";
import { store } from "../../store";
console.log("xstore", store)
export default {
  name: "MainPage",
  components: {
    ComparePage,
    ComparisonResult,
    ReportPage,
  },
  data () {
    return {
      store,
      selected_item_page: {}
    };
  },
  watch: {
    // check store/index.js
    'store.currentProjectID' (nv, ov) {
      this.selected_item_page = {};
    },
  },
  methods: {
    onSelectItemPage(e) {
      this.selected_item_page = e;
    },
  },
};
</script>

<style>
.comparePageContainer {
  display: flex;
  width: 100%;
}
</style>
