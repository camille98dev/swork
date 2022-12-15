<template>
  <!-- eslint-disable -->
  <div style="height:calc(100% - 20px);background: #ffffff; border-radius: 10px;min-width: 500px;">
    <div>
      <div style="
          display: flex;
          justify-content: space-between;
          margin: 20px 0px 20px 20px;
          align-items: center;
          padding-top: 20px;
        ">
        <div>
          <span class="spanText" style="margin-right: 50px">设计原图</span>
          <span class="spanText">开发页面</span>
        </div>
        <div>
          <Button @click="addProjectUicheck()" style="
              background: #4c4ab6;
              color: #ffffff;
              border-radius: 8px;
              font-size: 14px;
              margin-right: 20px;
            ">
            <Icon size="20" type="md-add" />
            添加</Button>
        </div>
      </div>
    </div>
    <div 
      style="height:calc(100% - (190px + 52px));min-height:calc(100% - (190px + 52px));margin-bottom:20px;overflow-y: auto; overflow-x:hidden;width: 500px;">
      <!-- {{jsonPages}} -->
      <div style="width: 100%; height: 50px" v-if="projectUICheckList.length > 0">
        <div style="
            position: relative;
            display: flex;
            align-items: center;
            height: 110px;" 
            class="pages-item"
            :class="[pageIndex == index ? 'active-pages-item' : '']"
            @click="selectPageItem(page, index)"
            v-for="(page, index) in projectUICheckList" :key="index">
          <div>
            <div style="position:relative;">
              <div class="deleteContainer" @click.stop.prevent="deleteProjectUicheck(page)">
                <img alt="" src="../../assets/delete.png" />
              </div>
              <div v-if="page.original">
                <img style="width: 100px;height: 70px;object-fit: contain;" @click="handleView(page.original)" :src="page.original" />
              </div>
              <!-- <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <img :src="page.icon" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template> -->
              <!-- </div> -->
              <div v-if="!page.original">
                <UploadComponent 
                  :parent_self="parent_self"
                  @on-success-upload="onSuccessUpload($event)" 
                  :itemIndex="index" 
                  :upload_config="upload_config" />
              </div>

            </div>
          </div>
          <div style="width: 100%">
            <div style="
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-left: 15px;
              ">
              <div>
                <div @click.stop.prevent>
                  <input type="text" v-if="isEditing && this.selectedIndex === index" :defaultValue="page.name" style="
                      border: 1px solid #4c4ab6;
                      border-radius: 5px;
                      margin-left: 2px;
                      padding-left: 10px;" 
                      v-model="page.name"
                      @blur="updateProjectUicheck($event, page, 'name')" />
                  <span v-else style="color: #2b2b2b; font-size: 14px; font-weight: 400"
                    @dblclick.stop.prevent="handleEditing(index)">{{ page.name }}</span>
                </div>
              </div>
              <Button class="btn-compare" @click.stop.prevent="clickCompare(page)" style="font-size: 14px;">比对</Button>
            </div>
            <div style="
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 15px 0px 0px 15px;
                color: #9b9b9b;
                font-size: 14px;
                font-weight: 400;
              ">
              <div @click.stop.prevent>
                <div>
                  <span style="margin-right:10px;">文件路径</span>
                  <input type="text" v-if="isEditingIndexPath && this.selectedIndexPath === index"
                      :defaultValue="page.path" style="
                      border: 1px solid #4c4ab6;
                      border-radius: 5px;
                      margin-left: 2px;
                      padding-left: 10px;
                    " 
                      v-model="page.path"
                      @blur="updateProjectUicheck($event, page, 'path')" />
                  <span v-else @dblclick.stop.prevent="handleEditIndex(index)">{{page.path}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="alertMainContainer">
      <Alert closable class="alertContainer">
        <div>
          <div class="alertTitle"><span>使用说明</span></div>
          <div class="list">
            <li class="listText">1、开启分离模式；</li>
            <li class="listText">2、放置在左上角；</li>
            <li class="listText">
              3、设置其实坐标，可能H5、小程序、app会有细微差异。
            </li>
          </div>
        </div>
      </Alert>
    </div>

    <Modal title="View Image" v-model="visible">
      <img :src="imgName" style="width: 100%;height: 100%;object-fit: contain;" />
    </Modal>

    <LoadingComponent
      :showFooter="false"
      :width="300"
      :title="''"
      :showModal="showLoading"
      @close="showLoading = false;">
    </LoadingComponent>

  </div>

</template>

<script>
  /* eslint-disable */

import axiosInstance from "@/utils/axiosInstance";
import request from "@/utils/request";
import { store } from "../../store";


import UploadComponent from "./UploadComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    UploadComponent,
    LoadingComponent
  },
  data() {
    return {
      parent_self: {},
      showLoading: false,
      pageIndex: -1,
      upload_config: '',
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
      projectUICheckList: []
    };
  },
  watch: {
    // check store/index.js
    'store.currentProjectID' (nv, ov) {
      this.pageIndex = -1;
      this.projectUICheckList = [];
      this.getProjectUichecks(this.store.currentProjectID);
    },
    'store.isAddedJsonFile' (nv, ov) {
      if (store.isAddedJsonFile) {
        this.projectUICheckList = [];
        this.getProjectUichecks(this.store.currentProjectID);
      }
    },
  },
  created() {
    this.parent_self = this
  },
  mounted() {
    var self = this
    this.uploadtoken()
  },
  methods: {
    addProjectUicheck() {
      let params = {
        pages: [
          {
            name: 'newpage',
            path: 'pages/newpage',
            original: '',
            result: '',
            compare: '',
            remark: ''
          }
        ]
      };

      console.log("params", params)
      this.showLoading = true;

      request.addProjectUicheck(this.store.currentProjectID, params)
      .then((resp) => {
        let data = resp.data;
        console.log("addProjectUicheck data", data)
        this.getProjectUichecks(this.store.currentProjectID);
        this.showLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getProjectUichecks(project_id = '') {
        if (!project_id) return;

        let params = {};
        request.getProjectUichecks(project_id, params)
        .then((resp) => {
          this.projectUICheckList = [];
          let data = resp.data;
          console.log("getProjectUichecks data", data)
          if (data.length > 0) {
            this.projectUICheckList = data;
            console.log("this.projectUICheckList", this.projectUICheckList)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getProjectUicheck({_id, project_id}) {
      console.log("_id", _id);
      console.log("project_id", project_id);

      let params = {};
        
        request.getProjectUicheck(project_id, _id, params)
        .then((resp) => {
          let data = resp.data;
          // console.log("getProjectUicheck data", data)
          if (data) {
            this.$emit('on-select-item-page', data)
          } else {
            this.$emit('on-select-item-page', {})
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    updateProjectUicheck(event, item, type = 'name') {
      let params = item;
      console.log("params", params)
      request.updateProjectUicheck(item.project_id, item._id, params)
      .then((resp) => {
        if (type) {
          if (type == 'name') {
            this.handleBlur();
          } else {
            this.handleBlurIndex()
          }
        }

        let data = resp.data;
        this.$emit('on-select-item-page', data)
        this.getProjectUichecks(this.store.currentProjectID);
        this.$Notice.success({
            title: 'Success',
            desc: 'Item updated'
        });
      })
      .catch((err) => {
        if (type) {
          if (type == 'name') {
            this.handleBlur();
          } else {
            this.handleBlurIndex()
          }
        }
        console.log(err);
      })
    },
    deleteProjectUicheck({_id, project_id}) {
      console.log("_id", _id)
      console.log("project_id", project_id)
      let params = {};
        
      request.deleteProjectUicheck(project_id, _id, params)
      .then((resp) => {
        let data = resp.data;
        this.pageIndex = -1;
        this.$emit('on-select-item-page', data)
        this.getProjectUichecks(this.store.currentProjectID);
        this.$Notice.success({
            title: 'Success',
            desc: 'Item deleted'
        });
      })
      .catch((err) => {
        console.log(err);
      })
    },
    clickCompare(e) {
      console.log("clickCompare",e)
    },
    selectPageItem(item, index) {
      this.pageIndex = index;
      // console.log("selectPageItem", item)
      this.getProjectUicheck(item);
      // this.store.currentJsonPage = this.store.jsonPages[this.pageIndex]
    },
    removeImage(e) {
      this.store.jsonPages[e].icon = '';
      localStorage.setItem("jsonPages", JSON.stringify(this.store.jsonPages));
    },
    onSuccessUpload(e) {
      console.log("onSuccessUpload", this.projectUICheckList[e.itemIndex])

      this.projectUICheckList[e.itemIndex].original = e.result.url;
      this.updateProjectUicheck('', this.projectUICheckList[e.itemIndex] , '')
      
      // this.store.jsonPages[e.itemIndex].icon = e.result.url;
      // localStorage.setItem("jsonPages", JSON.stringify(this.store.jsonPages));
      // this.uploadList.push({
      //   status: 'finished',
      //   name: this.store.jsonPages[e.itemIndex].name,
      //   url: e.result.url
      // })
    },
    handleUpdate: async function () {
      const response = await axiosInstance.post(
        "deleteProjectUicheck/{project_id}/{id}",
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
    uploadtoken() {
      var self = this;

      request.uploadtoken({})
      .then((resp) => {
        let data = resp.data;
        this.upload_config = data;
        console.log("this.upload_config", this.upload_config)
      })
      .catch((err) => {
        console.log(err);
      })

      // try {
      //   const response = axiosInstance.post('/uploadtoken');
      //   this.upload_config = response.data;
      //   console.log("this.upload_config", this.upload_config)
      // } catch (error) {
      //   console.log("error");
      // }
    },
  },
};
</script>

<style scoped>
.pages-item.active-pages-item {
  background-color: rgba(76, 74, 182, 0.1);
}
.pages-item {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px 20px;
}
.spanText {
  font-family: PingFang HK;
  font-style: Medium;
  font-size: 16px;
  color: #2b2b2b;
}

.btn-compare:hover {
  border-color: #FFD600;
  background-color: #FFD600;
  color: #4C4AB6;
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
