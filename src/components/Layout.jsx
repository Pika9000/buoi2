import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <Link className="logo" to="/">Mộc<span>Market</span></Link>
          <nav aria-label="Điều hướng chính">
            <NavLink to="/" end>Trang chủ</NavLink>
            <NavLink to="/products">Sản phẩm</NavLink>
            <NavLink to="/about-us">Giới thiệu</NavLink>
            <NavLink to="/contact">Liên hệ</NavLink>
          </nav>
          <Link className="cart" to="/products">Giỏ hàng</Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="container footer-content">
          <Link className="logo" to="/">Mộc<span>Market</span></Link>
          <p>© 2026 Mộc Market · Tươi ngon mỗi ngày</p>
        </div>
      </footer>
    </>
  )
}
