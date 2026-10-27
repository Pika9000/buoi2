import axios from 'axios';

const API_URL = 'http://localhost:5157/api/products'; 

// 1. GET: Lấy danh sách sản phẩm
export const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// 2. POST: Thêm mới sản phẩm
export const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
};

// 3. PUT: Cập nhật sản phẩm
export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
};

// 4. DELETE: Xóa sản phẩm
export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};