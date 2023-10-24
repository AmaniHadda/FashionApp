import axios from "axios";
import React, { useEffect, useState } from "react";

import { Badge, Button, Card, Modal, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import './CustomPhoneInput.css';
import "react-toastify/dist/ReactToastify.css";
import jumpTo from "../../modules/Navigation";
import classNames from "classnames";

import {
  isEmpty,
} from "../utils/Validation";

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
const UserProfile = () => {

  const [visibleItems, setVisibleItems] = useState(2);
  const [load, setLoadMore] = useState(false);
  const [loadingj, setLoadingj] = useState(false);

  const [meeting, setMeeting] = useState([]);
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [idRdv, setIdRdv] = useState("");
  const id = sessionStorage.getItem("id");
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [modalShow, setModalShow] = React.useState(false);

  const nameUser = sessionStorage.getItem("name")
  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 2);
  };
  const handleClickLoad = () => {
    setLoadMore(true);
    setTimeout(() => {
      setLoadMore(false);
      loadMoreItems();
    }, 2000);
  };
  const [address, setAddress] = useState(
    sessionStorage.getItem("address") || ""
  );
  const [birthday, setBirthday] = useState(
    sessionStorage.getItem("birthday") || ""
  );
  const [phone, setPhone] = useState(sessionStorage.getItem("phone") || "");
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(sessionStorage.getItem("avatar") || "");
  const [justificatif, setJustificatif] = useState(sessionStorage.getItem("justificatif") || "");
  const [justificatifEdit, setJustificatifEdit] = useState("");
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleDetails = (id) => {
    jumpTo(`/tavyissa/habillement/details/${id}`);
  };
  const handleUpdateJustif = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('justificatif', justificatifEdit)
    console.log(justificatifEdit)
    setLoadingj(true)
    await axios.put(`/user/updateJustif`, formData).then(res => {
      setLoadingj(false)
      sessionStorage.setItem("justificatif", justificatifEdit.name);
      setJustificatif(sessionStorage.getItem("justificatif"))
      toast.success("Justificatif modifié avec succées")
      setEdit(false)
    }).catch(err => {toast.error("Erreur lors de l'importation du l'image"); setLoadingj(false)});
  };
  const HandleJustif = (e) => {
    { setJustificatifEdit(e.target.files[0]); setEdit(true) }
  };
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAvatar(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error:", error);
    };
  };
  const editProfile = async () => {
    setSubmitted(true)
    if (isEmpty(name) || isEmpty(address) || isEmpty(phone) || isEmpty(birthday)) {
      return toast.error("Merci de remplir tous les champs")
    }
    else {
      setIsLoading(true)
      console.log(avatar);
      await axios
        .put("/user/update", {
          id: id,
          name: name,
          email: email,
          address: address,
          phone: phone,
          birthday: birthday,
          avatar: avatar,
        })
        .then(() => {
          setIsLoading(false)
          setIsEditing(false);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("address", address);
          sessionStorage.setItem("phone", phone);
          sessionStorage.setItem("birthday", birthday);
          sessionStorage.setItem("avatar", avatar);

          toast.success("Vous avez modifier vos informations avec succès ");
        })
        .catch((err) => console.log(err.message));
    }
  };
  const getRDV = async () => {
    await axios
      .get(`/api/meetings/user/${id}`)
      .then((res) => setMeeting(res.data.meetings))
      .catch((err) => console.log(err));
  };
  const CancelRdv = async (idR) => {
    await axios
      .put(`/api/meetings/cancel/${idR}`)
      .then((res) => toast.success("Rendez-vous annulé "))
      .catch((err) => console.log(err));
    getRDV();
    setModalShow(false);
  };
  useEffect(() => {
    getRDV();
  }, [id]);
  const handleAnnuler = () => {
    setIsEditing(false);
    setName(sessionStorage.getItem("name"))
    setAddress(sessionStorage.getItem("address"))
    setBirthday(sessionStorage.getItem("birthday"))
    setPhone(sessionStorage.getItem("phone"))
    setAvatar(sessionStorage.getItem("avatar"))
  }
  const handleApprouve = (id) => {
    console.log("date " + date);
    axios
      .put(`/api/meetings/approuveDate/${id}`, {
        date: date,
      })
      .then((res) => {
        toast.success("Date confirmé");
        getRDV();
      })
      .catch((err) => console.log(err));
  };
  return nameUser ? (
    <div
      className="container bootstrap snippets bootdey "
      style={{ marginTop: "200px" }}
    >
      <div className="panel-body inf-content mt-5">
        <div className="row">

          <div className="col-md-7 ">
            <h2>
              <strong>Vos Informations</strong>
            </h2>
            <br />
            <div className="table-responsive">
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td>
                      <strong className="d-flex align-items-center">
                        <span className="glyphicon glyphicon-user  text-primary"></span>
                        <i
                          className="fas fa-user-circle"
                          style={{ marginRight: "10px", fontSize: "25px" }}
                        ></i>
                        Nom complet
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (


                        <input

                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={classNames({
                            "form-control": true,
                            "is-invalid": submitted && !name,
                          })}
                        />


                      ) : !name ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p>{name}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="d-flex align-items-center">
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        <i
                          className="fas fa-at"
                          style={{ marginRight: "10px", fontSize: "25px" }}
                        ></i>
                        Adresse Email
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (
                        <input
                          disabled={true}
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      ) : !email ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p>{email}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="d-flex align-items-center">
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        <i
                          className="fas fa-phone"
                          style={{ marginRight: "10px", fontSize: "25px" }}
                        ></i>{" "}
                        Numéro de téléphone
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (

                        <PhoneInput
                          defaultCountry="TN"
                          value={phone}
                          name="phone"
                          id="phone"
                          placeholder="Numéro de téléphone"
                          onChange={(phone) => setPhone(phone)}
                          className={classNames({
                            "p-invalid border-danger": submitted && !phone,
                          })}

                        />
                      ) : !phone ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p>{phone}</p>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong className="d-flex align-items-center">
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        <i
                          className="fas fa-map-marker-alt"
                          style={{ marginRight: "10px", fontSize: "25px" }}
                        ></i>
                        Adresse
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (
                        <input
                          className={classNames({
                            "form-control": true,
                            "is-invalid": submitted && !address,
                          })}
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      ) : !address ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p>{address}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="d-flex align-items-center">
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        <i
                          className="fas fa-birthday-cake"
                          style={{ marginRight: "10px", fontSize: "25px" }}
                        ></i>{" "}
                        Âge
                      </strong>
                    </td>
                    <td className="text-primary">
                      {isEditing ? (
                        <input
                          className={classNames({
                            "form-control": true,
                            "is-invalid": submitted && !birthday,
                          })}
                          type="date"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      ) : !birthday ? (
                        <i className="fa fa-spinner" />
                      ) : (
                        <p>{calculateAge(birthday)} ans</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4 ">
            <img
              alt=""
              width={300}

              title=""
              className="img-circle img-thumbnail isTooltip"
              src={
                avatar || "https://bootdey.com/img/Content/avatar/avatar7.png"
              }
              data-original-title="Usuario"
            />
            {isEditing && (
              <div className="d-flex align-items-center justify-content-between mr-5" >
                <label for="avatar-upload" className="custom-file-upload">
                  <span>Parcourir</span>
                  <input id="avatar-upload" type="file" onChange={handleAvatarChange} accept="image/*" />
                </label>
                {loading && <Spinner animation="border" variant="secondary" />}
              </div>
            )}
            {isEditing ? (
              <div className="d-flex align-items-center justify-content-center">
                <button
                  style={{ border: "none", color: "white" }}
                  className="red_button shop_now_button"
                  onClick={editProfile}
                >
                  Enregistrer
                </button>
                <button className="customAnnuler shop_now_button"
                  onClick={handleAnnuler}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <button
                style={{ border: "none", color: "white" }}
                className="red_button shop_now_button"
                onClick={handleEditClick}
              >
                Modifier
              </button>


            )}
            <ToastContainer />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-7">
            <h2 ><strong>Votre Justificatif</strong></h2>
           { (sessionStorage.getItem("isJustified")==="Pas de justificatif")&&<p style={{ color: "#fa6464" }}>N.B : Veuillez soumettre une photo de votre carte d'identité ou de votre passeport afin de pouvoir planifier un rendez-vous.</p>}
{ (sessionStorage.getItem("isJustified")==="En attente")&&<p style={{ color: "#fa6464" }} className="text-info"><strong>N.B : </strong> Nous validerons ce fichier dès que possible.</p>}            
{ (sessionStorage.getItem("isJustified")==="Justifié")&&<p style={{ color: "#fa6464" }} className="text-info"><strong>N.B : </strong> Votre fichier est validé. Vous pouvez maintenant prendre un rendez-vous.</p>}            
{(justificatif !== "undefined") && <div ><img
                alt=""
                width={300}
                style={{ height: "200px" }}
                title=""
                className="img-circle img-thumbnail isTooltip"
                src={`${process.env.REACT_APP_URL_UPLOAD}justificatifs/${justificatif}`}
                data-original-title="Usuario"
              />
                <div>
                  {(!edit && sessionStorage.getItem("isJustified")!=="Justifié") && <>
                  <label for="avatar-upload" className="custom-file-upload">
                    <span>Modifier la photo</span>
                    <input id="avatar-upload" type="file" name="justificatif" onChange={HandleJustif} accept="image/*" />
                  </label>
                  </>}
                  {loadingj && <Spinner animation="border" variant="secondary" />}
                  {edit && <div className="row d-flex align-items-center">
                  <button style={{ background:"transparent" }} onClick={handleUpdateJustif}
                  className="custom-file-upload">Valider</button></div>}</div></div>
            }
            {(justificatif === "undefined" || justificatif === "") && <div className="d-flex align-items-center" >
              <input id="avatar-upload" type="file" accept="image/*" onChange={HandleJustif} />
              {loadingj && <Spinner animation="border" variant="secondary" />}
              {edit && <div className="d-flex align-items-center justify-content-between">
                <button style={{ background:"transparent" }} onClick={handleUpdateJustif}
                  className="custom-file-upload">Valider</button>
               </div>}

            </div>}
          </div>

        </div>
      </div>
      <div className="mt-5">
        {meeting.length !== 0 &&
          meeting.some((e) => e.isCanceled === false) && (
            <h2 className="text-center">
              <strong>Vos rendez-vous</strong>
            </h2>
          )}
        {meeting.length !== 0
          ? meeting.slice(0, visibleItems).map((item, i) => {
            if (item.isCanceled === false)
              return (
                <>
                  <Card className="w-75 mx-auto mt-4">
                    <Card.Header as="h5" className="d-flex">
                      Rendez-Vous le {item.date.slice(0, 10)}
                    </Card.Header>
                    <Card.Body>
                      <div className="row d-flex justify-content-between mx-2">
                        <Card.Title>Votre coach: {item.coachName?.name}</Card.Title>
                        <div className="col-1 ">
                          {item.status === "En attente" && (
                            <button
                              type="button"
                              className=" btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setModalShow(true);
                                setIdRdv(item._id);
                              }}
                            >
                              Annuler
                            </button>
                          )}
                          {item.status === "Reporté" && (
                            <button
                              type="button"
                              className=" btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setModalShow(true);
                                setIdRdv(item._id);
                              }}
                            >
                              Cancel
                            </button>
                          )}
                          {item.status === "Rejeté" && (
                            <button
                              type="button"
                              className=" btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setModalShow(true);
                                setIdRdv(item._id);
                              }}
                            >
                              Annuler
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 ml-2">
                        Votre rendez vous est {"  "}
                        {item.status === "En attente" && (<>
                          <Badge pill variant="secondary">
                            {item.status}
                          </Badge>
                          <div className="text-info" style={{ fontSize: "14px", marginTop: "10px" }}><strong>N.B :{' '}</strong>Nous vous répondrons dans un délai de 24 heures.</div>
                        </>
                        )}
                        {item.status === "Approuvé" && (
                          <Badge pill variant="success">
                            {item.status}
                          </Badge>
                        )}
                        {item.status === "Reporté" && (
                          <Badge pill variant="info">
                            {item.status}
                          </Badge>
                        )}
                        {item.status === "Rejeté" && (
                          <Badge pill variant="danger">
                            {item.status}
                          </Badge>
                        )}
                      </div>
                      {item.status === "Reporté" && (
                        <>
                          <div>Choisir une date </div>
                          {item.otherDates?.map((d) => (
                            <div className="form-check form-check-inline mb-3">
                              <input
                                type="radio"
                                value={d.slice(0, 10)}
                                className="mx-2 form-check-input"
                                onChange={(e) => setDate(e.target.value)}
                                name="otherdates"
                              />
                              {d?.slice(0, 10)}
                            </div>
                          ))}
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                          >
                            <i
                              style={{
                                backgroundColor: "transparent",
                                color: "pink",
                                fontSize: "25px",
                              }}
                              className="fas fa-edit"
                              onClick={() => handleApprouve(item._id)}
                              onMouseOver={(e) =>
                                (e.target.style.color = "#ed6fcc")
                              }
                              onMouseOut={(e) =>
                                (e.target.style.color = "pink")
                              }
                            ></i>
                          </button>
                        </>
                      )}
                      <div className="mb-3 mt-2 ml-2">
                        {item.rejectedReason && (
                          <>
                            <Card.Title>La raison est : {"  "}</Card.Title>
                            <div>{item.rejectedReason}</div>
                          </>
                        )}
                      </div>

                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            {item.habillements.length !== 0 && (
                              <th colspan="4" className="text-center">
                                La liste des habillements
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {item.habillements?.map((e) => (
                            <tr onClick={() => handleDetails(e._id)}>
                              <td className="d-flex justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_URL_UPLOAD}habillements/${e.img}`}
                                  alt={e.description}
                                  title={e.title}
                                  height={60}
                                  width={50}
                                />
                              </td>
                              <td>{e.name}</td> <td>{e.newPrice !== 0 ? e.newPrice : e.price} TND</td>

                            </tr>
                          ))}{" "}
                        </tbody>{" "}
                      </Table>

                      <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                            Confirmation
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Vous êtes sûr d'annuler votre rendez-vous ?</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            style={{
                              border: "none",
                              borderRadius: "5px ",
                              color: "white",
                              backgroundColor: "#FEADDB",
                              height: "40px",
                              width: "90px",
                            }}
                            onClick={() => CancelRdv(idRdv)}
                          >
                            Supprimer
                          </button>
                          <button
                            style={{
                              border: "none",
                              borderRadius: "5px ",
                              color: "white",
                              backgroundColor: "grey",
                              height: "40px",
                              width: "90px",
                            }}
                            onClick={() => setModalShow(false)}
                          >
                            Annuler
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </Card.Body>
                  </Card>
                </>
              );
          })
          : null}
        <div
          className="row"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {visibleItems < meeting.length && (
            <button
              style={{ border: "none", color: "white", width: "200px" }}
              className="red_button shop_now_button"
              disabled={load}
              onClick={() => handleClickLoad()}
            >
              {load && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Afficher plus...
            </button>
          )}
        </div>
        {(meeting.length === 0 ||
          meeting.every((e) => e.isCanceled === true)) && (
            <div>
              <h2 className="text-center">Pas de rendez-vous !</h2>
              <h1
                style={{ color: "#f1bce3", fontWeight: "bold" }}
                className="pb-3 text-center"
              >
                Pour prendre un rendez-vous {" "}
                <a
                  href="/tavyissa/rendezvous"
                  style={{ color: "#f1bce3", fontWeight: "bold" }}
                >
                  cliquez ici
                </a>
              </h1>
            </div>
          )}
      </div>
    </div>
  ) : (
    (window.location.href = "/tavyissa")
  );
};

export default UserProfile;
