<template>
  <!-- eslint-disable -->
  <div style="width:100%; display: flex;" >
    <div
    style="background-color:#ffffff; height: calc(100% - 20px); border-radius: 10px">
    <div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin: 20px 0px 20px 20px;
          align-items: center;
          padding-top: 20px;
          font-size: 16px;
          color:#2B2B2B;
          font-weight: 500;
        "
      >
      检测文件和路径
      </div>
    </div>
    <div
      style="
        height: calc(100% - (190px + 52px));
        margin-bottom: 20px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 500px;
      "
    >
      <!-- {{jsonPages}} -->
      <div style="width: 100%; height: 50px">
        <div
          style="
            position: relative;
            display: flex;
            align-items: center;
            margin: 0px 15px 0px 15px;
            height: 110px;
          "
          v-for="(page, index) in store.jsonPages"
          :key="index"
        >
          <div>
            <div style="position: relative">
              <div
                v-if="page.icon"
                class="deleteContainer"
                @click="handleDelete(project_id, id)"
              >
                <img alt="" src="../../assets/delete.png" />
              </div>
              <div v-if="page.icon">
                <img :src="page.icon" />
              </div>
              <!-- <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <img :src="page.icon" />
                  <div class="demo-upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click="handleView(item.name)"
                    ></Icon>
                    <Icon
                      type="ios-trash-outline"
                      @click="handleRemove(item)"
                    ></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template> -->
              <!-- </div> -->
              <UploadComponent
                v-if="!page.icon"
                @on-success-upload="onSuccessUpload($event)"
                :itemIndex="index"
                :upload_config="upload_config"
              />
              <Modal title="View Image" v-model="visible">
                <img
                  :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                  v-if="visible"
                  style="width: 100%"
                />
              </Modal>
            </div>
          </div>
          <div style="width: 100%">
            <div
              style="
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-left: 15px;
              "
            >
              <div>
                <div>
                  <input
                    type="text"
                    v-if="isEditing && this.selectedIndex === index"
                    :defaultValue="page.name"
                    style="
                      border: 1px solid #4c4ab6;
                      border-radius: 5px;
                      margin-left: 2px;
                      padding-left: 10px;
                    "
                    @blur="handleBlur()"
                  />
                  <span
                    v-else
                    style="color: #2b2b2b; font-size: 14px; font-weight: 400"
                    @dblclick="handleEditing(index)"
                    >{{ page.name }}</span
                  >
                </div>
              </div>
              <!-- <Button
                @click="handleUpdate()"
                :style="{ 'font-size': fontSize + 'px' }"
                >比对</Button
              > -->
            </div>
            <div
              style="
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 15px 0px 0px 15px;
                color: #9b9b9b;
                font-size: 14px;
                font-weight: 400;
              "
            >
              <div>
                <div>
                  <span style="margin-right: 10px">文件路径</span>
                  <input
                    type="text"
                    v-if="
                      isEditingIndexPath && this.selectedIndexPath === index
                    "
                    :defaultValue="page.router"
                    style="
                      border: 1px solid #4c4ab6;
                      border-radius: 5px;
                      margin-left: 2px;
                      padding-left: 10px;
                    "
                    @blur="handleBlurIndex()"
                  />
                  <span v-else @dblclick="handleEditIndex(index)">{{
                    page.router
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="flex: 1"><DetectionRules /></div>
    <div style="flex: 1"><TestResult /></div>
  </div>
  
</template>

<script>
/* eslint-disable */

import axiosInstance from "@/utils/axiosInstance";
import { store } from "../../store";
import DetectionRules from "./DetectionRules.vue";
import TestResult from "./TestResult.vue";
import UploadComponent from "./UploadComponent.vue";
export default {
  components: {
    UploadComponent,
    DetectionRules,
    TestResult
  },
  data() {
    return {
      upload_config: {},
      get jsonPages() {
        return JSON.parse(localStorage.getItem("jsonPages")) || [];
      },
      isEditing: false,
      selectedIndex: undefined,
      isEditingIndexPath: false,
      selectedIndexPath: undefined,
      project_id: "",
      id: "",
      store,
      addPage: [],

      imgName: "",
      visible: false,
      uploadList: [],
      Compare: [
        // {
        //   name: "page1",
        //   router: "/pages/index",
        // },
      ],
    };
  },
  methods: {
    onSuccessUpload(e) {
      console.log("onSuccessUpload", e);
      this.store.jsonPages[e.itemIndex].icon = e.result.url;
      this.uploadList.push({
        status: "finished",
        name: this.store.jsonPages[e.itemIndex].name,
        url: e.result.url,
      });
    },
    handleUpdate: async function () {
      const response = await axiosInstance.post(
        `/updateProjectUicheck/${self.project_id}/${self.id}`,
        {
          project_id: "",
          id: this.store.login._id,
        }
      );
      console.log(response, "response");
    },
    onclick(index) {
      this.selectedIndex = index;
      console.log(index, "i am here");
    },
    handleReachBottom() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const last = this.list[this.list.length - 1];
          for (let i = 1; i < 11; i++) {
            this.list.push(last + i);
          }
          resolve();
        }, 2000);
      });
    },
    handleEditing(index) {
      this.isEditing = true;
      this.selectedIndex = index;
    },
    handleBlur() {
      console.log(this.selectedIndex);
      this.isEditing = false;
      this.selectedIndex = undefined;
    },
    handleEditIndex(index) {
      this.isEditingIndexPath = true;
      this.selectedIndexPath = index;
    },
    handleBlurIndex() {
      console.log(this.selectedIndex);
      this.isEditingIndexPath = false;
      this.selectedIndexPath = undefined;
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },

    handleAddpage() {
      console.log(" i am add page");
    },
    async handleDelete(project_id) {
      console.log(project_id, "hello");
      try {
        const response = await axiosInstance.post(
          "deleteProjectUicheck/{project_id}/{id}",
          {
            project_id: "",
            id: this.store.login._id,
          }
        );
        console.log(response, "response");
      } catch (error) {
        console.log(error);
      }
    },
    async getProjectUichecks() {
      var self = this;
      if (!self.project_id && !self.id) {
        return;
      }
      try {
        const response = await axiosInstance.post(
          `getProjectUichecks/${self.project_id}/${self.id}`,

          {
            project_id: "",
            id: this.store.login._id,
          }
        );
        console.log(response, "sample");
      } catch (error) {
        console.log(error, "sample");
        console.log("sample");
      }
    },
    async uploadtoken() {
      var self = this;
      try {
        const response = await axiosInstance.post("/uploadtoken");
        console.log("uploadtoken data", response.data);
        this.upload_config = response.data;
      } catch (error) {
        console.log("error");
      }
    },
  },
  mounted() {
    this.uploadtoken();
    var self = this;
    console.log("this.jsonPages", this.jsonPages);
    // var { upload } = this.$refs;
    // if (upload) {
    //   this.uploadList = this.$refs.upload.fileList;
    // }

    this.getProjectUichecks();
  },
};
</script>

<style>
.spanText {
  font-family: PingFang HK;
  font-style: Medium;
  font-size: 16px;
  color: #2b2b2b;
}

button:hover {
  background-color: green;
}

.list {
  list-style-type: none;
  padding: 5px;
  font-family: PingFang HK;
  font-style: Regular;
  font-size: 14px;
  color: #2b2b2b;
  font-weight: 400;
}

.listText {
  padding: 5px;
}

.alertContainer {
  background: #ffd600;
  border-radius: 10px;
  border: none;
}

.alertTitle {
  margin: 10px;
  font-family: PingFang HK;
  font-style: Medium;
  font-size: 16px;
  color: #2b2b2b;
  font-weight: 500;
}

.alertMainContainer {
  display: flex;
}

.deleteContainer {
  position: absolute;
  top: 1px;
  z-index: 1;
  padding: 2px 8px 2px 8px;
  border-radius: 0px 0px 15px 0px;
  background: #dc0000;
}
</style>
