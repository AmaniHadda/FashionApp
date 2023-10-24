
import React, { useState, useEffect } from "react";
import "./Home.scss";
import { ChartContainer } from "../../components";
import HomeCount from "../../components/HomeCount/HomeCount";
import Table from "../../components/Table/Table";
import Headers from "../../components/Headers/Headers";
import Footer from "../../components/body/footer/footer";
import Moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../redux/actions/usersAction";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const [todayUsers, setTodayUsers] = useState([]);

  const { user, isAdmin } = auth;

  const [formattedUsers, setFormattedUsers] = useState([]);

  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));

        const formattedData = res.data
          .filter(
            (user) =>
              user._id !== auth.user._id &&
              !user.isArchived &&
              Moment(user.createdAt).isSame(new Date(), "day")
          )

          .map((user, index) => {
            return { ...user, id: user._id, registrationDate: user.createdAt };
          });

        setFormattedUsers(formattedData);
        setTodayUsers(formattedData);
      });
    }
  }, [user, token, isAdmin, dispatch, callback]);

  const columns = [
    {
      field: "avatar",
      sortable: false,
      headerName: "Avatar",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt=""
          className=""
          style={{ width: 40, borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Nom et prénom", sortable: true, width: 200 },

    { field: "email", headerName: "Email", sortable: true, width: 200 },
    { field: "phone", headerName: "Téléphone", sortable: true, width: 200 },

    {
      field: "registrationDate",
      headerName: "Date d'inscription",
      sortable: true,
      width: 200,
      renderCell: (params) => (
        <span>
          {new Date(params.value).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="outlet app__home">
      <Headers title="Dashboard" />
      <HomeCount />
      <ChartContainer />
      <h3> Mes nouveaux utilisateurs</h3>
      <Table columns={columns} data={todayUsers} />

      <Footer />
    </div>
  );
};
export default Home;
