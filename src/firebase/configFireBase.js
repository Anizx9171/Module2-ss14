import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAJgsWRdd3xBy7KrjGKv1SWprK1zJABUdI",
    authDomain: "project-module-2-4e592.firebaseapp.com",
    projectId: "project-module-2-4e592",
    storageBucket: "project-module-2-4e592.appspot.com",
    messagingSenderId: "262799620847",
    appId: "1:262799620847:web:9a4e77253cc6bc3854b91a"
};

// Khởi tạo firebase
const app = initializeApp(firebaseConfig);

//tạo tham chiếu đến dịch vụ lưu trữ đượ sử dụng để tham chiếu trong toàn bộ ứng dựng của mình
const storage = getStorage(app)

//export ra bên ngoài để dử dụng
export { storage };