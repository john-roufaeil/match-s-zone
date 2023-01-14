import { Input as InputAntd } from 'antd';
import './style.css';

const Input = ({ className, ...rest }) => {
    return (
        <InputAntd className={`${className}`} {...rest} />
    );
}

export default Input;    