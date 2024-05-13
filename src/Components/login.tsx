import axios from "axios";
import { useState } from "react";
import "../Styles/login.css";
import { message } from "antd";

interface UserLoginProps {
  setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginLogout: React.Dispatch<React.SetStateAction<string>>;
}
function UserLogin({ setLoginVisible, setLoginLogout }: UserLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await axios.post("http://localhost:8000/login", {
        username: username,
        upassword: password,
      });
      console.log(response.data);
      if (response.data.sucssecc === false) {
        messageApi.open({
          type: "error",
          content: response.data.massage,
        });
      } else {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userId", JSON.stringify(response.data.userId));
        setLoginVisible(false);
        setLoginLogout("Logout");
        location.reload();
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      {contextHolder}
      <div>
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
          </div>
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
