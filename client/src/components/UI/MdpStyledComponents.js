import styled, {css, ThemeProvider} from 'styled-components'
import { colors } from './global.js'
 


export const MdpButton = styled.button`

font-family: 'Avenir';
cursor: pointer;

${props => props.outline && css`
    background: none;
  `};
${props => props.primary && css`
    background: ${colors.primary};
    color: ${colors.white};
`};
${props => props.secondary && css`
    background: ${colors.secondary}; 
    color: ${colors.white};
`};

${props => props.mdpXL && css`
    width: 90px;
    height: 28px;
    margin-bottom: 16px;
    padding: 0 6px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
    border: 1px solid ${colors.primary};
    color: ${colors.primary};

`};

${props => props.mdpXL && css`
    &:hover {
        background: ${colors.primary}; 
        color: ${colors.white};
    }
  `}

  ${props => props.mdpXLContact && css`
    width: 190px;
    height: 58px;
    margin-bottom: 16px;
    padding: 0 6px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
    border: 1px solid ${colors.primary};
    color: ${colors.primary};

`};

${props => props.mdpXLContact && css`
    &:hover {
        background: ${colors.primary}; 
        color: ${colors.white};
    }
  `}

  ${props => props.mdpXLTRI && css`
    width: 95%;
    margin: 2px 5px;
    padding: 5px 0;
    height: 33px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
    border: 1px solid ${colors.primary};
    color: ${colors.primary};

`};

${props => props.mdpXLTRI && css`
    &:hover {
        background: ${colors.primary}; 
        color: ${colors.white};
    }
  `}

${props => props.mdpM && css`
    width: 90px;
    height: 28px;
    margin-bottom: 16px;
    padding: 0 6px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
`};
${props => props.mdpM && css`
    &:hover {
        background: ${colors.secondary}; 
        color: ${colors.white};
    }
  `}

${props => props.mdpS && css`
    width: 80px;
    height: 20px;
    padding: 0 6px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
`};
${props => props.mdpEdit && css`
    width: 80px;
    height: 20px;
    padding: 0 6px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
    border: 1px solid ${colors.primary};
    color: ${colors.primary};
`};

${props => props.mdpEdit && css`
    &:hover {
        background: ${colors.primary}; 
        color: ${colors.white};
    }
  `}

  ${props => props.mdpDelete && css`
    width: 80px;
    height: 20px;
    padding: 0 6px;
    border-radius: 5px;
    box-shadow: 2px 1px rgba(0, 0, 255, .2);
    border: 1px solid ${colors.red};
    color: ${colors.red};
`};

${props => props.mdpDelete && css`
    &:hover {
        background: ${colors.red}; 
        color: ${colors.white};
    }
  `}
   
`


//Icons
export const MdpIcon = styled.i`
font-size: 18px;
margin-right: 16px;
`

//Form 

export const MdpSharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

export const MdpStyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

export const MdpStyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const MdpStyledInput = styled.input`
  display: block;
  width: 100%;
  ${MdpSharedStyles}
`;

export const MdpStyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${MdpSharedStyles}
`;
export const MdpStyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const MdpStyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;

  legend {
    padding: 0 10px;
  }

  label {
    padding-right: 20px;
  }

  input {
    margin-right: 10px;
  }
`;

export const MdpStyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;


/*


props.theme.primary.baseColor};

const theme = {
    primary: {
        baseColor: "#888"
    }
}


.Content{
    width: 85%;
    border-top: 3px solid #000;
    margin: 0 auto;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
.ContentTitle{
    text-align: center;
    margin: 20px 0;
}
.CategoryTitle{
    letter-spacing: 2px;
    font-size: 30px;
    font-weight: 300;
    text-transform: capitalize;
}


.ProductArea{
    display: flex;
    flex-wrap: wrap;
}

.Product{
    width: 280px;
    border: 1px solid #cecece;
    border-radius: 5px;
    text-align: center;
    margin: 0 1px 10px 0; /*changer le 1px à 10px pour pc windows mini
    -webkit-transform: scale(0.8);
          transform: scale(0.8);
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;  
}

.Product:hover {
    background-color: #2b3039;
  -webkit-transform: scale(1);
          transform: scale(1);
  cursor: pointer;
}
.Product > .ProductImage{
    width: 80%;
    height: 300px;
    overflow: hidden;
    margin: 0 auto;
}
.Product > .ProductImage > img{
    width: 200px;
    height: 300px;
}

.priceP span {
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
  }

.priceP {
font-size: 16px;
color: #fe8033;
} 

.btnP {
    width: 130px;
    height: 35px;
    font-size: 12px;
    border-radius: 35px;
    background-color: #2d343e;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    -webkit-transition: background-color .3s ease;
    transition: background-color .3s ease;
  
    margin-left: 55px;

    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  }


  .Product:hover .ProductDetails .btnP{
    background-color: #fe8033;
    font-size: 18px;
    font-weight: 200;
    color: #fff;
  }
  .Product:hover .ProductDetails .priceP{
    font-size: 17px;
  }
  .Product:hover .ProductDetails .nameP{
    font-size: 18px;
    font-weight: 200;
    color: #fff;
  }
  

.ProductDetails{
    margin: 20px 0;
}

.ContentBody{
    display: flex;
}
.ContentBody .SideMenu{
    flex: 2;
}
.ContentBody .MainContent{
    flex: 8;
}
.SideMenu{
    border: 1px solid #cecece;
    margin-right: 10px;
    box-sizing: border-box;
}
.SideMenu .SideMenuTitle{
    font-size: 18px;
    border-bottom: 1px solid #cecece;
    padding: 5px 10px;
}
.Filter .FilterTitle{
    font-size: 16px;
    font-weight: bold;
    padding: 5px 10px;
}
.SideMenu ul{
    position: relative;
}
.SideMenu ul li{
    margin-left: 10px;
    font-size: 14px;
}
.SideMenu > ul > li > a:nth-of-type(1){
    font-weight: bold;
}
.FilterButton{
    width: 95%;
    margin: 2px 5px;
    padding: 5px 0;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    background-color: #22402b;
    color: white;
}
.FilterButton:hover{
    background-color: black;
    color: white;
}
*/
