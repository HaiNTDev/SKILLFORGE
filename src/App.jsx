import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./components/dashboard/DashBoard";
import Courses from "./pages/TeacherPage/Courses";
import AddNewCourse from "./pages/TeacherPage/AddNewCourse";
import PrivateRoute from "./components/private-route";
import HomeTemplate from "./homeTemplate/HomeTemplate";
import HomePage from "./pages/homePage/HomePage";
import ViewCourses from "./pages/homePage/ViewCourses";
// import ViewCourseDetail from "./pages/homePage/ViewCourseDetail";
import CourseDetail from "./pages/homePage/CourseDetail";
import MyCourse from "./pages/homePage/MyCourse";
import MyCourseDetail from "./pages/homePage/MyCourseDetail";
import Cart from "./pages/homePage/Cart";
import Checkout from "./pages/homePage/Checkout";
import MyProfile from "./pages/homePage/MyProfile";
import Grade from "./pages/TeacherPage/Grade";
import UserManagement from "./pages/adminPage/UserManagement";
import CourseManagement from "./pages/adminPage/CourseManagement";
import CheckoutSuccess from "./pages/homePage/CheckOutSuccess";
// import { ChapterTable } from "./pages/TeacherPage/ChapterTable";
import Quiz from "./components/quiz/Quiz";
import CategoryManagement from "./pages/adminPage/CategoryManagement";
import DashboardManagement from "./pages/adminPage/DashboardManagement";
import MyWallet from "./pages/TeacherPage/MyWallet";
import WalletManagement from "./pages/adminPage/WalletManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard">
          <Route path="teacher" element={<PrivateRoute role={"TEACHER"} />}>
            <Route path="" element={<DashBoard role={"TEACHER"} />}>
              <Route path="courses" element={<Courses />}></Route>
              {/* <Route path="add-new" element={<AddNewCourse />}></Route> */}
              <Route path="grade" element={<Grade />}></Route>
              <Route path="my-wallet" element={<MyWallet />}></Route>
            </Route>
          </Route>
          <Route path="admin" element={<PrivateRoute role={"ADMIN"} />}>
            <Route path="" element={<DashBoard role={"ADMIN"} />}></Route>
          </Route>
          <Route path="admin" element={<DashBoard role={"ADMIN"} />}>
            <Route path="manage-user" element={<UserManagement />}></Route>
            <Route path="manage-course" element={<CourseManagement />}></Route>
            <Route
              path="manage-category"
              element={<CategoryManagement />}
            ></Route>{" "}
            <Route path="manage-wallet" element={<WalletManagement />}></Route>
            <Route path="manage" element={<DashboardManagement />}></Route>
          </Route>
        </Route>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<HomePage />}></Route>
          <Route path="course">
            <Route path="" element={<ViewCourses />}></Route>
            <Route path=":id" element={<CourseDetail />}></Route>
          </Route>
          <Route path="enrolled">
            <Route path="" element={<MyCourse />}></Route>{" "}
            <Route path=":id" element={<MyCourseDetail />}></Route>
          </Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="check-out" element={<Checkout />}></Route>
          <Route path="my-profile" element={<MyProfile />}></Route>
        </Route>
        <Route path="success" element={<CheckoutSuccess />}></Route>

        {/* <Route path="test">
          <Route path=":id" element={<ChapterTable />}></Route>
        </Route> */}
        <Route path="quiz">
          <Route path=":id" element={<Quiz />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
