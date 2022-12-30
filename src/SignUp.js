import NavBar from "./components/NavBar";
import Greeting from "./components/Greeting";
import Icon from "./components/Icon";
import Form from "./components/Form";

const SignUp = () => {
    const barComponents = {left: null, right: "login"};
    return (
        <>
            <NavBar barComponents = {barComponents} />
            <Greeting>
                <Icon desc="fan" />
                <Icon desc="manager" />
                <Icon desc="stadium" />
                <Icon desc="club" />
            </Greeting>
            <Form />
        </>
    );
};

export default SignUp;