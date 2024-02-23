<template>
  <a-select
      v-model:value="jobLevelName"
      placeholder="请选择职位名称"
      show-search
      :filter-option="filterJobLevelNameOption"
      @change="onChange"
      :style="'width:'+ myWidth"
  >
    <a-select-option v-for="item in jobLevels" :key="item.name"
                     :value="item.name" :label="item.name">
      {{item.name}}
    </a-select-option>
  </a-select>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue";
import {queryAllJobLevel} from "@/API";
import {notification} from "ant-design-vue";

export default defineComponent({
  name:"jobLevel-select-view",
  props:["modelValue","width"], // 父子组件的参数定义
  emits:['update:modelValue','change'], // 子父组件的方法定义
  setup(props,{emit}){
    const jobLevelName =ref();
    const jobLevels=ref([]);
    const myWidth = ref(props.width)
    if (Tool.isEmpty(props.width)){
      console.log("width为空")
      myWidth.value="100%"
    }


    /**
     * 过滤函数
     * @param input 输入框的值
     * @param option 选择栏在数据
     * @returns {boolean}
     */
    const filterJobLevelNameOption = (input,option) => {
      console.log(input,option)
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    // 查询车站编号
    const queryJobLevelName =()=>{
      queryAllJobLevel().then((response)=>{
        if (response.code===200){
          console.log("查询职位name")
          console.log(response)
          jobLevels.value=response.data
        }else {
          notification.error({description:response.message})
        }
      })
    }
    // 利用watch()动态获取父组件的值 父传子 当父选择后
    watch(()=>props.modelValue,()=>{
      console.log("props.modelValue",props.modelValue);
      // 更新子组件的值
      jobLevelName.value=props.modelValue
    },{immediate:true})

    // 子组件传值给父组件
    const onChange=(value)=>{
      // 通知更新父组件的值
      emit('update:modelValue',value);
      // 扩展 --->将整条数据都返回出去jobLevel参数  change方法也暴露了。父组件用不用是它的事
      // 父组件就可以用 @change="父组件的方法" (jobLevel)=>{}
      let jobLevel =jobLevels.value.filter(item=>item.name===value)[0];
      if (Tool.isNotEmpty(jobLevel)){
        jobLevel={};
      }
      emit('change',jobLevel);
    }
    onMounted(()=>{
      queryJobLevelName();
    })

    return{
      jobLevelName,
      filterJobLevelNameOption,
      queryJobLevelName,
      onChange,
      jobLevels,
      myWidth
    }
  }
})

</script>

<style scoped>

</style>
