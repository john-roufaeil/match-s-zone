import { useState, useEffect, useContext } from "react";
import Alert from "../../atoms/Alert"
import "../../../assets/global.css"
import "./style.css"

const Form = props => {

    const getIsFormValid = type => {
    };

    const clearForm = () => { 
    }; 
    console.log(props);
    var msg = props.sucMsg ? <Alert className={props.sucMsg}>{props.sucMsg}</Alert>
            : props.errMsg ? <Alert className={props.errMsg}>{props.errMsg}</Alert>
            : null;
    return  <div> 
                {msg}
                <form autoComplete='new-password'>  {props.children} </form>
            </div>
}

export default Form;