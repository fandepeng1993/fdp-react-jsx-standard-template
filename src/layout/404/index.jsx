import {Result, Button} from 'antd';
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();
    const backTohome = useCallback(() => {
        navigate('/', {replace: true, state: null})
    }, [navigate]);
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={backTohome}>Back Home</Button>}
        />
    )
};
export default NoPage