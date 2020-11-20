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
      var newState=cloneDeep(state)
      newState.list.push(newState.inputVal);
      newState.inputVal="";
      return newState;
      break;
    case "changeInputVal":
      var newState=cloneDeep(state)
      newState.inputVal=action.value;
      return newState; 
      break;
    default:
      return state
      break;
  }
  
}