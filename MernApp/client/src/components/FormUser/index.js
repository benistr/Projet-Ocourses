import React from 'react';
import { Divider } from 'semantic-ui-react';

import './style.scss';

/**
* Local import
*/
import Logo from './logo.png';


class FormUser extends React.Component {
    continue = event => {
        event.preventDefault();
        this.props.nextStep();
    }
    render() {
        // On récupères les props values de userAccount en les déstructurant
        const { values, handleChange } = this.props;
        return (

                <div className="userForm">

                    <h1 className="form-text">Mon Compte</h1> 
                    <img className="form-logo" src={Logo}/>
                    
                      <label className="label">Photo</label>
                      <p class="p-style">Ajoutez une photo pour     personnaliser votre compte</p>  

                    <div class="ui divider"></div> 

                      <label className="label">Nom</label>

                    <div class="ui divider"></div>  

                      <label className="label">Prénom</label>

                    <div class="ui divider"></div>                     
                      <label className="label">Email</label>
                    <div class="ui divider"></div>

                </div>
                   
          
        );
    }
}

export default FormUser;