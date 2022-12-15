<template>
<!-- eslint-disable -->
  <div>
    <Upload
      ref="upload"
      :default-file-list="defaultList"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      :before-upload="handleUpload"
      :on-success="handleSucces"
      :on-error="handleError"
      :show-upload-list="false"
      :headers="{
        // 'Authorization': Authorization
      }"
      multiple
      :paste="true"
      name="file"
      action="https://upload-z2.qiniup.com/"
      :data="{ 
        'token': parent_self.upload_config.token,
        'key': `${getTime()}`
       }"
      style="display: inline-block; width: 100px"
    >
      <div
        style="
          width: 100px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f8f8;
        "
      >
        <!-- <Icon type="ios-camera" size="20"></Icon> -->
        <img alt="" src="../../assets/imageSample.png" />
      </div>
    </Upload>
  </div>
</template>

<script>
/* eslint-disable */
// var qiniu = require("qiniu");

export default {
  props: {
    itemIndex: {
      type: Number,
      default: -1
    },
		parent_self: { 
        type: Object, 
        default: () => {
            return {};
        }
    },
		upload_config: { 
        type: Object, 
        default: () => {
            return {};
        }
    },
  },
  watch: {
    parent_self(nv, ov) {
      this.qiniuToken = this.parent_self.upload_config;
      console.log("this.qiniuToken", this.qiniuToken)
    },
    // upload_config(nv, ov) {
    //   this.qiniuToken = this.upload_config;
    //   console.log("this.qiniuToken", this.qiniuToken)
    // },
  },
  data() {
    return {
      qiniuToken: {},
      defaultList: [
        // {
        //   name: "a42bdcc1178e62b4694c830f028db5c0",
        //   url: "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar",
        // },
        // {
        //   name: "bc7521e033abdd1e92222d733590f104",
        //   url: "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar",
        // },
      ],
    };
  },
  mounted() {
    console.log("this.parent_self", this.getTime());
  },
  methods: {
    getTime() {
      const d = new Date();
      return ''+d.getTime()
    },
    handleUpload(e) {
      console.log("handleUpload", e)
    },
    handleSucces(e) {
      console.log("handleSucces", e)
      
      this.$emit('on-success-upload', {
        itemIndex: this.itemIndex,
        result: {
          url: `${this.parent_self.upload_config.url}/${e.key}`,
          key: e.key,
        }
      })
    },
    handleError(e) {
      console.log("handleError", e)
        this.$Notice.error({
            title: 'Error',
            desc: 'Upload error'
        });
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded.",
        });
      }
      return check;
    },
  },
  //bucket and upload is from previous api's response
  //key: just random the key
  //localFile: the choosed file path
  // uploadImage(bucket,uptoken,key,localFile) {
  //     var extra = new qiniu.io.PutExtra();
  //     qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
  //       if (!err) {
  //         // 上传成功， 处理返回值
  //         console.log(ret.hash, ret.key, ret.persistentId);
  //       } else {
  //         // 上传失败， 处理返回代码
  //         console.log(err);
  //       } 
  //   });
  // }
};
</script>

<style></style>
