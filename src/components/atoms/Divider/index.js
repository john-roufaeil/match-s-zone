import { Divider as DividerAntd } from 'antd';
import './style.css';

const Divider = ({ children, className, ...rest }) => {
    return (
        <DividerAntd className={`${className}`} {...rest}>
            {children}
        </DividerAntd>
    );
}

export default Divider;