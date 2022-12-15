const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "App",
        appId: "test.com",
        win: {
          target: ["nsis"],
          icon: "public/Swork2.png",
          requestedExecutionLevel: "requireAdministrator",
        },
        nsis: {
          installerIcon: "public/Swork2.png",
          uninstallerIcon: "public/Swork2.png",
          uninstallDisplayName: "CPU Monitor",
          license: "license.txt",
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
});
