import './App.css'
import React from 'react'
import ClickCounter from './SearchInput'
import InformList from './inform'
import myContext from './myContext'
import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
      <header className="App-header">
      <div className="container">
     <myContext.Provider value={{
       username:'luoawai'
     }}>
    <Route path="/" exact component={ClickCounter}></Route>
     <Route path="/" component={InformList}></Route>
      {/* <ClickCounter/>
      <InformList/> */}
     </myContext.Provider>
      </div>
      </header>
    </div>
    </Router>
    </Provider>
  )
}

export default App
