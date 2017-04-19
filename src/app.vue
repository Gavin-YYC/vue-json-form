<template lang="html">
  <div class="">
    <json-form :content="content" @change="handleChange"></json-form>
  </div>
</template>

<script>

import JSONForm from './components/index.vue';

export default {
  data() {
    return {
      content: {
      	"modTitle": "移库任务",
      	"head": {
      		"title": "移库任务"
      	},
      	"breadCrumb": [
      		{
      			"name": "在库管理",
      			"url": "/inhouse/procurement/list"
      		},
      		{
      			"name": "移库任务"
      		}
      	],
      	"tables": {
      		"dataUrl": "/inhouse/stocktransfer/gettasklist",
      		"thead": [
      			{
      				"key": "taskId",
      				"title": "移库任务编号"
      			},
      			{
      				"key": "fromLocationCode",
      				"title": "调出"
      			},
      			{
      				"key": "toLocationCode",
      				"title": "调入"
      			},
      			{
      				"key": "itemId",
      				"title": "商品ID"
      			},
      			{
      				"key": "itemName",
      				"title": "商品名称"
      			},
      			{
      				"key": "packName",
      				"title": "商品单位"
      			},
      			{
      				"key": "uomQty",
      				"title": "移库数量"
      			},
      			{
      				"key": "qtyDoneUom",
      				"title": "实际移动数量"
      			},
      			{
      				"key": "operatorName",
      				"title": "执行人"
      			},
      			{
      				"key": "createdAt",
      				"title": "任务创建时间",
      				"sortable": "1"
      			},
      			{
      				"key": "finishTime",
      				"title": "任务完成时间"
      			},
      			{
      				"key": "dueTime",
      				"title": "任务截止时间"
      			},
      			{
      				"key": "status",
      				"title": "状态",
      				"sortable": "1"
      			},
      			{
      				"key": "options",
      				"title": "操作"
      			}
      		]
      	}
      }
    }
  },

  components: {
    'json-form': JSONForm
  },

  methods: {
    handleChange() {
      // console.log( this.content );
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
