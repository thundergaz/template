<template>
  <div>
    <!-- 搜索 -->
    <table-head :columns="columns" @search="search">
      <a-button type="primary" @click="add">新增</a-button>
    </table-head>
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      :scroll="tableScroll"
      :rowKey="(record, index) => index"
      size="small"
      bordered
    >
      <template slot="operation" slot-scope="text,record">
        <a slot="operation" slot-scope @click="handle(record.key)" href="javascript:;">操作</a>
      </template>
    </a-table>
    <div class="page">
      <a-pagination
        :showTotal="total => `共 ${total} 条`"
        :total="total"
        showSizeChanger
        :pageSize="reqData.limit"
        v-model="reqData.offset"
        :pageSizeOptions="pageSizeOptions"
        @showSizeChange="onShowSizeChange"
        @change="changePage"
      >
        <template slot="buildOptionText" slot-scope="props">
          <span>{{props.value}}条/页</span>
        </template>
      </a-pagination>
    </div>
    <dialog-item ref="child"></dialog-item>
  </div>
</template>

<script>
import { tableScroll } from "@/shared/utils";
import tableHead from "@/shared/component/search";
import DialogItem from "./components/dialog-item.vue";

import { __module_name__ } from "@/api/__module_cname__";
const columns = [
  {
    title: "部门编号",
    dataIndex: "nameID",
    width: 150
  },
  {
    title: "部门名称",
    dataIndex: "name",
    width: 150,
    isShow: true
  },
  {
    title: "部门全称",
    dataIndex: "allName",
    width: 250,
    isShow: true
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
export default {
  data() {
    return {
      tableScroll: tableScroll(columns),
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      total: 0,
      searchData: {},
      reqData: {
        limit: 10,
        offset: 1
      },
      tableData: [],
      columns
    };
  },
  components: {
    DialogItem,
    tableHead
  },
  created() {},
  mounted() {
    this.getPage()
  },
  methods: {
    // 使用新的搜索状态
    search(data) {
      this.searchData = data;
      this.reqData.offset = 1;
      this.getPage();
    },
    // 保持当前搜索状态
    getPage() {
      const params = { ...this.reqData, ...this.searchData };
      __module_name__.list(params).then(res => {
        this.tableData = res.content;
        this.total = res.totalElements;
      });
    },
    // 点击列表操作的方法
    handle(key) {
      //
    },
    // 打开子窗口
    add() {
      this.$refs.child.init();
    },
    // 总条数改变
    onShowSizeChange(page, pagesize) {
      this.reqData.offset = page;
      this.reqData.limit = pagesize;
      this.getPage();
    },
    // 页码变更
    changePage(current, size) {
      this.reqData.offset = current;
      this.reqData.limit = size;
      this.getPage();
    }
  }
};
</script>

<style scoped>
.search-item .search-btn {
  margin-right: 12px;
}
.page {
  text-align: right;
  margin-top: 12px;
}
</style>
