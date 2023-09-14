import React, { useEffect, useState } from "react";
import { storage } from "../firebase/configFireBase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import ReactPlayer from "react-player";

export default function UploadSingelFile() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  // tạo 1 tham chiếu đến thư mục chứa kho ảnh trên firebase
  const imageListRef = ref(storage, "images/");

  // hàm upload file lên filebase
  const uploadFireBase = (files) => {
    // phải sử lí được tác vụ thêm nhiều file => bât đồng bộ => sử dụng promise
    Promise.all(
      files.map((file) => {
        //Tạo 1 tham chiếu <=> tạo model trên firebase
        const imageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      })
    ).then((urls) => {
      //trả về danh sách các urls
      setImageUrls((pre) => [...pre, urls]);
    });
  };

  // sau khi click tiến hành load lên firebase
  const handleUpLoad = () => {
    if (!imageUpload) {
      return;
    } else {
      uploadFireBase(imageUpload);
    }
  };

  const HandleSelectFile = (e) => {
    //lấy tất cả cácgias trị trong ô input có type="file"
    const files = Array.from(e.target.files);
    setImageUpload(files);
  };

  // lấy url trên firebase
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      // response trả về là 1 mảng danh sách các url
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  console.log(imageUrls);

  return (
    <>
      <div>
        <h1>Danh sách ảnh đã tải lên</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {imageUrls.map((url) => (
            <>
              <ReactPlayer url={url} controls={true} />
              <img key={url} src={url} alt="img" width={100} />
            </>
          ))}
        </div>
        <input type="file" onChange={HandleSelectFile} multiple />
        <button onClick={handleUpLoad}>upLoad</button>
      </div>
    </>
  );
}
