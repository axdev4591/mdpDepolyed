import React, { useState } from 'react';
import './style.css'
import * as emailjs from 'emailjs-com'
import {MdpStyledError, MdpStyledFieldset, MdpStyledButton, 
    MdpStyledTextArea, MdpStyledInput, MdpStyledForm, MdpStyledFormWrapper, MdpButton}
    from '../../UI/MdpStyledComponents'



const Contact = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState('')


  let templateParams = {
    from_name: email,
    to_name: 'axdev2020@gmail.com',
    subject: "[MENDPRESS]: Problème technique",
    message_html: message,
   }
   

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted!');
    
    if(email === ''){
      setErrorMessage('Enter Email'); return;
   }

  const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
  if(!emailPattern.test(email)){
      setErrorMessage('Invalid Email Address'); return;
  }

  emailjs.send(
    'gmail',
    'template_XXXXXXXX',
     templateParams,
    'user_XXXXXXXXXXXXXXXXXXXX'
   )
  
   setEmail('')
   setMessage('')
   alert('Message envoyé avec succès')
    console.log("Succeeded!!!")
  };



  return (
    <div className="Content">

      <MdpStyledFormWrapper>
        
        <MdpStyledForm onSubmit={handleSubmit}>
          <h2>Formulaire de contact</h2>
          <label style={{marginTop: "5px"}} htmlFor="name">Nom</label>
          <MdpStyledInput
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <MdpStyledInput
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <label htmlFor="message">Message</label>
          <MdpStyledTextArea
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errorMessage && (
            <MdpStyledError>
              <p>{errorMessage}</p>
            </MdpStyledError>
          )}
          <MdpButton style={{marginLeft: "54px"}} outline mdpXLContact type="submit">Envoyer</MdpButton>
        </MdpStyledForm>
      
        <div style={{marginLeft: "10px"}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.1119582773417!2d2.2983847153038113!3d48.837003110167124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6703f8085b8d7%3A0x73f0f48b3d1c931e!2s115%20Rue%20de%20l&#39;Abb%C3%A9%20Groult%2C%2075015%20Paris!5e0!3m2!1sen!2sfr!4v1622888512780!5m2!1sen!2sfr"
           width="600" height="550" frameborder="0" style={{border:"0"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>

      </MdpStyledFormWrapper>
      </div>
  );
}

export default Contact;



