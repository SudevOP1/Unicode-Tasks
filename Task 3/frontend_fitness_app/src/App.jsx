import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from 'react';
import AuthContext from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreateRoutinePage from "./pages/CreateRoutinePage";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";

function App() {
  let {user} = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                user
                ? <PrivateRoute><HomePage /></PrivateRoute>
                : <LandingPage />
              }
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute><ProfilePage /></PrivateRoute>}
            />
            <Route
              path="/create-routine"
              element={<PrivateRoute><CreateRoutinePage /></PrivateRoute>}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
