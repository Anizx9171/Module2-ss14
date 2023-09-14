import "./sign_up.css";
import React, { useState } from "react";
import { storage } from "../../firebase/configFireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Input, Radio, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [newUserValue, setNewUserValue] = useState({
    password: "",
    userName: "",
    email: "",
    dateOfbith: "",
  });

  const imageListRef = ref(storage, "images/");
  const navigate = useNavigate();
  const [gender, setGender] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const handleCheck = (e) => {
    setGender(e.target.value);
  };

  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        const downLoadUrl = info.file.response.url;
        message.success(`Hình ảnh tải lên thành công`);
        setImageUrl(downLoadUrl);
      } else if (info.file.status === "error") {
        message.error(`Hình ảnh tải lên thất bại`);
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // tạo 1 tham chiếu đến thư mục chứa kho ảnh trên firebase
        const imageRef = ref(imageListRef, "images/");

        // Tải ảnh lên firebase
        await uploadBytes(imageRef, file);

        // Lấy url từ firebase về
        const downloadURL = await getDownloadURL(imageRef);

        //gọi hàm on success bên trên để thông báo input ảnh thành công
        onSuccess({ url: downloadURL });
      } catch (error) {
        onError(error);
      }
    },
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setNewUserValue({ ...newUserValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      password: newUserValue.password,
      userName: newUserValue.userName,
      email: newUserValue.email,
      avatar: imageUrl,
      gender: gender,
      dateOfbith: newUserValue.dateOfbith,
    };
    axios
      .post("http://localhost:8080/users", newUser)
      .then((response) => {
        if (response.status === 201) {
          notification.success({
            message: "Đăng kí thành công",
          });
        }
        navigate("/sign-in");
      })
      .catch((error) => {
        notification.error({
          message: "Đăng kí thất bại",
        });
      });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-rgba-black">
        <form className="bg-white p-6 rounded w-2/6" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Sign Up</h1>
            <CloseCircleOutlined className="cursor-pointer hover:bg-slate-300" />
          </div>
          <div className="mb-3 mt-5">
            <label htmlFor="">Họ và tên:</label>
            <Input
              placeholder="họ và tên"
              name="userName"
              onChange={getValue}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date">Ngày sinh:</label>
            <Input
              type="date"
              className="mt-2"
              id="date"
              name="dateOfbith"
              onChange={getValue}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Giới tính:</label>
            <div>
              <Radio.Group onChange={handleCheck} value={gender}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
                <Radio value={2}>Khác</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="">Hính ảnh</label>
            <div>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="">Email:</label>
            <Input placeholder="Nhập email" name="email" onChange={getValue} />
          </div>
          <div className="mb-3">
            <label htmlFor="">Password:</label>
            <Input
              placeholder="Nhập mật khẩu"
              name="password"
              onChange={getValue}
            />
          </div>
          <div className="mt-3">
            <Button
              htmlType="submit"
              type="primary"
              className="w-full btn-primary"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
