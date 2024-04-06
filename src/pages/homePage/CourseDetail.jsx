import React, { useEffect, useState } from "react";
import {
  CalculatorOutlined,
  ClockCircleOutlined,
  GoldOutlined,
  ReadOutlined,
  TeamOutlined,
  SignalFilled,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tabs } from "antd";
import { TabComponent } from "../../components/tab-component";
import { LessonTab } from "../../components/tab-component/lesson";
import { OverviewTab } from "../../components/tab-component/overview";
import { LectureTab } from "../../components/tab-component/lecture";
import api from "../../config/axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/feature/cartSlice";
import formatCurrency from "../../utils/Currency";
import ViewFeedback from "../../components/feedbackModal/ViewFeedback";

const onChange = (key) => {
  console.log(key);
};

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState([]);
  const param = useParams();
  const dispatch = useDispatch();

  const getCourseDetail = async () => {
    try {
      const res = await api.get(`/getCourseById/${param.id}`);
      setCourseDetail(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error");
    }
  };
  useEffect(() => {
    getCourseDetail();
  }, []);

  const items = [
    {
      label: `Tổng quan`,
      key: 1,
      children: (
        <TabComponent>
          <OverviewTab data={courseDetail} />
        </TabComponent>
      ),
    },
    {
      label: `Giáo trình`,
      key: 2,
      children: (
        <TabComponent>
          <LessonTab data={courseDetail.chapters} />
        </TabComponent>
      ),
    },
    {
      label: `Giảng viên`,
      key: 3,
      children: (
        <TabComponent>
          <LectureTab data={courseDetail.createBy} />
        </TabComponent>
      ),
    },
    // {
    //   label: `FAQs`,
    //   key: 4,
    //   children: `Content of Tab Pane 4`,
    // },
    {
      label: `Đánh giá`,
      key: 4,
      children: <ViewFeedback data={courseDetail.id} />,
    },
  ];
  return (
    <>
      <section id="course-detail">
        <div className="content bg-black">
          <div className="container">
            <div className="align-items-center justify-item-center p-5">
              <div className="content-header d-flex text-white">
                <button className="btn btn-secondary ">
                  {courseDetail.category?.name}
                </button>
                <p className="text-center m-0 p-2">
                  by <strong>{courseDetail.createBy?.fullName}</strong>
                </p>
              </div>
              <h1 className="text-white">{courseDetail.name}</h1>

              <div className="content-footer text-white">
                <Space>
                  {/* <ClockCircleOutlined style={{ color: "#B75757" }} />
                  <p className="m-0 p-1">2 Weeks</p> */}
                  <TeamOutlined style={{ color: "#B75757" }} />
                  <p className="m-0 p-1">100 Người học</p>
                  <SignalFilled style={{ color: "#B75757" }} />
                  <p className="m-0 p-1">Tất cả các cấp độ</p>
                  <ReadOutlined style={{ color: "#B75757" }} />
                  <p className="m-0 p-1">20 Bài học</p>
                  <CalculatorOutlined style={{ color: "#B75757" }} />
                  <p className="m-0 p-1">10 Bài tập</p>
                </Space>
              </div>
            </div>
          </div>
        </div>

        <div className="container course-info">
          <Row gutter={24}>
            <Col span={18}>
              <Tabs
                // className="w-75"
                onChange={onChange}
                type="card"
                items={items}
              />
            </Col>

            <Col span={6}>
              <Card
                cover={
                  <img
                    src={courseDetail.pictureLink}
                    alt=""
                    style={{ width: "306px", height: "200px" }}
                  />
                }
              >
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "0",
                  }}
                >
                  <h4 style={{ color: "#B75757" }}>
                    {formatCurrency(courseDetail.price)}
                  </h4>
                  <Button
                    style={{ background: "#B75757" }}
                    type="primary"
                    onClick={() => {
                      dispatch(addToCart(courseDetail));
                    }}
                  >
                    Mua ngay
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
