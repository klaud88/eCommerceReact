import logo from "../assets/logo-white.png";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import UserLogin from "./login";
import { ConfigProvider } from "antd";
import Registration from "./registration";
import AddProduct from "./addProduct";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import "../Styles/mainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [addProductVisisble, setAddProductVisisble] = useState(false);
  const [loginLogout, setLoginLogout] = useState("Login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginLogout("Login");
    } else {
      setLoginLogout("Logout");
    }
  }, []);

  setTimeout(() => {
    localStorage.clear();
    setLoginLogout("Login");
  }, 30 * 60 * 1000);

  const handleLogin = () => {
    if (loginLogout == "Logout") {
      localStorage.clear();
      setLoginLogout("Login");
      location.reload();
    } else {
      setLoginVisible(true);
    }
  };

  const registrationHandle = () => {
    !registerVisible ? setRegisterVisible(true) : setRegisterVisible(false);
  };
  const handleAdd = () => {
    !addProductVisisble
      ? setAddProductVisisble(true)
      : setAddProductVisisble(false);
  };
  const handleLoginOpen = () => {
    setRegisterVisible(false);
    setLoginVisible(true);
  };

  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="logoDiv">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="searchDiv">
          <input className="search" placeholder="Search . . ."></input>
        </div>
        <Flex className="styledButtons">
          <Link to="/">
            <Button className="styledButton">Home</Button>
          </Link>
          <Button className="styledButton" onClick={handleLogin}>
            {loginLogout}
          </Button>
          <Button className="styledButton" onClick={registrationHandle}>
            Register
          </Button>
          <Link to="/cart">
            <ShoppingCartOutlined className="cartLogo" />
          </Link>
        </Flex>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#FDB750",
              headerBg: "#FDB750",
              titleColor: "black",
              titleFontSize: 18,
            },
          },
        }}
      >
        <Modal
          title="Login"
          open={loginVisible}
          onCancel={() => setLoginVisible(false)}
          footer={null}
        >
          <UserLogin
            setLoginVisible={setLoginVisible}
            setLoginLogout={setLoginLogout}
          />
        </Modal>

        <Modal
          title="Registration"
          open={registerVisible}
          onCancel={() => setRegisterVisible(false)}
          footer={null}
        >
          <Registration handleLoginOpen={handleLoginOpen} />
        </Modal>
        <Modal
          title="ADD Product"
          open={addProductVisisble}
          onCancel={() => setAddProductVisisble(false)}
          footer={null}
        >
          <AddProduct />
        </Modal>
      </ConfigProvider>
      <div className="productControlPanel">
        <Button className="controlPanleBtn" onClick={handleAdd}>
          ADD PRODUCT
        </Button>
      </div>
      <br />
    </>
  );
};

export default MainPage;
