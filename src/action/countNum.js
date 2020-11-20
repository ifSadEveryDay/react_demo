const addItem=()=>{
  return {
    type:"addItem"
  }
}
const changeInputVal=(val) =>{
    return{
      type:"changeInputVal",
      value:val
    }
}
export{
  addItem,
  changeInputVal
}
