
import axios from 'axios'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { path, token } from '../env/env'
import { SwlCredentialsError, SwlLoginError, SwlNoAccountError } from './Swal';
const adminToken = Cookies.get('admin-access')
const accessToken = Cookies.get('x-access')
export const registerUser = async (data) => {
    const res = await axios.post(path + '/register', {
        data: data
    });
    if (res) {
        if (res.status === 201) {
            return res;
        }
        else {
            return false;
        }
    }
}
export const registerOrg = async (data) => {
    const res = await axios.post(path + '/register-org', {
        data: data
    })
    if (res) {
        if (res.status === 201) {
            return res;
        }
        else return false;
    }
}

export const loginUser = async (data) => {
    const res = await axios.post(path + '/login', {
        data: data
    });
    console.log(res)
    if (res) {
        if (res.status === 200) {
            console.log(res)
            return res;
        }
        else {
            return false;
        }
    }
    else {
        SwlLoginError();
    }
}
export const postProduct = async (data) => {
    try {
        console.log(data);
        const token = Cookies.get('x-access');
        const formData = new FormData();
        formData.append('productImage', data.image);
        formData.append("name", data.name);
        formData.append("quantity", data.quantity);
        formData.append('price', data.price);
        formData.append('desc', data.desc);
        formData.append('type', data.type);
        formData.append("token", token);
        const res = await axios.post(path + '/add-product', formData);
    }

    catch (err) {
        console.log(err)
    }
}
export const addCard = async (data) => {
    try {
        const token = Cookies.get('x-access');
        const res = await axios.post(path + "/add-card", data, {
            headers: {
                authorization: token
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
    }
}
export const adminLogin = async (data) => {
    try {
        const res = await axios.post(path + '/adminlogin', data);
        console.log(res.data)
        if (res.status === 200) {
            return res.data;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err)
    }
}
export const updateProduct = async (id) => {
    try {
        const res = await axios.post(path + '/adminupdate', {
            id: id
        }, {
            headers: {
                authorization: adminToken
            }
        });
        if (res.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err)
    }
}
export const deleteProduct = async (id) => {
    try {
        const res = await axios.post(path + '/deleteproduct', {
            id: id
        }, {
            headers: {
                authorization: adminToken
            }
        })
        if (res.status === 200) {
            return true;
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log(err)
    }
}

export const addToWishList = async (data) => {
    try {
        const decode = jwtDecode(accessToken);
        console.log(decode)
        data = { ...data, ref_id: decode.user_id };
        console.log(data)
        const res = await axios.post(path + '/addtowishlist', {
            data: data
        }, {
            headers: {
                authorization: accessToken
            }
        })
        if (res.status === 200) {
            return true;
        }
        else if (res.status === 205) {
            SwlCredentialsError();
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err)
    }
}