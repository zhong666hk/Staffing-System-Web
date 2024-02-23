<template>
  <a-select
      v-model:value="nationName"
      placeholder="请选择名族名称"
      show-search
      :filter-option="filterNationNameOption"
      @change="onChange"
      :style="'width:'+ myWidth"
  >
    <a-select-option v-for="item in nations" :key="item.name"
                     :value="item.name" :label="item.name">
      {{item.name}}
    </a-select-option>
  </a-select>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue";
import {queryAllNation} from "@/API";
import {notification} from "ant-design-vue";

export default defineComponent({
  name:"nation-select-view",
  props:["modelValue","width"], // 父子组件的参数定义
  emits:['update:modelValue','change'], // 子父组件的方法定义
  setup(props,{emit}){
    const nationName =ref();
    const nations=ref([]);
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
    const filterNationNameOption = (input,option) => {
      console.log(input,option)
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    // 查询车站编号
    const queryNationName =()=>{
      queryAllNation().then((response)=>{
        if (response.code===200){
          console.log("查询职位name")
          console.log(response)
          nations.value=response.data
        }else {
          notification.error({description:response.message})
        }
      })
    }
    // 利用watch()动态获取父组件的值 父传子 当父选择后
    watch(()=>props.modelValue,()=>{
      console.log("props.modelValue",props.modelValue);
      // 更新子组件的值
      nationName.value=props.modelValue
    },{immediate:true})

    // 子组件传值给父组件
    const onChange=(value)=>{
      // 通知更新父组件的值
      emit('update:modelValue',value);
      // 扩展 --->将整条数据都返回出去nation参数  change方法也暴露了。父组件用不用是它的事
      // 父组件就可以用 @change="父组件的方法" (nation)=>{}
      let nation =nations.value.filter(item=>item.name===value)[0];
      if (Tool.isNotEmpty(nation)){
        nation={};
      }
      emit('change',nation);
    }
    onMounted(()=>{
      queryNationName();
    })

    return{
      nationName,
      filterNationNameOption,
      queryNationName,
      onChange,
      nations,
      myWidth
    }
  }
})

</script>

<style scoped>

</style>
