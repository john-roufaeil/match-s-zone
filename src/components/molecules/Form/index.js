import { useState, useEffect, useContext } from "react";
import Alert from "../../atoms/Alert"

const Form = props => {
    const sucMsg = props.sucMsg;
    const errMsg = props.errMsg;

    const getIsFormValid = type => {
    };

    const clearForm = () => { 
    }; 
    
    var msg = sucMsg ? <Alert className={sucMsg}>{sucMsg}</Alert>
    :errMsg ? <Alert className={errMsg}>{errMsg}</Alert>
    : null;
    return  <div>
                {msg}
                <form autoComplete='new-password'>  {props.children} </form>
            </div>
}

export default Form;