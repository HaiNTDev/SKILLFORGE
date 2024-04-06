import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import {
  XOutlined,
  MailOutlined,
  CalendarOutlined,
  ReadOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const HomePage = () => {
  const [listCategories, setListCategories] = useState([]);
  const [listCourse, setListCourse] = useState([]);
  const getListCategories = async () => {
    const res = await api.get("/categoryAll");
    setListCategories(res.data);
  };
  useEffect(() => {
    getListCategories();
  }, []);
  const getListCourse = async () => {
    const res = await api.get("/courseDetailAll");
    setListCourse(res.data);
  };
  useEffect(() => {
    getListCourse();
  }, []);

  const chunkList = (list, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < list.length; i += chunkSize) {
      chunks.push(list.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const courseChunks = chunkList(listCategories, 4);
  return (
    <div className="home">
      <div
        id="carousel"
        style={{
          // backgroundColor: "#f5d3d3",
          height: "90vh",
          paddingTop: "50px",
          // background: " #4158D0",
          // paddingBottom: "20px",
          paddingLeft: "150px",
        }}
      >
        <div className="container ">
          <Row gutter={24} justify="space-evenly">
            <Col span={10}>
              <div
                className="carousel-left text-white"
                style={{ marginTop: "150px" }}
              >
                <h1 className="fw-bolder">
                  Chinh phục mọi thách thức với khóa học kỹ năng mềm tại đây!
                </h1>
                <br />
                <p className="fw-bold fs-5">
                  Bắt đầu hành trình thành công của bạn ngay!
                </p>
                <br />
                <br />
                <Button
                  type="primary"
                  style={{ background: "#FF9F67" }}
                  shape="round"
                  size="large"
                >
                  Tham gia ngay <ArrowRightOutlined />
                </Button>
              </div>
            </Col>
            <Col span={14}>
              {" "}
              <div className="carousel-right">
                <div>
                  {/* <img
                    src="https://firebasestorage.googleapis.com/v0/b/liquid-fort-412406.appspot.com/o/banner.png?alt=media&token=effdde10-ea62-4094-b8b8-3d34eb054cb4"
                    alt=""
                    style={{ width: "50vw", height: "70vh" }}
                  /> */}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="category mt-5">
        <div className="container">
          <div className="category-title">
            {" "}
            <Row justify="space-between" align="middle">
              <Col span={5} className="category-left">
                <h3>Danh Mục Khóa Học</h3>
                <p>Những khóa học phổ biến</p>
              </Col>
            </Row>
          </div>

          <div className="category-course">
            <Carousel autoplay autoplaySpeed={2500} dotPosition="bottom">
              {courseChunks.map((chunk, index) => (
                <div key={index}>
                  <Row justify="space-around">
                    {chunk.map((course) => (
                      <Col key={course.id} span={4}>
                        <Card
                          hoverable
                          cover={
                            <ReadOutlined
                              style={{ fontSize: "50px", padding: "20px" }}
                            />
                          }
                        >
                          <Card.Meta
                            title={course.name}
                            style={{ textAlign: "center" }}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div id="explore" className="mt-5">
        <div className="container">
          <div className="explore-tile">
            <Row justify="space-between" align="middle">
              <Col span={5} className="category-left">
                <h3>Các khóa học nổi bật</h3>
                <p>Những khóa học nhiều người quan tâm</p>
              </Col>
              <Col
                span={5}
                style={{ display: "flex", justifyContent: "center" }}
                className="category-right"
              >
                <Button style={{ background: "#FF9F67", color: "white" }}>
                  <Link className="text-decoration-none fw-bold" to="/course">
                    Tất cả khóa học
                  </Link>
                </Button>
              </Col>
            </Row>
          </div>
          <div className="card-course">
            <Row gutter={24}>
              {" "}
              {listCourse.slice(0, 8).map((items) => {
                return (
                  <Col span={6}>
                    <Card
                      hoverable
                      style={{
                        width: 300,
                        height: 450,
                        marginBottom: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                      cover={
                        <img
                          alt={items.name}
                          src={items.pictureLink}
                          style={{ width: "300px", height: "200px" }}
                        />
                      }
                      className="py-0"
                    >
                      <p>
                        Bởi <strong>{items.createBy.fullName}</strong>{" "}
                      </p>
                      <h5 className="fw-bold fs-3">{items.name}</h5>
                      <Space>
                        <p>2 Tuần</p>
                        <p>100 students</p>
                      </Space>
                      <hr />
                      <Row justify={"space-between"}>
                        <Col>
                          <p className="fs-5 fw-medium">
                            {items.price.toLocaleString()}đ
                          </p>
                        </Col>
                        <Col>
                          <Link
                            className="text-decoration-none text-dark fs-6 fw-bold"
                            to={`/course/${items.id}`}
                          >
                            Xem chi tiết
                          </Link>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>

      <div className="card-number container mt-5">
        <Row gutter={24} justify="space-around" align="middle">
          <Col span={4} style={{ display: "felx", justifyContent: "center" }}>
            <Card
              className="pt-1"
              hoverable
              style={{
                width: 200,
                height: 120,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3>
                {" "}
                <CountUp end={100} duration={1} />
              </h3>
              <h6>Người tham gia </h6>
            </Card>
          </Col>
          <Col span={4}>
            <Card
              className="pt-1"
              hoverable
              style={{
                width: 200,
                height: 120,
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <h3>
                {" "}
                <CountUp end={20} duration={1} delay={1} />
              </h3>
              <h6>Khóa học</h6>
            </Card>
          </Col>
          <Col span={4}>
            <Card
              className="pt-1"
              hoverable
              style={{
                width: 200,
                height: 120,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3>
                {" "}
                <CountUp end={10} duration={1} />
              </h3>
              <h6>Giảng viên </h6>
            </Card>
          </Col>
          <Col span={4}>
            <Card
              className="pt-1"
              hoverable
              style={{
                width: 200,
                height: 120,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3>
                {" "}
                <CountUp end={200} duration={1} />
              </h3>
              <h6>Đánh giá</h6>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="feedback mt-5">
        <h3>Phản hồi</h3>
        <p>Những học viên của Skill Forge đã nói gì</p>
      </div>
      <div className="card-feedback">
        <Card
          hoverable
          style={{
            width: 240,
            paddingTop: 10,
          }}
          cover={<MailOutlined style={{ padding: "10px" }} />}
        >
          <i>
            "Sau khi hoàn thành khóa học, tôi thực sự cảm thấy tự tin hơn trong
            giao tiếp và thuyết trình. Cách bài giảng được thiết kế giúp tôi dễ
            dàng tiếp thu và áp dụng vào thực tế. Rất đáng giá!"
          </i>
          <h5>Nguyen Van A</h5>
          <p>Khóa học kỹ giao tiếp</p>
        </Card>
        <Card
          hoverable
          style={{
            width: 240,
            paddingTop: 10,
          }}
          cover={<MailOutlined style={{ padding: "10px" }} />}
        >
          <i>
            "Website cung cấp một loạt các khóa học đa dạng, từ lãnh đạo đến làm
            việc nhóm, mỗi khóa học đều mang lại cái nhìn sâu sắc và giá trị
            thiết thực. Tôi đã áp dụng những kỹ năng học được vào công việc hàng
            ngày và thấy rõ sự khác biệt."
          </i>
          <h5>Le Van C</h5>
          <p>Kỹ năng làm việc nhóm</p>
        </Card>
        <Card
          hoverable
          style={{
            width: 240,
            paddingTop: 10,
          }}
          cover={<MailOutlined style={{ padding: "10px" }} />}
        >
          <i>
            "Tôi thật sự ấn tượng với chất lượng video và tài liệu học. Các bài
            học được trình bày một cách chuyên nghiệp và dễ hiểu, giúp tôi nắm
            bắt kiến thức một cách nhanh chóng."
          </i>
          <h5>Huynh Van B</h5>
          <p>Kỹ năng đàm phán</p>
        </Card>
        <Card
          hoverable
          style={{
            width: 240,
            paddingTop: 10,
          }}
          cover={<MailOutlined style={{ padding: "10px" }} />}
        >
          <i>
            "Có những điều tôi học được từ khóa học này rất bổ ích cho tôi, tôi
            phải cảm ơn những người tạo ra khóa học này vì đã giúp tôi cải thiện
            bản thân mình."
          </i>
          <h5>Tran Van A</h5>
          <p>Kỹ năng giao tiếp </p>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
