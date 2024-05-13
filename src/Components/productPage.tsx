import axios from "axios";
import { useEffect, useState } from "react";
import ProductProps from "./productProps";
import "../Styles/productPage.css";

interface Product {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  id: number;
  handleCancel: any;
}

const ProductPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [text, setText] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      try {
        if (!userID || !token) {
          setText(true);
        } else {
          const config = {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          };
          const response = await axios.get(
            "http://localhost:8000/shop",
            config
          );
          setData(response.data);
          console.log(token);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1
        style={{
          color: "#c23400",
          display: "flex",
          justifyContent: "center",
          visibility: text ? "visible" : "hidden",
        }}
      >
        Pleas Login Firs
      </h1>
      <div className="products">
        {Array.isArray(data) ? (
          data.map((obj, index) => (
            <ProductProps
              key={obj.id}
              index={index}
              id={obj.id}
              title={obj.title}
              description={obj.description}
              price={obj.price}
              image={obj.image}
              alt={obj.alt}
              handleCancel={obj.handleCancel}
            />
          ))
        ) : (
          <p className="info">No data available</p>
        )}
      </div>
    </>
  );
};

export default ProductPage;
