import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ClipLoader from "react-spinners/DotLoader";

import { Sidebar, Table } from "./components";
import Home from "./Pages/Home/Home";
import Foods from "./Pages/Foods/Food";
import Messages from "./Pages/Messages/Messages";
import Settings from "./Pages/Settings/Settings";
import "./App.css";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

import Header from "./components/header/Header";
import Body from "./components/body/Body";

import parrain from "./components/Parrain/parrain";
import axios from "axios";
import Profile from "./components/body/profile/Profile";
import UserProfile from "./components/body/profile/UserProfile";
import Contact from "./components/Contact/Contact";
import Categories from "./components/Categories/category";
import Meetings from "./components/Meetings/meeting";

import ViewUser from "./components/body/profile/ViewUser";
import AddCategoryForm from "./components/Categories/AddCategoryForm";
import UpdateCategory from "./components/Categories/updateCategory";
import Habillement from "./components/Habillements/habillement";
import AddHabillementForm from "./components/Habillements/AddHabillementForm";
import SubCategory from "./components/subCategory/subCategory";
import AddSubCategoryForm from "./components/subCategory/AddSubCategoryForm";
import UpdateSubCategory from "./components/subCategory/updateSubCategory";
import CRM from "./components/CRM/Banner";
import CalendarMeeting from "./components/Meetings/Calendar";
import Parrain from "./components/Parrain/parrain";
import Historiques from "./components/Historiques/historiques";
import Abonnements from "./components/Abonnements/Abonnements";
import Coach from "./components/Coach/Coach";
import Inventaire from "./components/Inventaire/Inventaire";
import Infos from "./components/CRM/infos";
import ShopDetails from "./components/CRM/shop";
import Apropos from "./components/CRM/A propos";
import GD from "./components/CRM/gif+desc";
import ReseauxSociaux from "./components/CRM/ReseauxSociaux";
import Footer from "./components/CRM/Footer";
function App() {
  const override = {
    display: "block",
    margin: "200px 600px",
  };
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);

        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  let [loading, setLoading] = React.useState(true);
  let [color, setColor] = React.useState("pink");

  return (
    <div>
      <Router>
        <div className="App">
          <Header />
          <Body />
          {auth.isLogged && auth.isAdmin && <Sidebar />}
          <Route path="/admin" element={<Home />}>
            <Home />
          </Route>
          <Route path="/coach" element={<Coach />}>
            <Coach />
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/historiques" element={<Historiques />}>
            <Historiques />
          </Route>
          <Route path="/inventaires" element={<Inventaire />}>
            <Inventaire />
          </Route>
          <Route path="/abonnements" element={<Abonnements />}>
            <Abonnements />
          </Route>
          <Route path="/Calendar" element={<CalendarMeeting />}>
            <CalendarMeeting />
          </Route>
          <Route path="/contacts" element={<Contact />}>
            <Contact />
          </Route>
          <Route path="/rendezvous" element={<Meetings />}>
            <Meetings />
          </Route>
          <Route path="/info" element={<UserProfile />}>
            <UserProfile />
          </Route>
          <Route path="/category" element={<Categories />}>
            <Categories />
          </Route>
          <Route path="/habillement" element={<Habillement />}>
            <Habillement />
          </Route>
          <Route path="/banner" element={<CRM />}>
            <CRM />
          </Route>
          <Route path="/habillements/add" element={<AddHabillementForm />}>
            <AddHabillementForm />
          </Route>
          <Route path="/user/getuser/:id" element={<ViewUser />}>
            <ViewUser />
          </Route>
          <Route path="/categories/add" element={<AddCategoryForm />}>
            <AddCategoryForm />
          </Route>
          <Route path="/infos" element={<Infos />}>
            <Infos />
          </Route>
          <Route path="/shop" element={<ShopDetails />}>
            <ShopDetails />
          </Route>
          <Route path="/footer" element={<Apropos />}>
            <Apropos />
          </Route>
          <Route path="/GIF" element={<GD />}>
            <GD />
          </Route>
          <Route path="/ResSoc" element={<ReseauxSociaux />}>
            <ReseauxSociaux />
          </Route>
          <Route path="/ResApropos" element={<Footer />}>
            <Footer />
          </Route>
          {/* <Route path="/GIF" element={<GIF />}>
            <GIF />
          </Route> */}
          <Route path="/souscategory" element={<SubCategory />}>
            <SubCategory />
          </Route>
          <Route path="/parrain" element={<Parrain />}>
            <Parrain />
          </Route>
          <Route path="/subcategories/add" element={<AddSubCategoryForm />}>
            <AddSubCategoryForm />
          </Route>
          <Route
            path="/subcategories/update/:id"
            element={<UpdateSubCategory />}
          >
            <UpdateSubCategory />
          </Route>
          <Route path="/categories/update/:id" element={<UpdateCategory />}>
            <UpdateCategory />
          </Route>
         
        </div>
      </Router>
    </div>
  );
}

export default App;
