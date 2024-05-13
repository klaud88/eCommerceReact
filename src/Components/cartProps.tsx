import { Button, ConfigProvider } from "antd";
import "../Styles/cartProps.css";
import { message } from "antd";
import axios from "axios";

interface Product {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  index: number;
  id: number;
}

const CartProps = (props: Product) => {
  const [messageApi, contextHolder] = message.useMessage();

  const removeProduct = () => {
    const userID = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        messageApi.open({
          type: "error",
          content: "Error: Cannot Find Token ",
        });
      } else {
        if (userID === null) {
          const error = () => {
            messageApi.open({
              type: "error",
              content: "User is not Authorised",
            });
          };
          error();
        } else {
          const config = {
            headers: {
              //@ts-ignore
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          };
          axios
            .post(
              "http://localhost:8000/removeFromCart",
              {
                itemID: props.id,
                userID: parseInt(userID),
              },
              config
            )
            .then(() => {
              const success = () => {
                messageApi.open({
                  type: "success",
                  content: "Successfully Deleted !",
                });
              };
              success();
              location.reload();
            });
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error: " + error,
      });
    }
  };

  return (
    <>
      {contextHolder}
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
      ></ConfigProvider>
      <div className="productOrder">
        <div className="productContainers">
          <div className="productHeader">
            <p className="productTitle">{props.title}</p>
            <p className="productId">id: {props.id}</p>
          </div>
          <img className="productImage" src={props.image} alt="image" />
          <p className="productDsc">{props.description}</p>

          <hr className="hr"></hr>
          <div className="productAddPositions">
            <div className="productPrice">
              <h1>{props.price} &#8382;</h1>
            </div>
          </div>
          <div className="editRemovePanel">
            <Button className="cartRemove" onClick={removeProduct}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartProps;
