import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/feature/accountSlice";
const Nav = () => {
  const account = useSelector((store) => store.account);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = account.hasOwnProperty("fullName");
  const items = [
    {
      label: (
        <Link to="/my-profile" style={{ textDecoration: "none" }}>
          My Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Button
          onClick={() => {
            dispatch(logout());
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      ),
      key: "1",
    },
  ];
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container d-flex justify-content-between">
          <Space align="end">
            <img
              src="/images/ReadOutlined.svg"
              alt=""
              style={{
                width: "50px",
                height: "50px",
              }}
            />
            <Link className="navbar-brand fs-3 fw-bold " to="/">
              Skill Forge
            </Link>
          </Space>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/course">
                  Các khóa học
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/enrolled">
                  Khóa học của tôi
                </Link>
              </li>
            </ul>
          </div>
          <Space>
            <div className="cart-items px-3">
              {" "}
              <Link className="nav-link" to="/cart">
                <Badge count={cart.cartItems.length}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                </Badge>
              </Link>
            </div>
            {isLoggedIn ? (
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ color: "#b75757" }}>
                    <Avatar src={account.avatar} />
                    Hi, {account.fullName}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <div className="d-flex">
                <Link className="nav-link" to="/login">
                  Login /
                </Link>
                <Link className="nav-link mx-1" to="/register">
                  Register
                </Link>
              </div>
            )}
          </Space>
        </div>
      </nav>
    </>
  );
};

export default Nav;
