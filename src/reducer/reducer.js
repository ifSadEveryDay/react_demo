import {cloneDeep} from 'lodash'
const defState={
  inputVal:'Write something',
  list:[
    "I",
    "LOVE",
    "YOU"
  ],
  loading:false
}
const count= (state=defState,action)=>{
  switch (action.type) {
    case "addItem":
      var newState=cloneDeep(state)
      newState.list.push(newState.inputVal);
      newState.inputVal="";
      newState.loading=false;
      console.log(newState);
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

export default count;