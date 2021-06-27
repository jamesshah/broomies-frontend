import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import IndexScreen from './screens/IndexScreen'
import Header from './components/Header'
import FavouritesScreen from './screens/FavouritesScreen'
import UserScreen from './screens/UserScreen'
import NotFoundScreen from './screens/NotFoundScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path='/home' component={HomeScreen} exact />
          <Route path='/favourites' component={FavouritesScreen} exact />
          <Route path='/signup' component={SignUpScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/' component={IndexScreen} exact />
          <Route path='/user/:username' component={UserScreen} />
          <Route path='*' component={NotFoundScreen} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
