<template>
  <div>
    <!-- 搜索 -->
    <table-head :columns="columns" @search="search">
      <a-button type="primary" @click="add">新增</a-button>
    </table-head>
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="{ pageSize: 50 }"
      :scroll="tableScroll"
      size="small"
      bordered
    >
      <template slot="operation" slot-scope="text,record">
        <a slot="operation" slot-scope @click="handle(record.key)" href="javascript:;">操作</a>
      </template>
    </a-table>
    <dialog-item :show="visible"></dialog-item>
  </div>
</template>

<script>
import DialogItem from "./components/dialog-item.vue";
import { tableScroll } from "@/shared/utils";
import { __module_name__ } from "@/api/__module_cname__";
import tableHead from "@/shared/search";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const columns = [
  {
    title: "部门编号",
    dataIndex: "nameID",
    width: 150
  },
  {
    title: "部门名称",
    dataIndex: "name",
    width: 150
  },
  {
    title: "部门全称",
    dataIndex: "allName",
    width: 250
  },
  {
    title: "是否有效",
    dataIndex: "isUse",
    width: 100
  },
  {
    title: "创建人",
    dataIndex: "cUser",
    width: 100
  },
  {
    title: "创建时间",
    dataIndex: "cTime",
    width: 100
  },
  {
    title: "最后操作人",
    dataIndex: "fUser",
    width: 150
  },
  {
    title: "最后操作时间",
    dataIndex: "fTime",
    width: 150,
    scopedSlots: { customRender: "operation" }
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
  data() {
    return {
      reqData: {
        limit: 10,
        offset: 1
      },
      tableScroll: tableScroll(columns),
      searchData: {},
      data,
      columns,
      formItemLayout,
      visible: false
    };
  },
  components: {
    DialogItem,
    tableHead
  },
  created() {},
  mounted() {},
  methods: {
    search(data) {
      this.searchData = data;
      this.getPage()
    },
    getPage() {
      const params = { ...this.reqData, ...this.searchData };
      API_DemandChildInfo(params).then(res => {
        this.tableData = res.content;
        this.total = res.totalElements;
      });
    },
    handle(key) {},
    add() {
      this.visible = true;
    }
  }
};
</script>

<style scoped>
.search-item .search-btn {
  margin-right: 12px;
}
</style>
