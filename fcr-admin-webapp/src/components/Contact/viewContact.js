import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./viewcontact.css";

const ViewContact = () => {
  const [contact, setContact] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleContact(id);
    }
  }, [id]);

  const getSingleContact = async (id) => {
    const response = await axios.get(`/contact/informations/${id}`);
    if (response.status === 200) {
      setContact({ ...response.data[0] });
    }
    console.log("view", response);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Contact Details</p>
        </div>
        <div className="container">
          <strong>Name:</strong>
          <strong>{contact && contact.name} </strong>
          <br />
          <br />
          <strong>Email:</strong>
          <strong>{contact && contact.email} </strong>
          <br />
          <br />
          <strong>Phone:</strong>
          <strong>{contact && contact.phone} </strong>
          <br />
          <br />
          <strong>Object:</strong>
          <strong>{contact && contact.object} </strong>
          <br />
          <br />
          <strong>Message:</strong>
          <strong>{contact && contact.message} </strong>
          <br />
          <br />
          <Link to="/side">
            <button className="btn btn-edit">Go back </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
