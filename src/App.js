import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import SignUpForm from './components/Signup'
import SignInForm from './components/Signin'
import Privateroute from './components/common/PrivateRoute'
import Home from './components/Home'
import Mealplanner from './components/MealPlanner'
import ExerciseTrack from './components/ExerciseTrack'
import ChatBot from './components/ChatBot'
import Info from './components/Info'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Privateroute component={Home} />} />
        <Route
          path="/excercise"
          exact
          element={<Privateroute component={ExerciseTrack} />}
        />
        <Route
          path="/mealPlanner"
          element={<Privateroute component={Mealplanner} />}
        />
        <Route path="/info" element={<Privateroute component={Info} />} />
        <Route path="/chatbot" element={<Privateroute component={ChatBot} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Router>
  )
}

export default App
