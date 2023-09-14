import React, { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import axios from "axios";

export default function SignIn() {
  const [userSign, getUserSign] = useState({
    email: "",
    password: "",
  });
  const getValue = (e) => {
    const { name, value } = e.target;
    getUserSign({ ...userSign, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", userSign)
      .then((response) => {
        notification.success({
          message: "Đăng nhập thành công",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Sai tài khoản hoặc mật khẩu",
        });
      });
  };

  return (
    <>
      {" "}
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-rgba-black">
        <form className="bg-white p-6 rounded w-2/12" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Sign Up</h1>
            <CloseCircleOutlined className="cursor-pointer hover:bg-slate-300" />
          </div>
          <div className="mb-3 mt-4">
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
