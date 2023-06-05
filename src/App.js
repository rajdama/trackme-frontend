import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "./components/Signup";
import SignInForm from "./components/Signin";
import Privateroute from "./components/PrivateRoute";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Privateroute component={Home} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
