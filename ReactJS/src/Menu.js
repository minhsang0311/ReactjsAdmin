
import React from "react";
import { Link } from "react-router-dom";
class Menu extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="logo">
          <img src="./img/logo_main.png" alt="" />
        </div>
        <ul className="menu">
          <li>
            <a href="/#">
              <span>Trang chủ</span>
            </a>
          </li>
          <li>
            <Link to={"/admin/sp"}>
              <span>Quản lí sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/spthem"}>
              <span>Thêm sản phẩm</span>
            </Link>
          </li>
          <li>
            <a href="/#">
              <span>Quản lí khách hàng</span>
            </a>
          </li>
          <li>
            <a href="/#">
              <span>Quản lí bình luận</span>
            </a>
          </li>
          <li>
            <a href="/#">
              <span>Thống kê</span>
            </a>
          </li>
          <li className="login">
          <a href="/#">
              <span>Đăng nhập</span>
            </a>
          </li>
          <li className="logout">
            <a href="/#" >
              <span>Thoát</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
export default Menu;