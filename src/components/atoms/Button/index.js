import { Button as ButtonAntd } from 'antd';
import './style.css';
import "../../../assets/global.css"

const Button = ({ children, className, ...rest }) => {
    return (
        <ButtonAntd className={`${className}`} {...rest}>
            {children}
        </ButtonAntd>
    );
}

export default Button;