import { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api.js';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [editingId, setEditingId] = useState(null); // Lưu ID nếu đang ở chế độ Sửa (PUT)

    // 1. Gọi [GET] ngay khi người dùng vào trang ProductsPage
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách sản phẩm:", err);
        }
    };

    // Xử lý khi bấm nút Lưu (Tự động phân biệt giữa [POST] và [PUT])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price) || 0
            };

            if (editingId) {
                // 2. Gọi [PUT] để cập nhật sản phẩm
                await updateProduct(editingId, { id: editingId, ...payload });
                setEditingId(null);
            } else {
                // 3. Gọi [POST] để thêm mới sản phẩm
                await createProduct(payload);
            }

            // Reset form và tải lại danh sách từ DB
            setFormData({ name: '', price: '', description: '', imageUrl: '' });
            loadProducts();
        } catch (err) {
            console.error("Lỗi khi lưu sản phẩm:", err);
        }
    };

    // Đổ dữ liệu sản phẩm cần sửa lên Form
    const handleEditClick = (product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl
        });
    };

    // 4. Gọi [DELETE] khi bấm nút Xóa
    const handleDeleteClick = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không? :<")) return;
        try {
            await deleteProduct(id);
            loadProducts(); // Tải lại danh sách sau khi xóa
        } catch (err) {
            console.error("Lỗi khi xóa sản phẩm:", err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Danh sách Sản phẩm (ProductsPage)</h2>

            {/* FORM THÊM / SỬA SẢN PHẨM (POST / PUT) */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Tên sản phẩm..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Giá..."
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Mô tả..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <button type="submit">
                    {editingId ? 'Cập nhật (PUT)' : 'Thêm mới (POST)'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', price: '', description: '', imageUrl: '' }); }}>
                        Hủy sửa
                    </button>
                )}
            </form>

            {/* DANH SÁCH SẢN PHẨM HIỂN THỊ TỪ API (GET & DELETE) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                {products.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                        <h3>{item.name}</h3>
                        <p><strong>Giá:</strong> {item.price.toLocaleString()} VNĐ</p>
                        <p>{item.description}</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button onClick={() => handleEditClick(item)}>Sửa (PUT)</button>
                            <button onClick={() => handleDeleteClick(item.id)} style={{ color: 'red' }}>Xóa (DELETE)</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}