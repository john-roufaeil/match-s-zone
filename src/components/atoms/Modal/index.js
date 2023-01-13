import { Modal as ModalAntd } from 'antd';
import "../../../assets/global.css"
import './style.css';

const Modal = ({ children, className, ...rest }) => {
    return (
        <ModalAntd className={`myModal ${className}`} {...rest}>
            {children}
        </ModalAntd>
    );
}

export default Modal;