/* eslint-disable */
import { reactive } from "vue";
export const store = reactive({
  login: {},
  developers: [],
  currentProjectID: undefined,
  projects: [],

  // pages.json
  jsonPages: JSON.parse(localStorage.getItem('jsonPages')) || [],
  currentJsonPage: undefined,
  isAddedJsonFile: false,
});
