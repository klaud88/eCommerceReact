import { Button, ConfigProvider, Modal } from "antd";
import "../Styles/productProps.css";
import { message } from "antd";
import axios from "axios";
import FindItem from "./findItem";
import { useState } from "react";
interface Product {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  index: number;
  id: number;
  handleCancel: void;
}

const ProductProps = (props: Product) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editProduct = () => {
    showModal();
  };
  const token = localStorage.getItem("token");
  const removeProduct = () => {
    try {
      if (!token) {
        messageApi.open({
          type: "error",
          content: "Error: Connot Find token!",
        });
      } else {
        const config = {
          headers: {
            //@ts-ignore
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        };
        axios
          .post(
            "http://localhost:8000/removeProduct",
            {
              id: props.id,
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
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error: " + error,
      });
    }
  };

  const handleAdd = async () => {
    const userID = localStorage.getItem("userId");
    const parsedUserID = parseInt(userID as string);

    try {
      if (!token) {
        messageApi.open({
          type: "error",
          content: "Error: Cannot Find Token ",
        });
      } else {
        const config = {
          headers: {
            //@ts-ignore
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        };
        const userCart = await axios.post(
          "http://localhost:8000/addCart",
          {
            itemID: props.id,
            userID: parsedUserID,
          },
          config
        );
        if (userCart) {
          const success = () => {
            messageApi.open({
              type: "success",
              content: "Successfully Added !",
            });
          };
          success();
          location.reload();
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error" + error,
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
      >
        <Modal
          title="Edit Product"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <FindItem {...props} handleCancel={handleCancel} />
        </Modal>
      </ConfigProvider>
      <div className="productOrder">
        <div className="productContainer">
          <div className="productHeader">
            <p className="productTitle">{props.title}</p>
            <p className="productid">id: {props.id}</p>
          </div>
          <img className="productImages" src={props.image} alt="image" />
          <p className="productDesc">{props.description}</p>

          <hr className="hr"></hr>
          <div className="productAddPositions">
            <div className="producstPrice">
              <h1>{props.price} &#8382;</h1>
            </div>
            <Button className="productsAdd" onClick={handleAdd}>
              ADD
            </Button>
          </div>
          <div className="editRemovePanels">
            <Button className="productsPanel" onClick={editProduct}>
              Edit
            </Button>
            <Button className="productsPanel" onClick={removeProduct}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductProps;
