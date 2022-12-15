/* eslint-disable */

import { createApp } from "vue";
import ViewUIPlus from "view-ui-plus";
import PrettyCheckbox from "pretty-checkbox-vue";
import App from "./App.vue";
import "view-ui-plus/dist/styles/viewuiplus.css";
import router from "./router";
import store from "./store/store";

import "pretty-checkbox/src/pretty-checkbox.scss";

// import FileSelector main css
import 'vue-file-selector/dist/main.css';

// import the FileSelector plugin
import FileSelector from 'vue-file-selector';
const app = createApp(App);

app
    .use(router)
    .use(ViewUIPlus)
    .use(FileSelector)
    .use(PrettyCheckbox)
    .mount("#app");
