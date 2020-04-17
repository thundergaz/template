<template>
  <div>
    <a-modal
      title="新增"
      v-model="childVisible"
      width="60%"
      @ok="handleOk"
      okText="保存"
      cancelText="取消"
      :destroyOnClose="true"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="题型">
          <a-radio-group v-decorator="['type']">
            <a-radio :value="1">单选题</a-radio>
            <a-radio :value="2">多选题</a-radio>
            <a-radio :value="3">判断题</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="题目">
          <a-textarea
            v-decorator="['subject']"
            placeholder="请输入题目"
            :autoSize="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <div class="clearfix">
            <a-upload
              action="https://192.168.1.158:8890/course/upload"
              v-decorator="[`questionSubjectFileList`, { normalize: this.normalizeAll }]"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-item>
        <a-form-item
          v-for="(k, index) in keys"
          :key="k"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
          :label="index === 0 ? '选项' : ''"
          :required="false"
        >
          <a-input
            v-decorator="[`questionSubjectOptionList[${k}.content]`]"
            :placeholder="`选项`"
            style="width: calc(100% - 128px); margin-right: 8px"
          />
          <a-checkbox
            v-decorator="[`questionSubjectOptionList[${k}.isRight]`, { valuePropName: 'abc'}]"
            style="margin-right: 8px"
          >正确答案</a-checkbox>
          <a-icon
            v-if="keys.length > 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="keys.length === 1"
            @click="() => remove(k)"
          />
        </a-form-item>
        <a-form-item v-if="keys.length < 4" :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="dashed" style="width: calc(100% - 128px)" @click="add">
            <a-icon type="plus" />增加选项
          </a-button>
        </a-form-item>
        <a-form-item label="答案解析">
          <a-textarea
            v-decorator="['parse']"
            placeholder="请输入"
            :autoSize="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { __module_name__ } from "@/api/__module_cname__";
let id = 0;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: "",
      childVisible: false,
      formItemLayout: {
        labelCol: {
          sm: { span: 5 }
        },
        wrapperCol: {
          sm: { span: 12 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          sm: { span: 12, offset: 5 }
        }
      },
      keys: []
    };
  },
  props: ["show", "inputData"],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "question" });
  },
  methods: {
    init(){
      this.childVisible = true;
    },
    setFeildValue(data) {
      this.$nextTick(() => {
        __module_name__.findOne(data.id).then(res => {
          this.form.fieldsStore.getAllFieldsName().forEach(x => {
            this.form.setFieldsValue({ [x]: res[x] });
          });
        });
      });
    },
    handleOk(e) {
      this.childVisible = false;
      this.form.validateFields((errors, values) => {
        __module_name__.save(values).then(res => {
          this.$message.success("保存成功！");
        });
      });
    },
    remove(k) {
      if (this.keys.length === 1) {
        return;
      }
      this.keys = this.keys.filter(key => key !== k);
    },
    add() {
      const nextKeys = this.keys.concat(id++);
      this.keys = nextKeys;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    normalizeAll(value, prevValue = []) {
      if (value === prevValue) {
        return value;
      }
      if (value !== prevValue && value && value.file.status === "done") {
        return value.fileList.map(x => ({ filePath: x.response.data }));
      }
      return null;
    }
  }
};
</script>

<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
