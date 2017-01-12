/**
 * Created by keerthiniranjan on 10/01/17.
 */
import axios from "axios";

export function login(data) {
    return axios.post('http://192.168.0.161:3000/api/auth/login/', data)
}

export function getPlanningBoard(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get('http://192.168.0.161:3000/api/planningboard/')
}

export function getPlanningBoardDetails(token, id) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`http://192.168.0.161:3000/api/planningboard/${id}`)
}