import { Button, Col, Collapse, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Quiz from "../../components/quiz/Quiz";
import { PlayCircleOutlined, SolutionOutlined } from "@ant-design/icons";

const MyCourseDetail = () => {
  const params = useParams();
  const onChange = (key) => {
    console.log(key);
  };
  const [myCourseDetail, setMyCourseDetail] = useState(null);
  const [videoURL, setVideoUrl] = useState();
  const [items, setItems] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const idURL = urlParams.get("lessonId");
  const quiz = urlParams.get("quiz");
  const doneVideo = async () => {
    console.log("video done");
    if (idURL) {
      try {
        const response = await api.post("/progress", {
          lessonId: Number(idURL),
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error sending lesson ID to API:", error);
      }
    }
  };

  const getCourseDetail = async () => {
    const res = await api.get(`/enroll/${params.id}`);
    setMyCourseDetail(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getCourseDetail();
  }, []);

  // const [lessons, setLessons] = useState([]);

  useEffect(() => {
    console.log(myCourseDetail?.lessons[0].videoLink);
    if (myCourseDetail) {
      setItems(
        myCourseDetail.chapters.map((item) => {
          return {
            key: item.id,
            label: item.name,
            children: (
              <ul>
                {myCourseDetail?.lessons
                  .filter((lesson) => lesson.chapter_id === item.id)
                  .map((lesson) => {
                    return (
                      <>
                        <Link to={`?lessonId=${lesson.id}`}>
                          <Space>
                            <PlayCircleOutlined />
                            <li
                              className="list-unstyled text-dark fw-bold"
                              style={{ textDecoration: "none" }}
                            >
                              {lesson.name}
                            </li>
                          </Space>
                        </Link>
                        <br />
                        {lesson.quiz !== null && (
                          <Link to={`?lessonId=${lesson.id}&quiz=true`}>
                            <Space>
                              <SolutionOutlined />{" "}
                              <li className="list-unstyled text-dark fw-bold">
                                Quiz - {lesson.name}
                              </li>
                            </Space>
                          </Link>
                        )}
                      </>
                    );
                  })}
              </ul>
            ),
          };
        })
      );
    }
  }, [myCourseDetail]);

  useEffect(() => {
    console.log(idURL);
    if (idURL) {
      setVideoUrl(
        myCourseDetail?.lessons.filter((item) => item.id === Number(idURL))[0]
          .videoLink
      );
    } else {
      setVideoUrl(myCourseDetail?.lessons[0].videoLink);
    }
  }, [idURL, myCourseDetail]);



  return (
    <>
      <section id="my-course-detail ">
        <div className="my-course-content">
          <Row gutter={24}>
            <Col span={18} style={{ padding: "0" }}>
              {quiz ? (
                <Quiz id={idURL} />
              ) : (
                <video
                  onEnded={doneVideo}
                  width="100%"
                  height="100%"
                  controls
                  src={videoURL}
                  style={{ borderRadius: "10px" }}
                ></video>
              )}
            </Col>
            <Col span={6} style={{ padding: "0" }}>
              <Collapse
                items={items}
                defaultActiveKey={["1"]}
                onChange={onChange}
                style={{ padding: "0" }}
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default MyCourseDetail;
