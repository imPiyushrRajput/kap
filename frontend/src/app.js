// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'
import './styles/style.scss'

// libraries


// components
import HomePage from './components/components/HomePage'
import NavBar from './components/components/NavBar'
import Cook from './components/components/Cook'
import Watch from './components/components/Watch'
import Register from './components/components/Register'
import Login from './components/components/Login'
import Profile from './components/components/Profile'
import Game from './components/components/Game'
import SingleFilm from './components/components/SingleFilm'
import SingleRecipe from './components/components/SingleRecipe'
import AddItem from './components/components/AddItem'
import Read from './components/components/Read'

import test from './components/components/test'
import EditCookForm from './components/components/forms/EditCookForm'
import ForgotPassword from './components/components/ForgotPassword'
import ResetPassword from './components/components/ResetPassword'
import NotFound from './components/components/NotFound'
// import LoginModal from './components/components/Login'


const App = () => {


  const [desktopSize, setDesktopSize] = useState(false)

  function reportWindowSize() {
    window.innerWidth > 1300 ? setDesktopSize(true) : setDesktopSize(false)
  }

  useEffect(() => {
    window.innerWidth > 1300 ? setDesktopSize(true) : null
    window.onresize = reportWindowSize
  }, [])


  return (

    desktopSize ?

      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/reset/:resetPasswordToken' component={ResetPassword}></Route>
          <Route exact path='/cook' component={Cook}></Route>
          <Route exact path='/watch' component={Watch}></Route>
          <Route exact path='/play' component={Game}></Route>
          <Route exact path='/read' component={Read}></Route>
          <Route exact path='/register' component={Register}></Route>
          {/* <Route exact path='/login' component={LoginModal}></Route>  */}
          <Route path='/user/:id/uploads/:category/:id' component={EditCookForm}></Route>
          <Route path='/user/:id' component={Profile}></Route>
          <Route exact path='/add' component={AddItem}></Route>
          <Route exact path='/watch/:id' component={SingleFilm}></Route>
          <Route exact path='/cook/:id' component={SingleRecipe}></Route>
          <Route exact path='/test' component={test}></Route>
          <Route exact path='/forgotPassword' component={ForgotPassword}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>

      :

      <div className='screen-error'>
        <h1> KAP </h1>
        <p> Unfortunately, this application is not yet supported for smaller desktop/mobile views.
          For optimal user experience, please re-size your browser to it's maximum width. 
        </p>
      </div>
  )


}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)



