
import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { AiOutlineMail } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return toast("Please enter a valid email address", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    try {
      const res = await axios.post("/user/forgot", { email });
      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      err.response.data.msg &&
        toast(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fg_pass">
        <h2>Mot de passe oublié?</h2>
        <div className="row">
          <label htmlFor="password" className="input-icon">
            <AiOutlineMail color="palevioletred" />
            <input
              placeholder="Adresse e-mail"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
              required
            />
          </label>
        
          <button onClick={forgotPassword}>Vérifier </button>
          <button onClick={forgotPassword}>Renvoyer</button>
         
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;

