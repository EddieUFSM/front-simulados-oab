import axios from 'axios'

export default axios.create({
    baseURL: "https://backsimulados.rj.r.appspot.com/api",
    headers: {
        "Content-type": "application/json"
    }
})