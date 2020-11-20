import api from '../src/api'
import {useEffect,useState} from 'react'
import {List} from 'antd'
import {connect} from 'react-redux'
function Inform(props){
  // const [list,setList]=useState([]);
  // useEffect(()=>{
  //   api.todoList().then((result) => {
  //     console.log('result: ', result);
  //     setList(result.data.inputVal)
  //   }).catch((err) => {
  //   });
  //   return {};
  // },[])
  return <div>
    <List
      bordered
      dataSource={props.list}
      renderItem={item => (
        <List.Item style={{color:'white'}}>
        {item}
        </List.Item>
      )}
    />
</div>
}
const stateProps=(state)=>{
  return {
    list:state.list
  }
}
export default connect(stateProps,null)(Inform)