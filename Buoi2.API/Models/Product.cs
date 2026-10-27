namespace Buoi2.API.Models
{
    public class Product
    {
        public int Id { get; set; } // Khóa chính tự tăng
        public string Name { get; set; } = string.Empty; // Tên sản phẩm
        public decimal Price { get; set; } // Giá sản phẩm
        public string Description { get; set; } = string.Empty; // Mô tả
        public string ImageUrl { get; set; } = string.Empty; // Link ảnh hiển thị trên Storefront
    }
}