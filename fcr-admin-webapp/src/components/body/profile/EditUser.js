
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notifications/Notification";

function EditUser() {
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccees] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);
  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );
        setSuccees(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  const handleCheck = () => {
    setSuccees("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    <div className="profile_page edit_user">
      <div className="row">
        <button onClick={() => history.goBack()} className="go_back">
          <i className="fas fa-long-arrow-alt-left"></i> Go back
        </button>
      </div>
      <div className="col-left">
        <h2>Edit User</h2>
        <div className="form-froup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            placeholder="Your name "
            disabled
          />
        </div>
        <div className="form-froup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            placeholder="Your email address "
            disabled
          />
        </div>
        <div className="form-froup">
          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            name="phone"
            defaultValue={editUser.phone}
            placeholder="Your Phone "
            disabled
          />
        </div>

        <div className="form-group"></div>
        <input
          type="checkbox"
          id="isAdmin"
          checked={checkAdmin}
          onChange={handleCheck}
        />
        <label htmlFor="isAdmin">isAdmin</label>

        <button onClick={handleUpdate}>Update</button>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  );
}

export default EditUser;

