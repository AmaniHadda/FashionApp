
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActivationEmail() {
  const { activation_token } = useParams();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activate", {
            activation_token,
          });
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
      activationEmail();
    }
  }, [activation_token]);

  return (
    <>
      <ToastContainer />
      <div className="active_page"></div>
    </>
  );
}

export default ActivationEmail;
