import React, { useEffect, useState } from "react";
import {
  CalculatorOutlined,
  ClockCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import {
  AudioOutlined,
  UserDeleteOutlined,
  SignalFilled,
  CopyFilled,
  ArrowRightOutlined,
  CaretRightOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Table } from "antd";
import { Input, Space } from "antd";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import formatCurrency from "../../utils/Currency";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const ViewCourses = () => {
  const [listCourses, setListCourses] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCourses = async (search = "") => {
    try {
      const endpoint = search
        ? `/getCourseByContainName/${search}`
        : "/courseDetailAll";
      const res = await api.get(endpoint);
      setListCourses(res.data.length ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      getCourses();
    } else {
      const delayDebounceFn = setTimeout(() => {
        getCourses(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const getCategories = async () => {
    try {
      const res = await api.get("/categoryAll");
      setListCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <section id="view-courses">
      <div className="container mt-5 ">
        <div className="row">
          {" "}
          <div className="viewCourse col-9 ">
            <div className="d-flex justify-content-between">
              <h1>Các khóa học</h1>
              <Space direction="vertical">
                <Search
                  placeholder="Nhập từ khóa vào đây"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: 400 }}
                />
              </Space>
            </div>
            {listCourses.map((item) => {
              return (
                <div className="member border mt-3 bg-light  ">
                  <div className="row">
                    {" "}
                    <div className="pic col-4">
                      <img
                        style={{ width: "300px", height: "200px" }}
                        src={item.pictureLink}
                        className="img-fluid"
                        alt={item.name}
                      />
                    </div>
                    <div className="member-info col-8 pt-1 ">
                      <p>
                        Bởi <strong>{item.createBy.fullName} </strong>
                      </p>
                      <h3 className="mb-4">{item.name}</h3>

                      <Space>
                        <TeamOutlined style={{ color: "#B75757" }} />
                        <p className="m-0 p-1">100 Người học</p>
                        <SignalFilled style={{ color: "#B75757" }} />
                        <p className="m-0 p-1">Tất cả các cấp độ</p>
                        <ReadOutlined style={{ color: "#B75757" }} />
                        <p className="m-0 p-1">20 Bài học</p>
                        <CalculatorOutlined style={{ color: "#B75757" }} />
                        <p className="m-0 p-1">10 Bài tập</p>
                      </Space>
                      <hr className="m-2" />
                      <div className="footer d-flex justify-content-between align-items-center">
                        <p className="fs-4 fw-bold text-dark">
                          {formatCurrency(item.price)}
                        </p>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/course/${item.id}`}
                        >
                          Xem chi tiết <CaretRightOutlined />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sort col-3">
            <h3>Danh mục khóa học </h3>
            {listCategories.map((cat) => (
              <div key={cat.id}>
                <Checkbox
                  value={cat.id}
                  // onChange={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </Checkbox>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewCourses;
