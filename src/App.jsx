import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./Layouts/AppLayout";
import IsLoggedIn from "./outlets/IsLoggedIn";
import LearnersCourses from "./pages/LearnersCourses";
import SingleCourse from "./pages/SingleCourse";
import CreatePassword from "./pages/CreatePassword";
import RequestPasswordReset from "./pages/ForgotPassword";
import ProfileSettings from "./pages/ProfileSettings";
import ManageAdmins from "./pages/ManageAdmins";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLoggedIn />} >
          <Route element={<AppLayout />}>
            <Route path={"/"} element={<LearnersCourses />} />
            <Route path="/class/:id" element={<SingleCourse />} />
            <Route path="/my-profile" element={<ProfileSettings />} />
            <Route path="/admins" element={<ManageAdmins />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
