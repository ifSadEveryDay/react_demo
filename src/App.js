import logo from './logo.svg'
import './App.css'
import React from 'react'
import { Button, DatePicker } from 'antd'
import 'antd/dist/antd.css'
import ClickCounter from './ClickCounter'
import myContext from './myContext'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>我是父组件</div>
        <Button
          type="primary"
          style={{
            marginLeft: 8,
          }}
        >
          Primary Button{' '}
        </Button>
        <ClickCounter name="React" />
      </header>
     
      
    </div>
  )
}

export default App
