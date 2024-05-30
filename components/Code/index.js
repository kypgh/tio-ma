
import { Inputcode } from './code.styles';

export default function Code({ children, ...rest }) {
    return <Inputcode {...rest}>{children}</Inputcode>;
}
