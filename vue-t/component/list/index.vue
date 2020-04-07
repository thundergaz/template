<template>
  <div>
    <!-- 搜索 -->
    <div class="search-item">
      <a-form layout="inline" :form="form">
        <a-form-item label="类型名称" v-bind="formItemLayout">
          <a-input
            v-decorator="['name']"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="类型编码" v-bind="formItemLayout">
          <a-input
            v-decorator="['number']"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item>
            <a-button class="search-btn" type="primary" @click="search">
                搜索
            </a-button>
            <a-button class="reset-btn" type="primary" @click="reset">
                重置
            </a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- 新增 -->
    <div class="add-item">
        <a-button type="primary" @click="add">新增</a-button>
    </div>

    <!-- 表格 -->
    <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="{ pageSize: 50 }"
        :scroll="{ y: 295 }"
        size="small"
        bordered
    >
        <template slot="operation" slot-scope="text,record">
            <a slot="operation" slot-scope="" @click="handle(record.key)" href="javascript:;">操作</a>
        </template>
    </a-table>
    <dialog-item :isShow="visible"></dialog-item>
  </div>
</template>

<script>
import DialogItem from './components/dialog-item.vue'
import { __module_name__ } from "@/api/__module_cname__";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16}
}
const columns = [
    {
      title: '部门编号',
      dataIndex: 'nameID',
      width: 150,
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '部门全称',
      dataIndex: 'allName',
      width: 250,
    },
    {
        title: '是否有效',
        dataIndex: 'isUse',
        width: 100,
    },
    {
        title: '创建人',
        dataIndex: 'cUser',
        width: 100,

    },
    {
        title: '创建时间',
        dataIndex: 'cTime',
        width: 100,

    },
    {
        title: '最后操作人',
        dataIndex: 'fUser',
        width: 150,

    },
    {
        title: '最后操作时间',
        dataIndex: 'fTime',
        width: 150,
        scopedSlots: { customRender: 'operation' }
    }
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        nameID: `farben ${i}`,
        name: `流程与信息化`,
        allName: `法本信息技术有限公司 ${i}`,
        isUse: `是`,
        cUser: `赵某某`,
        cTime: `20200214`,
        fUser: `罗大师`,
        fTime: `20200215`
    });
}
export default {
  name: 'role',
  data() {
    return {
        form: this.$form.createForm(this, { name: 'coordinated' }),
        data,
        columns,
        formItemLayout,
        visible: false,
    }
  },
  components: {
      DialogItem
  },
  created() {
    //   this.form = this.$form.createForm(this, { name: 'aaaa' }) 
  },
  mounted() {

  },
  methods: {
      search() {

      },
      reset() {
        this.form.setFieldsValue({
            name: '',
            code: ''
        })
    },
    handle(key) {
        console.log(key)
    },
    add() {
        this.visible = true
    }
  }
}
</script>

<style scoped>
.search-item .search-btn {
    margin-right: 12px;
}
.add-item {
    margin: 15px 0;
}
</style>
