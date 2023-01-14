import { Alert as AlertAntd } from 'antd';
import './style.css';
import error from "../../../assets/icons/actions/error.png"
import success from "../../../assets/icons/actions/success.png"

const Alert = ({ children, className, ...rest }) => {
    return (
        className.includes("success") ?
        <p className={`success  ${className}`} {...rest}><img src={success} alt="" width="10px" /> {children} </p> :
        className.includes("error") ?
        <p className={`error  ${className}`} {...rest}><img src={error} alt="" width="10px" /> {children}</p> : 
        null
    );
}

export default Alert;