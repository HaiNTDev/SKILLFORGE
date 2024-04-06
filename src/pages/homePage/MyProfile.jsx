import React, { useEffect, useState } from "react";
import { Button, Card, Col, Flex, Row, Slider, Space, Typography } from "antd";
import {
  CalculatorOutlined,
  CaretRightOutlined,
  ClockCircleOutlined,
  CopyFilled,
  ReadOutlined,
  SignalFilled,
  TeamOutlined,
} from "@ant-design/icons";
import api from "../../config/axios";
import { Link } from "react-router-dom";
const cardStyle = {
  width: "100%",
};
const imgStyle = {
  display: "block",
  width: 273,
};
const MyProfile = () => {
  const [profile, setProfile] = useState([]);
  // const [listCourses, setListCourses] = useState([]);

  const getProfile = async () => {
    // check if token exists
    const res = await api.get(`/authentication/getAccountProfile`);
    setProfile(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getProfile();
  }, []);
  // const getCourses = async () => {
  //   try {
  //     const res = await api.get("/enroll");
  //     setListCourses(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   getCourses();
  // }, []);
  return (
    <>
      <section className="information mt-3">
        <div className="container">
          <h2>Trang cá nhân</h2>
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
              },
            }}
          >
            <Row gutter={24} justify="flex-start">
              <Col span={6}>
                <img
                  alt="avatar"
                  src={profile.account?.avatar}
                  style={imgStyle}
                />
              </Col>

              <Col
                span={18}
                style={{
                  padding: 32,
                }}
              >
                <Row gutter={24} justify={"space-around"}>
                  <Col span={12}>
                    <p>Tên: {profile.account?.fullName} </p>
                    <p>Email: {profile.account?.email} </p>
                    <p>Số điện thoại: {profile.account?.phone} </p>
                  </Col>
                  <Col span={12}>
                    <p>Vai trò: {profile.account?.role}</p>
                    <p>Tên tài khoản: {profile.account?.username}</p>
                    {/* <p>Mật khẩu:</p> */}
                  </Col>
                </Row>
                <Button type="primary" target="_blank">
                  Update
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
      <section className="my-enroll mt-3">
        <div className="container">
          <h3>Các khóa học đã tham gia</h3>
          {profile.enrolledCourseDetailResponse?.map((item) => {
            return (
              <div
                className="member border mt-3 w-75 "
                style={{ borderRadius: "20px" }}
              >
                <div className="row">
                  {" "}
                  <div className="pic col-4">
                    <img
                      style={{
                        width: "300px",
                        height: "200px",
                        borderRadius: "20px ",
                      }}
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
                    <div className="footer d-flex justify-content-between align-items-center px-3">
                      {/* <p className="fs-4 fw-bold text-dark">
                          {item.course.price}$
                        </p> */}
                      {/* <Slider defaultValue={30} /> */}
                      <p>
                        <strong>
                          {item.fineshed ? (
                            <div className="text-success">
                              Tình trạng: Hoàn thành
                            </div>
                          ) : (
                            <div className="text-danger">
                              Tình trạng: Chưa hoàn thành
                            </div>
                          )}
                        </strong>{" "}
                      </p>
                      <Link
                        className="text-decoration-none text-dark"
                        to={`/enrolled/${item.id}`}
                      >
                        Xem ngay <CaretRightOutlined />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MyProfile;
