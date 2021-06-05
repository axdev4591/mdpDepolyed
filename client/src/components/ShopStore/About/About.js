import React, { useState } from 'react';
import './style.css'
import {MdpStyledError, MdpStyledFieldset, MdpStyledButton, 
    MdpStyledTextArea, MdpStyledInput, MdpStyledForm, MdpStyledFormWrapper, MdpButton}
    from '../../UI/MdpStyledComponents'

const About = (props) => {


  return (
    <div className="Content">

<div className="about">
    <img className="im" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvnepXY_pXSetZzx76oYZqMAPlQA7OVcBRmQ&usqp=CAU" width="300" height="300" />

            <div>
            "MEND Press" est une société d'édition de livres édifiants et inspirants.

            Ses sujets d'édition portent sur la Foi Chrétienne, le Développement Personnel, le Sport, le Bien être, la Santé, les Sciences, l'Education, la Musique, les Arts, 
            la Culture, le Développement économique, l'Entrepreneuriat et les Nouvelles Technologies.<br/> <br/>

            Vous êtes sur le site Internet de l'entité qui édite et publie de la littérature chrétienne 
            conforme à l'évangile du salut à travers Jésus-Christ et dont voici la mission: 
            <ul>
            <li>édifier les membres du Corps du Christ;</li>
            <li>encourager à faire confiance à Dieu et le servir;</li>
            <li>partager avec le plus grand nombre ce que Dieu fait dans les vies aujourd'hui;</li>
            <li>promouvoir les auteurs et transformer les manuscrits non édités en ouvrages.</li>
            </ul> <br/>

            Elle propose les services suivants:
            <ul>
            <li>porter à la connaissance des lecteurs des textes qui répondent à sa ligne éditoriale et qui l’auront convaincue;</li>
            <li>accompagner un auteur depuis le manuscrit jusqu’à ses lecteurs;</li>
            <li>contracter avec toute personne ou structure nécessaire à l’épanouissement des livres;</li>
            <li>avoir des activités économiques, qu’il s’agisse de vendre ses livres sans but lucratif
            ou de rémunérer l’auteur ainsi que toute personne ou structure avec laquelle un contrat marchand est
            passé;</li>
            <li>organiser ou participer à toute sorte d’action ou événement culturel (par exemple
            lecture publique, dédicaces, conférences, salon ou festival…) favorisant la diffusion du livre.</li>
            </ul> 
            </div>
</div>

</div>
  );
}

export default About;
