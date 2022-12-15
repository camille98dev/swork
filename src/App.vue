<template>
  <div>
    <div v-if="currentRouteName === 'LoginPage'">
      <router-view />
    </div>
    <div v-else>
      <LayoutComponent>
        <router-view />
      </LayoutComponent>
    </div>
  </div>
</template>

<script>
import LayoutComponent from "./components/LayoutComponent.vue";
export default {
  name: "App",
  components: { LayoutComponent },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {
    // const jsonData = require('D:/Projects/GitLab/huida_user/pages.json'); 
    // console.log("jsonData",jsonData);
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style>
img {
	image-rendering: -webkit-optimize-contrast;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-thumb {
  background: #d8d8d8;
}
</style>
