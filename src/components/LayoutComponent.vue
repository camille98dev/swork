<template>
  <!-- eslint-disable -->
  <div class="layout">
    <Layout>
      <Sider
        style="background: #4c4ab6;position: relative;"
        breakpoint="md"
        :width="78"
        v-model="isCollapsed"
      >
        <div style="width: 100%; text-align: center; padding: 7px 0px">
          <img alt="Vue logo" src="../assets/Swork.png" />
        </div>
        <Menu
          active-name="1-2"
          theme="dark"
          width="auto"
          style="background: #4c4ab6"
          :open-names="['1']"
          :class="menuitemClasses"
          v-for="(menu, index) in menubar"
          :key="index"
        >
          <router-link :to="menu.router">
            <MenuItem :name="menu.router">
              <img
                alt=""
                :src="menu.icon2"
                v-if="currentRouteName === menu.pageName"
              />
              <img alt="" :src="menu.icon1" v-else />
            </MenuItem>
          </router-link>
        </Menu>
        <div class="info-icon">
          <router-link to="#">
            <img alt="Vue logo" src="../assets/i.png" />
          </router-link>
        </div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">
          <div
            style="display: flex; justify-content: space-between"
            v-if="currentRouteName === 'MainPage'"
          >
            <div class="compareButtons">
              <Select v-if="tempProject.length == 0"
                v-model="currentProject"
                style=" width: 110px;margin-right: 10px;border: 1px solid #d9d9d9;border-radius: 5px;">
              </Select>
              <Select
                v-if="tempProject.length > 0"
                style=" width: 110px;margin-right: 10px;border: 1px solid #d9d9d9;border-radius: 5px;"
                @on-change="handleChange"
                v-model="currentProject">
                <Option
                  v-for="(project, index) in tempProject"
                  :key="index"
                  :value="index"
                  >{{ project.name ? project.name : '' }}</Option
                >
              </Select>

              <Space style="margin-right: 1rem">
                <Button
                  style="
                    background-color: rgba(76, 74, 182, 0.1);
                    color: #4c4ab6;
                    border: 1px solid #4c4ab6;
                    font-size: 14px;
                    font-weight: 400;
                  "
                  >选择页面路径
                </Button>
              </Space>

              <Space style="margin-right: 1rem">
                <div style="
                  border-radius: 4px;padding: 0 15px;
                  display: flex;align-items: center;cursor: pointer;
                  background-color: rgba(76, 74, 182, 0.1);color: #4c4ab6;border: 1px solid #4c4ab6;font-size: 14px; font-weight: 400;">
                  <FileSelector
                    style="height:32px;display: flex;"
                    accept-extensions=".json"
                    :multiple="false"
                    :max-file-size="5 * 1024 * 1024"
                    @validated="handleFilesValidated"
                    @changed="handleFilesChanged">
                    上传设计稿原图
                  </FileSelector>
                </div>
                <!-- <Button style="background-color: rgba(76, 74, 182, 0.1);color: #4c4ab6;border: 1px solid #4c4ab6;font-size: 14px; font-weight: 400;">
                  <FileSelector
                    accept-extensions=".json"
                    :multiple="false"
                    :max-file-size="5 * 1024 * 1024"
                    @validated="handleFilesValidated"
                    @changed="handleFilesChanged">
                    上传设计稿原图
                  </FileSelector>
                </Button> -->
              </Space>

              <Space style="margin-right: 1rem">
                <Button
                  style="
                    background-color: rgba(76, 74, 182, 0.1);
                    color: #4c4ab6;
                    border: 1px solid #4c4ab6;
                    font-size: 14px;
                    font-weight: 400;
                  "
                  >从figma获取设计图
                </Button>
              </Space>
            </div>
            <div class="compareAllContainer">
              <Space>
                <Button
                  type="primary"
                  :loading="loading2"
                  @click="toLoading2"
                  style="
                    background: #4c4ab6;
                    color: #ffffff;
                    border-radius: 8px;
                    font-size: 14px;
                  "
                >
                  <span v-if="!loading2">执行所有</span>
                  <span v-else>执行所有</span>
                </Button>
              </Space>
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between"
            v-if="currentRouteName === 'CheckCodePage'"
          >
            <div class="compareButtons">
              <Select v-if="tempProject.length == 0"
                v-model="currentProject"
                style=" width: 110px;margin-right: 10px;border: 1px solid #d9d9d9;border-radius: 5px;">
              </Select>
              <Select
                v-if="tempProject.length > 0"
                style=" width: 110px;margin-right: 10px;border: 1px solid #d9d9d9;border-radius: 5px;"
                @on-change="handleChange"
                v-model="currentProject">
                <Option
                  v-for="(project, index) in tempProject"
                  :key="index"
                  :value="index"
                  >{{ project.name ? project.name : '' }}</Option
                >
              </Select>
              <Space style="margin-right: 1rem">
                <div style="
                  border-radius: 4px;padding: 0 15px; 
                  display: flex;align-items: center;cursor: pointer;
                  background-color: rgba(76, 74, 182, 0.1);color: #4c4ab6;border: 1px solid #4c4ab6;font-size: 14px; font-weight: 400;">
                  <FileSelector
                    style="height:32px;display: flex;"
                    accept-extensions=".json"
                    :multiple="false"
                    :max-file-size="5 * 1024 * 1024"
                    @validated="handleFilesValidated"
                    @changed="handleFilesChanged">
                    导入页面路径
                  </FileSelector>
                </div>
              </Space>
            </div>
            <div class="compareAllContainer">
              <Button
                type="primary"
                :loading="loading2"
                @click="toLoading2"
                style="
                  background: #4c4ab6;
                  color: #ffffff;
                  border-radius: 8px;
                  font-size: 14px;
                  margin-left: 20px;
                "
              >
                <span v-if="!loading2">执行所有</span>
                <span v-else>执行所有</span>
              </Button>
            </div>
          </div>
        </Header>
        <Content
          :style="{
            margin: '20px',
            background: '#F5F5F5',
            display: 'flex',
            justifycontent: 'space-between',
          }"
        >
          <slot />
        </Content>
      </Layout>
    </Layout>

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
import { store } from "../store";
import axiosInstance from "@/utils/axiosInstance";
import LoadingComponent from "@/components/LoadingComponent.vue";

import request from "@/utils/request";
// import { fn } from "@/utils/fn";
// console.log("fn", fn)

export default {
  components: {
    LoadingComponent
  },
  data() {
    return {
      showLoading: false,
      isCollapsed: false,
      loading: false,
      loading2: false,
      currentProject: 0,
      tempProject: [],
      projects: [],
      selectedMenu: "",
      store,
      menubar: [
        {
          router: "/main",
          pageName: "MainPage",
          icon1: require("../assets/Tool.png"),
          icon2: require("../assets/Tool1.png"),
        },
        {
          router: "/code",
          pageName: "CheckCodePage",
          icon1: require("../assets/Css.png"),
          icon2: require("../assets/Css1.png"),
        },
        {
          router: "/main",
          icon1: require("../assets/Code.png"),
        },
      ],
    };
  },
  computed: {
    menuitemClasses: function () {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
  mounted: async function () {
    console.log("localStorage.getItem",localStorage.getItem("api_token"));
    try {
      if (localStorage.getItem("api_token")) {
        const response = await axiosInstance.post("/getProjectListInMobile", {
          type: "",
          size: 16,
          keywords: " ",
          order: "desc",
          orderField: "updated_at",
        });

        if (response.data.data.length > 0) {
          this.tempProject = response.data.data;
          this.store.currentProjectID = this.tempProject[this.currentProject]._id;
          this.getDevelopersUnderProject(this.tempProject[this.currentProject]._id)
          // this.getProjectUichecks();

          const menu = response.data.data.map((val) => ({
            label: val.name,
            value: val._id,
          }));

          this.projects = menu;
          console.log(response.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addProjectUicheck(pages) {
      let params = {
        pages: [...pages]
      };

      console.log("params", params)
      this.showLoading = true;

      request.addProjectUicheck(this.store.currentProjectID, params)
      .then((resp) => {
        let data = resp.data;
        console.log("addProjectUicheck data", data)
        this.showLoading = false;

        // to watch and refresh the data from comparePage.vue
        this.store.isAddedJsonFile = true;
        setTimeout(() => {
          this.store.isAddedJsonFile = false;
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    handleFilesValidated(e) {
      console.log("handleFilesValidated", e)
    },
    handleFilesChanged(e) {
      var self = this
      console.log("handleFilesChanged", e)
      if (e[0].name && e[0].name != 'pages.json') {
        console.log("incorrect json file")
        this.$Modal.error({
          title: "Error",
          content: 'The file should be pages.json',
        });
        return
      }

      this.showLoading = true;

      var parseJSONSafely = function(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            console.log(e);
            // Return a default object, or null based on use case.
            return {}
        }
      }

      var fileread = new FileReader();
      if (fileread) {

        fileread.onload = function(e) {
          var content = e.target.result;
          var result = parseJSONSafely(content); // parse json 
          if (result && result.pages) {
            var finalResult = []

            for (var i = 0; i < result.pages.length; i++) {
              var pageItem = result.pages[i]
              var nameArr = pageItem.path.split("/")
              finalResult.push({
                name: nameArr[nameArr.length - 1],
                path: pageItem.path,
                original: '',
                result: '',
                compare: '',
                remark: ''
              })
            }

            console.log("finalResult", finalResult);
            // self.store.jsonPages = finalResult;
            // localStorage.setItem("jsonPages", JSON.stringify(finalResult));
            self.addProjectUicheck(finalResult)
          } else {
            console.log("check json format")
            self.$Modal.error({
              title: "Error",
              content: 'check json format',
            });
          }
        };

        fileread.readAsText(e[0]);
      } else {
        this.showLoading = false;
      }
    },
    toLoading() {
      this.loading = true;
    },
    toLoading2() {
      this.loading2 = true;
    },
    async getDevelopersUnderProject(_id) {
      const response = await axiosInstance.post(
        `/getDevelopersUnderProject/${_id}`
      );

      console.log("getDevelopersUnderProject", response.data);
      this.store.developers = response.data;
    },
    async getProjectUichecks() {
      var self = this;
      if (!self.store.currentProjectID) {
        return
      }
      
      try {
        const response = await axiosInstance.post(
          `getProjectUichecks/${self.store.currentProjectID}`,
          // `/updateProjectUicheck/${self.project_id}/${self.id}`,
          {
            project_id: self.store.currentProjectID,
            id: this.store.login._id,
          }
        );
      } catch (error) {
        console.log(error, "error");
      }
    },
    handleChange(e) {
      var { _id } = this.tempProject[this.currentProject];
      this.store.currentProjectID = _id;
      this.getDevelopersUnderProject(_id);
      // this.getProjectUichecks();
    },
  },
};
</script>
<style scoped>
.info-icon {
  width: 100%;
  text-align: center;
  padding: 7px 0px;
  position: absolute;
  bottom: 0;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
