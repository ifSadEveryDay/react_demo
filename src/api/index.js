import config from './config'
const Api={
  todoList(){
    return config.doGetPromise('/query',{})
  }
}
export default Api;