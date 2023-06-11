import { useState } from "react";
import axios from "axios";
import * as Components from "../components";
import "../styles.css";	

const Signup=()=>{
	const [signIn, toggle] = useState(true);
    const [data,setData]= useState({
        name: "",
        email: "",
        password: "",
        Address: "",
    });

	const [Tdata,TsetData]= useState({
        name: "",
        email: "",
        password: "",
        Address: "",
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
			const url = "http://localhost:8080/api/register/manufacturer";
			const { data: res } = await axios.post(url, data);
            window.location="/";
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
			const url = "http://localhost:8080/api/register/transporter";
			const { data: res } = await axios.post(url, Tdata);
            window.location="/login";
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
        <div className="flex justify-center items-center">
					<Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form className="form" method="POST" onSubmit={handleSubmit}>
          <Components.Title>Create Account For Manufacturer</Components.Title>
          <Components.Input type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required />

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
		  <Components.Input type="text"
							placeholder="Address"
							name="Address"
							onChange={handleChange}
							value={data.Address}
							required />
          <Components.Button type="submit" className="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form className="form" method="POST" onSubmit={handleTSubmit}>
          <Components.Title>Create Account for Transporter</Components.Title>
          <Components.Input type="text"
							placeholder="Name"
							name="name"
							onChange={handleTChange}
							value={Tdata.name}
							required />

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
		  <Components.Input type="text"
							placeholder="Address"
							name="Address"
							onChange={handleTChange}
							value={Tdata.Address}
							required />
							{error && <div>{error}</div>}
						{msg && <div>{msg}</div>}
          <Components.Button type="submit" className="submit">Sign up</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Signup for Transporter</Components.Title>
            <Components.Paragraph>
              
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign up
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Sign up for Manufacturer</Components.Title>
            <Components.Paragraph>
              
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
        </div>
    )
};
export default Signup;
