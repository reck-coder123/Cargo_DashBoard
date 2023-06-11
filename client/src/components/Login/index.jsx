import { useState } from "react";
import axios from "axios";
import * as Components from "../components";
import "../styles.css";	
import Flex from "../Flexbetween/Flex";
import Flex1 from "../Flexbetween/Flex1";

const Login=()=>{
	const [signIn, toggle] = useState(true);
    const [data,setData]=useState({
        email: "",
        password: "",
    });
	
	const [Tdata,TsetData]=useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleTChange = ({ currentTarget: input }) => {
		TsetData({ ...Tdata, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/login/manufacturer";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("Mtoken", res.token);
            console.log(res.user);
			window.location = "/profile";
      setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const handleTSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/login/transporter";
			const { data: res } = await axios.post(url, Tdata);
			localStorage.setItem("Ttoken", res.token);
            console.log(res.user);
			window.location = "/profile";
      setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    return(
		<div>
			{error && <div>{error}</div>}
			{msg && <div>{msg}</div>}
			<Flex />
			<Flex1 />
<div className=" flex justify-center items-center">
		<Components.Container>
<Components.SignUpContainer signingIn={signIn}>
<Components.Form className="form" method="POST" onSubmit={handleSubmit}>
<Components.Title>Login For Manufacturer</Components.Title>

<Components.Input type="email"
				placeholder="Email"
				name="email"
				onChange={handleChange}
				value={data.email}
				required />
<Components.Input type="password"
				placeholder="Password"
				name="password"
				onChange={handleChange}
				value={data.password}
				required />
<Components.Button type="submit" className="submit">Sign in</Components.Button>
</Components.Form>
</Components.SignUpContainer>
<Components.SignInContainer signingIn={signIn}>
<Components.Form className="form" method="POST" onSubmit={handleTSubmit}>
<Components.Title>Login for Transporter</Components.Title>


<Components.Input type="email"
				placeholder="Email"
				name="email"
				onChange={handleTChange}
				value={Tdata.email}
				required />
<Components.Input type="password"
				placeholder="Password"
				name="password"
				onChange={handleTChange}
				value={Tdata.password}
				required />

				
<Components.Button type="submit" className="submit">Sign in</Components.Button>
</Components.Form>
</Components.SignInContainer>
<Components.OverlayContainer signingIn={signIn}>
<Components.Overlay signingIn={signIn}>
<Components.LeftOverlayPanel signingIn={signIn}>
<Components.Title>Login for Transporter</Components.Title>
<Components.Paragraph>
  
</Components.Paragraph>
<Components.GhostButton onClick={() => toggle(true)}>
  Sign In
</Components.GhostButton>
</Components.LeftOverlayPanel>
<Components.RightOverlayPanel signingIn={signIn}>
<Components.Title>Login for Manufacturer</Components.Title>
<Components.Paragraph>
  
</Components.Paragraph>
<Components.GhostButton onClick={() => toggle(false)}>
  Sign in
</Components.GhostButton>
</Components.RightOverlayPanel>
</Components.Overlay>
</Components.OverlayContainer>
</Components.Container>
</div>
		</div>
		
    );
};

export default Login;