import { createStore } from 'vuex'
const Employee="Employee"
export default createStore({
  state: {
    employee: window.SessionStorage.get(Employee) || {}
  },
  getters: {
  },
  mutations: {
    setEmployee(state,employee){
      console.log(employee)
      state.employee=employee
      window.SessionStorage.set(Employee,employee)
    },
    clearEmployee(state){
      console.log('store正在清除employee')
      state.employee= {}
      window.SessionStorage.set(Employee,{})
    },
  },
  actions: {
  },
  modules: {
  }
})
