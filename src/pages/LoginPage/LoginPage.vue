<template>
  <div style="overflow:hidden">
    <div class="logInContainer">
      <div class="background">
        <img alt="Vue logo" src="../../assets/background1.png" />
      </div>
      <div class="backgroundStyle">
        <img alt="Vue logo" src="../../assets/background2.png" />
      </div>
      <div class="logInBar">
        <div class="logInImage">
          <img alt="Vue logo" src="../../assets/LogIn.png" />
        </div>
        <div class="loginFormContainer">
          <div class="logInTitle">
            <Title :level="5">登录</Title>
          </div>
          <div class="demo-login">
            <Login @on-submit="handleSubmit">
              <UserName
                name="username"
                suffix="ios-person-outline"
                prefix=""
                placeholder="账号/邮箱"
                v-model="email"
              />
              <Password
                name="password"
                suffix="ios-lock-outline"
                prefix=""
                placeholder="请输入密码"
                v-model="password"
              />
              <div style="display: flex; justify-content: space-between">
                <div class="registrationContainer">
                  <div class="design">
                    <span style="margin-right: 0.5rem">没有账号？</span>
                    <a style="color: #4c4ab6">点击注册</a>
                  </div>
                </div>
                <div>
                  <submit
                    style="
                      background-color: #4c4ab6;
                      border-radius: 0.5rem;
                      width: 90px;
                      font-size: 14px;
                    "
                  />
                </div>
              </div>
            </Login>
          </div>
          <div class="accountContainer">
            <div class="worthText">
              <div
                style="
                  background: #e5e5e5;
                  width: 60px;
                  padding: 1px;
                  height: -1px;
                "
              ></div>
              <div><span>第三方登录</span></div>
              <div
                style="
                  background: #e5e5e5;
                  width: 60px;
                  padding: 1px;
                  height: 1px;
                "
              ></div>
            </div>
            <div class="accountImageContainer">
              <div style="margin-right: 2rem">
                <img alt="" src="../../assets/github.png" />
              </div>
              <div><img alt="" src="../../assets/gLogo.png" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="discord">
        <img alt="" src="../../assets/discord.png" />
        <span class="commuText">社群</span>
      </div>
      <div class="company">
        <span class="companyName"
          >长沙响应网络科技有限公司 京ICP备10036305号-7 © 2022</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import axiosInstance from "@/utils/axiosInstance";
import { store } from "../../store";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      store,
    };
  },
  methods: {
    async handleSubmit(valid, { username, password }) {
      if (valid) {
        try {
          const response = await axiosInstance.post("/login", {
            email: username,
            password: password,
          });
          this.store.login = response.data;
          sessionStorage.setItem("token", response.data.api_token);
          localStorage.setItem("api_token", response.data.api_token);
          setTimeout(() => {
            this.$router.push("/main");
          }, 250);
        } catch (err) {
          this.$Modal.info({
            title: "Error",
            content: err.response.data.msg,
          });
        }
      }
    },
  },
};
</script>
<style>
.logInContainer {
  background: #f0f2f5;
  height: calc(100vh - 5vh);
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  position: relative;
}
.logInBar {
  background: #ffffff;
  display: flex;
  width: 90vh;
  height: 50vh;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-around;
  position: static;
  z-index: 1;
  box-shadow: 9px 6px 17px 5px rgba(123, 123, 140, 0.26);
  -webkit-box-shadow: 9px 6px 17px 5px rgba(123, 123, 140, 0.26);
  -moz-box-shadow: 9px 6px 17px 5px rgba(123, 123, 140, 0.26);
}
.logInImage {
}
.demo-login {
}
.loginFormContainer {
  width: 25rem;
  height: 23rem;
  padding: 20px;
}
.registrationContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.user,
.pass {
  font-family: PingFang SC;
  font-style: Regular;
  font-size: 14px;
}
.design {
  font-family: PingFang SC;
  font-style: Regular;
  font-size: 14px;
}
.accountContainer {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.worthText {
  display: flex;
  align-items: center;
  gap: 25px;
  font-family: PingFang SC;
  font-style: Regular;
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 1rem;
}
.accountImageContainer {
  display: flex;
}
.background {
  position: absolute;
  top: 0.1rem;
  left: -0.2rem;
}
.backgroundStyle {
  position: absolute;
  left: 485px;
  top: 172px;
  z-index: 0;
}
.commuText {
  font-family: PingFang SC;
  font-style: Regular;
  font-size: 14px;
  color: #6b6b6b;
}
.footer {
  height: 5vh;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
}
.discord {
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.commuText {
  margin-left: 10px;
}
.company {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
