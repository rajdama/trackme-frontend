import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "./components/Signup";
import SignInForm from "./components/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
