<template>
  <!-- eslint-disable -->
  <div class="comparisonPageContainer">
    <div class="comparisonTitle">
      <Title :level="5">比对结果</Title>
    </div>
    <div v-if="selected_item_page.original" class="comparisonArea">
      <img alt="" style="width:100%;;object-fit: contain;" :src="selected_item_page.original" />
    </div>
    <div v-if="!selected_item_page.original" class="comparisonArea empty-box">
        <div>
          <img alt="" style="width:117px;height: 96.64px;" src="../../assets/empty.png" />
          <div style="text-align: center;">
            <span style="color:#2B2B2B;font-size: 14px">空空如也～</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { store } from "../../store";

export default {
  props: {
    selected_item_page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      store,
    };
  },
  watch: {
    selected_item_page(nv, ov) {
      if (nv) {
        console.log("selected_item_page", this.selected_item_page)
      }
    },
  },
};
</script>

<style>
  .empty-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
.comparisonPageContainer {
  background: #ffffff;
  margin-left: 25px;
  height: 55vh;
  border-radius: 10px;
}
.comparisonTitle {
  padding: 20px 0px 5px 20px;
}
.comparisonArea {
  background: #f8f8f8;
  height: 48vh;
  margin: 0px 20px 0px 20px;
  overflow: hidden;
}
</style>
