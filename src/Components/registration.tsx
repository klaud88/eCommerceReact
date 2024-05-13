import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/registration.css";
import { Result } from "antd";
import { message } from "antd";

interface RegistrationProps {
  handleLoginOpen: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ handleLoginOpen }) => {
  const [username, setUsername] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [registrtionInfo, setRegistrationInfo] = useState(". . .");
  const [email, setEmail] = useState("");
  const [errorPassword, setErrorPassword] =
    useState<string>("Registration Form");
  const [registrationResult, setRegistrationResult] =
    useState<JSX.Element | null>(null);
  console.log(registrtionInfo);
  useEffect(() => {
    const validate = password === repeatPassword ? true : false;
    !validate ? setErrorPassword("Password Not Match") : setErrorPassword("");
  }, [repeatPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/usernameCheck", {
        username: username,
      });

      if (response.data.sucssecc === false) {
        setRegistrationInfo(JSON.stringify(response.data.massage));
      } else {
        const response = await axios.post(
          "http://localhost:8000/registration",
          {
            username: username,
            upassword: password,
            email: email,
          }
        );
        if (response.data.success === false) {
          setRegistrationInfo(JSON.stringify(response.data.massage));
        } else {
          handleLoginOpen();
          const success = () => {
            messageApi.open({
              type: "success",
              content: "Registration Successfully !",
            });
          };
          setUsername("");
          setPassword("");
          setRepeatPassword("");
          setEmail("");
          success();
        }
      }
    } catch (error) {
      setRegistrationResult(
        <Result
          status="error"
          title="Registration Failed"
          subTitle="There was an error during registration. Please try again later."
        />
      );
    }
  };
  return (
    <>
      {contextHolder}
      {registrationResult}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="lable" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="lable" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="lable" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="lable" htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <h1 className="errorPassword">{errorPassword}</h1>
          <h1 className="errorPassword">{registrtionInfo}</h1>
        </div>

        <button className="loginButton" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default Registration;
