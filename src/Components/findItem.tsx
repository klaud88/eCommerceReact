import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import "../Styles/findItem.css";
interface Product {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  index: number;
  id: number;
  handleCancel: any;
}

const FindItem = (props: Product) => {
  const [image, setImage] = useState(props.image);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState<number>(props.price);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
          "http://localhost:8000/editProduct",
          {
            id: props.id,
            image,
            title,
            description,
            price,
          },
          config
        );
        props.handleCancel();
        const success = () => {
          messageApi.open({
            type: "success",
            content: "Successfully Updated !",
          });
        };
        success();
        location.reload();
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
      <div>
        <form onSubmit={handleUpdate}>
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
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default FindItem;
