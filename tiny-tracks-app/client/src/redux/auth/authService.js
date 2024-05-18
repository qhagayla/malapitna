import axios from "axios"

const BACKEND_DOMAIN = "http://localhost:8000"

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`

const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`
const CHANGE_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/users/change_password/`



// Register user

const register = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(REGISTER_URL, userData, config)

    return response.data
}

// Login user

const login = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(LOGIN_URL, userData, config)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// Logout 

const logout = () => {
    return localStorage.removeItem("user")
}



// Reset Password

const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(RESET_PASSWORD_URL, userData, config)

    return response.data
}

// Reset Password

const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config)

    return response.data
}

// Get User Info

const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const response = await axios.get(GET_USER_INFO, config)

    return response.data
}

const changePassword = async (passwordData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).access}`, // Include JWT token for authentication
      },
    };
  
    const response = await axios.post(CHANGE_PASSWORD_URL, passwordData, config);
    return response.data;
  };

const authService = { register, login, logout, resetPassword, resetPasswordConfirm, getUserInfo, changePassword }

export default authService