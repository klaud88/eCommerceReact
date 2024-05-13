import axios from "axios";
import { useState } from "react";
import { message } from "antd";
import "../Styles/addProduct.css";

const AddProduct = () => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        await axios.post(
          "http://localhost:8000/addProduct",
          {
            image: image,
            title: title,
            description: description,
            price: price,
          },
          config
        );

        const success = () => {
          messageApi.open({
            type: "success",
            content: "Product Have Been Added !",
          });
        };
        success();
        setImage("");
        setTitle("");
        setPrice(0);
        setDescription("");
      }
    } catch (error: any) {
      if (error.response) {
        const errorFunction = () => {
          messageApi.open({
            type: "error",
            content: "Error: " + error,
          });
        };
        errorFunction();
      } else if (error.request) {
        const warning = () => {
          messageApi.open({
            type: "warning",
            content: "Warning: Failed to establish connection",
          });
        };
        warning();
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="lable" htmlFor="image">
              image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lable" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lable" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lable" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              required
            />
          </div>
          <button className="addProductBtn" type="submit">
            ADD
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
