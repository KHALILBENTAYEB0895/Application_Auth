import API from "./api";

export const register = async (userData) => {
    const response = await API.post('/register', userData);
    return response.data;
}

export const login = async (credentials) => {
    const response = await API.post('/login', credentials);
    return response.data;
}

export const logout = async () => {
    const response = await API.post('/logout');
    return response.data;
}