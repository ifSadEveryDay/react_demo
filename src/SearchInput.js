import myContext from './myContext'
import { Input } from 'antd'
import 'antd/dist/antd.css'
import React,{useState,useContext,useRef,useEffect} from 'react'
import store from './store'
import {connect} from 'react-redux'
const { Search } = Input
function SearchInput(props) {
  const refs=useRef();

  const [Val,setVal]=useState('wifi');

  const {username}=useContext(myContext);

  useEffect(()=>{
    console.log("refs",refs);
  },[Val])

  return<Search
    placeholder={props.inputVal}
    allowClear
    enterButton="Search"
    size="large"
    onSearch={props.onSearch}
    ref={refs}
  />
}
const stateProps=(state)=>{
  return {
    inputVal:state.inputVal
  }
}
const dispatchProps=(dispatch)=>{
  return {
    onSearch(val){
      const changeInput={
        type:'changeInputVal',
        value:val
      }
      dispatch(changeInput);
      const action ={
        type:'addItem',
        value:val
      }
      dispatch(action)
    }
  }
}
export default connect(stateProps,dispatchProps)(SearchInput)