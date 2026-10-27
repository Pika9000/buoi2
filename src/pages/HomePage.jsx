import { Link } from 'react-router-dom'
import ProductsPage from './ProductsPage.jsx'

export default function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-content">
          <div>
            <p className="eyebrow">TƯƠI NGON MỖI NGÀY</p>
            <h1>Thực phẩm tươi,<br />bữa ăn thêm vui.</h1>
            <p className="hero-text">Rau củ, trái cây và thực phẩm thiết yếu cho gia đình bạn. Chọn món yêu thích, Mộc giao tận nhà.</p>
            <Link className="button" to="/products">Xem sản phẩm</Link>
          </div>
          <div className="hero-picture" role="img" aria-label="Rau củ tươi ngon">
            <span>🥬</span><span>🍅</span><span>🥕</span><span>🍊</span>
          </div>
        </div>
      </section>
      <ProductsPage />
    </>
  )
}
