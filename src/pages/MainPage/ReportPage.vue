<template>
  <div>
    <div
      style="
        background: #ffffff;
        height: 30vh;
        margin-left: 20px;
        border-radius: 10px;
      "
    >
      <div
        style="
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 10px 0px 10px;
        "
      >
        <div><Title :level="5">上报swork</Title></div>
        <div style="display: flex; align-items: center">
          <div>
            <Select
              v-model="model2"
              style="
                width: 140px;
                margin-right: 10px;
                border: 1px solid #d9d9d9;
                border-radius: 5px;
              "
              placeholder="选择模块/页面"
            >
              <Option>option</Option>
            </Select>
          </div>

          <div>
            <Select
              v-model="selectedDeveloper"
              style="
                width: 100px;
                margin-right: 10px;
                border: 1px solid #d9d9d9;
                border-radius: 5px;
              "
              placeholder="张珊"
            >
              <Option
                v-for="(developer, index) in store.developers"
                :key="index"
                >{{ developer.developer.name }}</Option
              >
            </Select>
          </div>
          <div><Button style="background: #ffd600">提交到swork</Button></div>
        </div>
      </div>
      <div style="display: flex; margin-top: 20px; align-items: flex-start">
        <textarea
          rows="9"
          placeholder="请输入文字说明……"
          style="
            width: 100%;
            margin: 0px 10px;
            resize: none;
            padding: 10px;
            border: none;
            background-color: #f8f8f8;
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../store";

export default {
  data() {
    return {
      developers: [],
      selectedDeveloper: "",
      project_id: "",
      store,
      model2: ''
    };
  },
  watch: {
    store(newVal) {
      this.project_id = newVal.project_id;
    },
  },
  // mounted: async function () {
  //   try {
  //     if (sessionStorage.getItem("token")) {
  //       console.log(sessionStorage.getItem("token"));

  //       const response = await axiosInstance.post(
  //         `/getDevelopersUnderProject/${this.store.project_id}`,
  //         {
  //           project_id: "",
  //         }
  //       );
  //       this.developers = response.data;

  //       console.log(response.data, "developers");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
</script>

<style></style>
