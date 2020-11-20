import myContext from './myContext'
import { Input } from 'antd'
import 'antd/dist/antd.css'
import React,{useState,useContext,useRef,useEffect} from 'react'
import * as countActions from './action/countNum'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
const { Search } = Input
function SearchInput(props) {
  const refs=useRef();

  const [Val,setVal]=useState('wifi');

  const {username}=useContext(myContext);

  useEffect(()=>{
    console.log("refs",refs);
  },[Val])
  return(
    <div>
      <Search
    placeholder={props.inputVal}
    allowClear
    defaultValue={props.inputVal}
    enterButton="Search"
    size="large"
    onSearch={(val)=>{
      props.countActions.changeInputVal(val);
      props.countActions.addItem();
    }}
    ref={refs}
    loading={props.loading}
  />
  <span>{props.inputVal}</span>
    </div>
  )
}
const stateProps=(state)=>{
  return {
    inputVal:state.count.inputVal
  }
}
const dispatchProps=(dispatch)=>{
  return {
    countActions:bindActionCreators(countActions,dispatch)
  }
}
export default connect(stateProps,dispatchProps)(SearchInput)