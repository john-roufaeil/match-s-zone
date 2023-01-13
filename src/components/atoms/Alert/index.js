import { Alert as AlertAntd } from 'antd';
import './style.css';
// import success from "../assets/icons/actions/success.png"

const Alert = ({ children, className, ...rest }) => {
    return (
        className === "errMsg" ?
        <AlertAntd type="error" showIcon className={`${className}`} {...rest}>
            {children}
        </AlertAntd> : 
        className === "succMsg" ?
        <AlertAntd type="success" showIcon className={`${className}`} {...rest}>
            {children}
        </AlertAntd> : 
        className === "info" ?
        <AlertAntd type="info" showIcon className={`${className}`} {...rest}>
            {children}
        </AlertAntd> : null
    );
}

export default Alert;