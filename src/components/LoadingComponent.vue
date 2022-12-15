<template>
  <!-- eslint-disable -->
  <div class="c-modal">
    <Modal footer-hide class-name="vertical-center-modal" class="c-modal theme-font-one" v-model="isShow"
      :closable="closable" :title="title" :transfer="transfer" :width="width" :ok-text="okText" :z-index="99999"
      :mask-closable="false">
      <div>
        <div class="demo-spin-col">
          <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
      </div>
    </Modal>
  </div>

</template>
  
<script>
/* eslint-disable */

export default {
  props: {
    transfer: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    isClickOK: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    okText: {
      type: String,
      default: 'Save',
    },
    width: {
      type: Number,
      default: 520,
    },
  },
  computed: {
    isShow: {
      get() {
        return this.showModal;
      },
      set(newVal) {
        return newVal;
      },
    },
  },
  data() {
    return {
      btnType: {
        Save: 'success',
        Update: 'warning',
        Delete: 'error'
      }
    }
  },
  methods: {
    ok() {
      this.$emit("ok");
    },
    cancel() {
      this.$emit("close", false);
    }
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c-modal ::v-deep .vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-modal ::v-deep .vertical-center-modal .ivu-modal {
  top: 0;
}

.c-modal ::v-deep .ivu-spin-fix {
  background: transparent;
}

.c-modal ::v-deep .demo-spin-col .circular {
  width: 25px;
  height: 25px;
}

.c-modal ::v-deep .demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.c-modal ::v-deep .demo-spin-col {
  height: 100px;
  position: relative;
}
</style>
  