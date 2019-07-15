<template>
  <div class="upload">
    <span>{{content[prop].title}}</span>
    <div class="up-graphic">
      <img :src="content[prop].defaultImg" />
      <el-upload class="up" action="/" :on-preview="handlePreview" :on-exceed="handleExceed">
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <i>示例：</i>
    <div class="eg-graphic">
      <img :src="content[prop].exampleImg" />
      <el-button size="small" type="primary" @click="showDialog=true">查看详情要求</el-button>
    </div>
    <s>{{content[prop].desc}}</s>
    <el-dialog :title="dialogContent[prop].title" :visible.sync="showDialog">
      <div class="dialog-img">
        <img :src="dialogContent[prop].img" alt />
      </div>
      <p>{{dialogContent[prop].desc}}</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      content: {
        zheng: {
          title: "正面身份证照片：",
          desc: "证件上文字清晰可识别",
          defaultImg: require("../../assets/images/zheng-default.png"),
          exampleImg: require("../../assets/images/zheng.png")
        },
        fan: {
          title: "反面身份证照片：",
          desc: "签发机关要清晰 \n必须要有效期内的身份证",
          defaultImg: require("../../assets/images/zheng-default.png"),
          exampleImg: require("../../assets/images/zheng.png")
        },
        shouchi: {
          title: "手持身份证照片：",
          desc: "必须是本人手持身份证件",
          defaultImg: require("../../assets/images/zheng-default.png"),
          exampleImg: require("../../assets/images/zheng.png")
        }
      },
      dialogContent: {
        zheng: {
          title: "查看详情",
          img: require("../../assets/images/zheng.png"),
          desc:
            "1. 身份证上的信息不能被遮挡，且清晰可见 2. 照片请勿进行任何软件处理 3. 照片支持ipge/ipg/gif/bmp/p"
        },
        fan: {
          title: "查看详情",
          img: require("../../assets/images/fan.png"),
          desc:
            "1. 身份证上的信息不能被遮挡，且清晰可见 2. 照片请勿进行任何软件处理 3. 照片支持ipge/ipg/gif/bmp/p"
        },
        shouchi: {
          title: "查看详情",
          img: require("../../assets/images/shouchi.png"),
          desc:
            "1. 身份证上的信息不能被遮挡，且清晰可见 2. 照片请勿进行任何软件处理 3. 照片支持ipge/ipg/gif/bmp/p"
        }
      }
    };
  },
  props: {
    prop: {
      type: String,
      default: ""
    }
  },
  methods: {
      handlePreview() {
          
      },
      handleExceed(){
          
      }
  },
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  span {
    text-align: right;
    min-width: 130px;
    margin-right: 13px;
    &::before {
      content: "*";
      color: red;
    }
  }
  i {
    min-width: 69px;
    text-align: right;
    margin-right: 13px;
  }
  s {
    min-width: 120px;
    text-decoration: none;
    color: #d20404;
  }
  .up-graphic {
    min-width: 250px;
    .up {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-button {
        width: 120px;
        color: #fff;
        border: 1px solid #000;
        background: #000;
      }
    }
  }
  .eg-graphic {
    min-width: 250px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      height: 158px;
    }
    .el-button {
      margin-top: 20px;
      width: 120px;
      color: #999;
      border: 1px solid #ededed;
      background: #ededed;
    }
  }
}
/deep/.el-dialog__header {
    padding: 15px 30px;
}
/deep/.el-dialog__headerbtn {   
    top: 12px;
    right: 30px;
}
.dialog-img{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom:38px;
}
</style>