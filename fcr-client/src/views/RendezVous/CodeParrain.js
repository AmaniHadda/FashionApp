import Axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Modal, Spinner } from 'react-bootstrap';
import VerificationCodeInput from 'react-verification-code-input';
import jumpTo from '../../modules/Navigation';
import "./style.css";
import { ToastContainer } from 'react-toastify';
import {
  isEmail
} from "../../components/utils/Validation";

const CodeParrain = (props) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [loading,setLoading]=useState(false)
  const [msg, setMsg]=useState('')
  const handleCodeChange = (code) => {
    setVerificationCode(code);
  };

  const handelEmail=(e)=>{
    setEmail(e.target.value)
  }
  const regenerationCodeParrain=async()=>{
    await Axios.put("/parrain/RegenererCodeParrain",{email:email}).catch(err=>console.log(err))
  }
  const ajouterParrain=async()=>{
    await Axios.post("/parrain/AjouterParrain",{email:sessionStorage.getItem("email"),phone:sessionStorage.getItem("phone")}).then(res=>console.log(res)).catch(err=>console.log(err))
  }

const VerifCode=async()=>{
  if (!isEmail(email)){
      setMsg("S'il vous plaît, mettez une adresse email valide.");
    }
  else if(isEmail(email)){
    setLoading(true)
    await Axios.post("/parrain/verificationCodeParrin",{codeParrain:verificationCode,email:email, idUser:sessionStorage.getItem("id")})
    .then(res=>{
      setLoading(false); 
      if(res.status===200){
        setMsg("Code vérifié avec succée")
        regenerationCodeParrain();
        setTimeout(() => {
          window.location.href="/tavyissa/rendezvous";
          ajouterParrain();  
        }, 2000);      
        sessionStorage.setItem("statusParrain", true); }

}).catch(err=>{setLoading(false);setMsg("Le code est incorrect, veuillez vérifier s'il vous plait.")})
  }

  }
useEffect(() => {
    if(verificationCode.length===6){
        VerifCode()
    }
  }, [verificationCode]);

useEffect(() => {
    if(verificationCode.length===6){
        VerifCode()
    }
  }, [email]);

 

  return (
    <>
    <ToastContainer/>
    <Modal
  {...props}
  size="md"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  style={{
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  }}
>
  <Modal.Body>
 
    <h4 style={{ color: 'palevioletred', marginBottom: '16px' }}>Le code de vérification</h4>
    <p style={{ fontSize: '16px', color: '#333333', marginBottom: '15px' }}>
    Vous n'avez pas encore de parrain. Vous devez saisir votre adresse e-mail et votre code de parrainage.
    </p>
    {msg==="Code vérifié avec succée" ?(<div className='text-center mb-3'><i class="fas fa-unlock" style={{fontSize:"35px", color:"grey"}}></i></div>):(    <div className='text-center mb-3'> <i class="fas fa-lock" style={{fontSize:"35px", color:"grey"}}></i></div>)}
    <div>

    </div>
    <div className='mx-5'>
    <p style={{ fontSize: '16px', color: '#333333', marginBottom: '5px' }}>
     Email de votre parrain :
    </p>
    <Form.Group className="mb-3 custom-input1" controlId="exampleForm.ControlInput1">
        <Form.Control  type="email" placeholder="Entrer votre email" value={email} onChange={handelEmail}/>
      </Form.Group>
    </div>

    <div className='mx-5'>
    <p style={{ fontSize: '16px', color: '#333333', marginBottom: '5px' }}>
     Votre code parrain :
    </p>
      
      <VerificationCodeInput
        className="custom-input"
        value={verificationCode}
        onChange={handleCodeChange}
        numInputs={6} // Nombre de champs de saisie du code
      />
      {loading && (<div className='text-center mt-3'><Spinner animation="border" variant="danger" /></div>)}
      {msg==="Le code est incorrect, veuillez vérifier s'il vous plait." && (<div className='text-center mt-3 text-danger' style={{ fontSize: "16px" }}>{msg}</div>)}
      {msg==="S'il vous plaît, mettez une adresse email valide." && (<div className='text-center mt-3 text-danger' style={{ fontSize: "16px" }}>{msg}</div>)}
      {msg==="Code vérifié avec succée" && (<div className='text-center mt-3 text-success' style={{ fontSize: "18px" }}><i class="fas fa-check-circle" style={{fontSize:"18px", color: "#4ce156", marginRight:"5px"}}></i>{msg}</div>)}
      <div className='text-center mt-3'>
        <button className='btn' onClick={() => jumpTo("/tavyissa/aide")} style={{ background: 'palevioletred', color: '#ffffff', borderRadius: '4px', padding: '8px 16px', fontSize: '14px', border: 'none' }}>Avez-vous besoin d'aide ?</button>
      </div>
    </div>
  </Modal.Body>
</Modal>

    
    </>
   
  );
};

export default CodeParrain;