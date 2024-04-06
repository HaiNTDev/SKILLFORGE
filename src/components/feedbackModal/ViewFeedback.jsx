import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams } from "react-router-dom";
import { Card, Col, Pagination, Rate, Row, Space } from "antd";
import "./ViewFeedback.css";
import { Avatar, List } from "antd";

const ViewFeedback = ({ currentCourse }) => {
  const [feedback, setFeedback] = useState([]);
  const param = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 3;

  const getFeedbackByCourse = async () => {
    const res = await api.get(
      `/feedback/courseId?id=${currentCourse ? currentCourse : param.id}`
    );
    setFeedback(res.data);

    console.log(res.data);
  };
  useEffect(() => {
    getFeedbackByCourse();
  }, [currentCourse, param.id]);
  const lastFeedbackIndex = currentPage * feedbackPerPage;
  const firstFeedbackIndex = lastFeedbackIndex - feedbackPerPage;
  const currentFeedback = feedback.slice(firstFeedbackIndex, lastFeedbackIndex);

  const totalStars = feedback.reduce((sum, { star }) => sum + star, 0);
  const avgStarRating = Math.round((totalStars / feedback.length) * 2) / 2;

  return (
    <div className="container ">
      <div className="feedback-title">
        <h4>Đánh giá của học viên</h4>
      </div>
      <div className="feedback-total">
        <Space>
          <div className="rating-badge mx-5">
            <h1>{avgStarRating}</h1>
          </div>
          <div className="content">
            <Rate disabled allowHalf value={avgStarRating} />
            <p>Dựa trên phản hồi của {feedback.length} người đã đăng kí</p>
          </div>
        </Space>
      </div>
      <div className="feedback-detail">
        {currentFeedback.map((fe) => {
          return (
            <Card className="my-2">
              <Space>
                <Avatar
                  size={64}
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${1}`}
                />
                <div className="user-feedback-content">
                  <h5> {fe.account?.fullName} </h5>
                  <p>{new Date(fe.createdDate).toLocaleDateString()}</p>
                  <Rate allowHalf disabled defaultValue={fe.star} />
                  <p className="my-2">
                    "<i>{fe.content}</i>"
                  </p>
                </div>
              </Space>
            </Card>
          );
        })}
      </div>
      <Pagination
        defaultCurrent={1}
        total={feedback.length}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        pageSize={feedbackPerPage}
        className="my-2 text-center "
      />{" "}
    </div>
  );
};

export default ViewFeedback;
