import axios from "axios";
import { useEffect, useState } from "react";
import CartProps from "./cartProps";
import "../Styles/productPage.css";
import { message } from "antd";

interface Product {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  id: number;
  handleCancel: any;
  itemID: number;
}
const Cart = () => {
  const [cartData, setCartData] = useState<Product[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userId");
      const parsedUserID = parseInt(userID as string);
      const token = localStorage.getItem("token");
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

          const response = await axios.get(
            `http://localhost:8000/usersCart?userID=${parsedUserID}`,
            config
          );

          if (Array.isArray(response.data)) {
            setCartData(response.data);
          } else {
            console.error("Response data:", response.data);
          }
        }
      } catch (error) {
        console.error("Error get data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {contextHolder}
      <div className="products">
        {cartData?.map((obj, index) => {
          return (
            <div className="products">
              <CartProps
                index={index}
                id={obj.id}
                title={obj.title}
                description={obj.description}
                price={obj.price}
                image={obj.image}
                alt={obj.alt}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
