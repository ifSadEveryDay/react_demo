import {cloneDeep} from 'lodash'
const defState={
  inputVal:'Write something',
  list:[
    "I",
    "LOVE",
    "YOU"
  ]
}
export default (state=defState,action)=>{
  switch (action.type) {
    case "addItem":
      let newState=cloneDeep(state)
      newState.list.push(newState.inputVal);
      newState.inputVal="";
      return newState;
      break;
    default:
      return state
      break;
  }
  
}