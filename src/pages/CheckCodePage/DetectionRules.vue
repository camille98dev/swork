<template>
  <div style="display: flex; justify-content: center; background:green;">
    <div
      style="
        background: #ffffff;
        height: 87vh;
        border-radius: 10px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        flex: 1;
      "
    >
      <div style="padding: 15px">
        <Title :level="5">检测规则</Title>
      </div>
      <Scroll :on-reach-bottom="handleReachBottom" height="780">
        <div class="checkBoxMainContainer">
          <div
            class="checkBoxContainer"
            v-for="(detect, index) in detection"
            :key="index"
          >
            <Space direction="vertical" size="large">
              <Checkbox v-model="detect.isChecked" class="checkbox">
                <span class="labelRuleText">{{ detect.Rule }}</span>
              </Checkbox>
            </Space>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      single: false,
      detection: [
        {
          isChecked: "true",
          Rule: "规则1规则1规则1规则1",
        },
        
      ],
    };
  },
  mounted: async function () {
    try {
        const response = await axiosInstance.post("/getProjectListInMobile", {
          type: "",
          size: 16,
          keywords: " ",
          order: "desc",
          orderField: "updated_at",
        });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
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
  },
};
</script>
<style scoped>
.checkBoxContainer {
  margin: 0px 0px 15px 0px;
}
.labelRuleText {
  font-family: PingFang HK;
  font-style: Regular;
  font-size: 14px;
  color: #6b6b6b;
  font-weight: 400;
}
.checkBoxMainContainer {
  padding: 0;
  margin-right: 140px;
}
/* .checkbox ::v-deep .ivu-checkbox.ivu-checkbox-checked {
  background: rebeccapurple;
  margin: 20px;
} */
</style>
