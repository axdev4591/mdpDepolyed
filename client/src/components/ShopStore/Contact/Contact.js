import React, { useState } from 'react';
import './style.css'
import * as emailjs from 'emailjs-com'
import {MdpStyledError, MdpStyledFieldset, MdpStyledButton, 
    MdpStyledTextArea, MdpStyledInput, MdpStyledForm, MdpStyledFormWrapper, MdpButton}
    from '../../UI/MdpStyledComponents'



const initalState = {
  name: '',
  email: '',
  message: '',
  gender: ''
};

const Contact = (props) => {
  const [state, setState] = useState(initalState);
  const [error, setError] = useState('');
/*
  let templateParams = {
    from_name: email,
    to_name: '<YOUR_EMAIL_ID>',
    subject: subject,
    message_html: message,
   }
   emailjs.send(
    'gmail',
    'template_XXXXXXXX',
     templateParams,
    'user_XXXXXXXXXXXXXXXXXXXX'
   )*/

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(state);

    for (let key in state) {
      if (state[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    setError('');
    // const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const test = regex.test(state.email);
    // console.log(test);

    console.log("Succeeded!!!")
  };

  const handleInput = e => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState(prev => ({ ...prev, [inputName]: value }));
  };

  return (
    <div className="Content">

      <MdpStyledFormWrapper>
        
        <MdpStyledForm onSubmit={handleSubmit}>
          <h2>Formulaire de contact</h2>
          <label htmlFor="name">Nom</label>
          <MdpStyledInput
            type="text"
            name="name"
            value={state.name}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <MdpStyledInput
            type="email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
          <MdpStyledFieldset>
            <legend>Genre</legend>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={state.gender === 'female'}
                onChange={handleInput}
              />
              Homme
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={state.gender === 'male'}
                onChange={handleInput}
              />
              Femme
            </label>
          </MdpStyledFieldset>
          <label htmlFor="message">Message</label>
          <MdpStyledTextArea
            name="message"
            value={state.message}
            onChange={handleInput}
          />
          {error && (
            <MdpStyledError>
              <p>{error}</p>
            </MdpStyledError>
          )}
          <MdpButton style={{marginLeft: "54px"}} outline mdpXLContact type="submit">Envoyer</MdpButton>
        </MdpStyledForm>
      
        <div style={{marginLeft: "10px"}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.3892270676074!2d2.2991738153007777!3d48.75536291590999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67717a2ec0e71%3A0xec3497e82acb9328!2sAntony%20RER!5e0!3m2!1sen!2sfr!4v1611833758246!5m2!1sen!2sfr"
           width="600" height="550" frameborder="0" style={{border:"0"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
      </MdpStyledFormWrapper>
      </div>
  );
}

export default Contact;