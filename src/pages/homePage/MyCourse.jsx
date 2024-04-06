// import {
//   CaretRightOutlined,
//   ClockCircleOutlined,
//   CopyFilled,
//   HomeOutlined,
//   SignalFilled,
//   TeamOutlined,
//   UserDeleteOutlined,
//   UserOutlined,
// } from "@ant-design/icons";

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
import { Button, Checkbox, Progress, Row, Slider, Table } from "antd";
import { Input, Space } from "antd";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import Feedback from "../../components/feedbackModal/Feedback";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const MyCourse = () => {
  const [listCourses, setListCourses] = useState([]);
  const getCourses = async () => {
    try {
      const res = await api.get("/enroll");
      setListCourses(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section id="view-courses">
      <div className="container mt-5">
        <div className="row">
          {" "}
          <div className="viewCourse col-9 ">
            <div className="d-flex justify-content-between">
              <h1>Khóa học của tôi</h1>
              <Space direction="vertical">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
                />
              </Space>
            </div>
            {listCourses.map((item) => {
              // const progress = await getProgress(item.id);
              // console.log(progress);
              return <Course item={item} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Course = ({ item }) => {
  const [progress, setProgress] = useState();
  const getProgress = async () => {
    const res = await api.get(`/progress/percent/courseId?courseId=${item.id}`);
    setProgress(res.data.toFixed(1));
    return res.data;
  };
  useEffect(() => {
    getProgress();
  }, []);
  return (
    <div className="member border mt-3  ">
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
            by <strong>{item.createBy?.username}</strong>
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
            <Progress
              style={{ width: "50%" }}
              percent={progress}
              status="active"
              strokeColor={{
                from: "#108ee9",
                to: "#87d068",
              }}
            />
            <Feedback id={item.id} />
            <Link
              className="text-decoration-none text-dark"
              to={`/enrolled/${item.id}`}
            >
              Learn Now <CaretRightOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
