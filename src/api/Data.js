import axios from "axios"

const getDataUsers = async () => await axios.get(" http://localhost:8080/users")
