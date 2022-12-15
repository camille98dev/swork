<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <div
      style="
        background: #ffffff;
        flex: 1;
        height: 87vh;
        border-radius: 10px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
      "
    >
      <div style="display: flex; margin: 20px; flex-direction: column">
        <div>
          <Title :level="5" style="margin-right: 50px">检测结果</Title>
        </div>
        <Scroll :on-reach-bottom="handleReachBottom" height="780">
          <div class="detectionTextContainer">
            <div class="detectionText">
              <span>规则1规则1规则1规则1</span>
              <Button
                type="default"
                ghost
                style="
                  background: #d9d9d9;
                  border: 1px solid #d9d9d9;
                  color: #9b9b9b;
                "
                >通过</Button
              >
            </div>
            <div class="detectionText">
              <span>规则3规则3规则3规则3</span>
              <Button
                type="default"
                ghost
                style="border: 1px solid #ffd600; color: #ffd600"
                >不通过</Button
              >
            </div>
          </div>
          <div class="improvementIdeaContainer">
            <div class="improvementTitle">
              <span class="titleText">改进意见</span>
            </div>
            <div class="improvementComment">
              <span class="improveText"
                >改进意见改进意见改进意见改进意见，改进意见改进意见改
                进改进意见改进意见改进意见改进意见改进意见。改进意见
                改进意见改进意见意见！</span
              >
            </div>
          </div>
          <div class="detectionTextContainer">
            <div class="detectionText">
              <span>规则4规则4规则4规则4规则4规则4规则4规则4规则4</span>
              <Button
                type="default"
                ghost
                style="
                  background: #d9d9d9;
                  border: 1px solid #d9d9d9;
                  color: #9b9b9b;
                "
                >通过</Button
              >
            </div>
            <div class="detectionText">
              <span>规则1规则1规则1规则1</span>
              <Button
                type="default"
                ghost
                style="
                  background: #d9d9d9;
                  border: 1px solid #d9d9d9;
                  color: #9b9b9b;
                "
                >通过</Button
              >
            </div>
            <div class="detectionText">
              <span>规则3规则3规则3规则3</span>
              <Button
                type="default"
                ghost
                style="border: 1px solid #ffd600; color: #ffd600"
                >不通过</Button
              >
            </div>
          </div>
          <div class="improvementIdeaContainer">
            <div class="improvementTitle">
              <span class="titleText">改进意见</span>
            </div>
            <div class="improvementComment">
              <span class="improveText"
                >改进意见改进意见改进意见改进意见，改进意见改进意见改
                进改进意见改进意见改进意见改进意见改进意见。改进意见
                改进意见改进意见意见！</span
              >
            </div>
          </div>
          <div class="detectionTextContainer">
            <div class="detectionText">
              <span>规则4规则4规则4规则4规则4规则4规则4规则4规则4</span>
              <Button
                type="default"
                ghost
                style="
                  background: #d9d9d9;
                  border: 1px solid #d9d9d9;
                  color: #9b9b9b;
                "
                >通过</Button
              >
            </div>
          </div>
        </Scroll>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.detectionTextContainer {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-right: 20px;
}
.detectionText {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  font-family: PingFang HK;
  font-style: Regular;
  font-size: 14px;
  color: #2b2b2b;
}
.improvementComment {
  margin: 10px;
}
.improvementIdeaContainer {
  background: rgba(255, 214, 0, 0.1);
  margin: 10px 20px 10px 0px;
  border-radius: 5px;
  padding: 10px 20px 10px 0px;
}
.titleText {
  font-family: PingFang HK;
  font-style: Semibold;
  font-size: 16px;
  color: #4c4ab6;
  font-weight: 600;
  padding: 15px;
  padding-top: 20px;
}
.improveText {
  font-family: PingFang HK;
  font-style: Regular;
  font-size: 14px;
  color: #4c4ab6;
  font-weight: 400;
}
.improvementTitle {
  margin-top: 10px;
}
</style>
