import { Button, Col, Collapse, Flex, Modal, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import {
  FileOutlined,
  LockOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

export const LessonTab = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const onChange = (key) => {
    console.log(key);
  };

  const handlePreview = (videoLink) => {
    setSelectedVideo(videoLink);
    setOpen(true);
  };

  return (
    <>
      <Space direction="vertical" className="w-100">
        {data?.map((items) => {
          console.log(items.lesson);
          return (
            <Collapse
              key={items.id}
              collapsible="header"
              // defaultActiveKey={["1"]}
            >
              <Collapse.Panel header={items?.name} key="1" className="fw-bold">
                {items.lesson.map((lesson) => (
                  <Row
                    key={lesson.id}
                    className="mb-3"
                    style={{ width: "100%" }}
                  >
                    <Col
                      span={20}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <PlayCircleOutlined />
                      <p style={{ margin: 0 }}>{lesson.name}</p>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        gap: 10,
                      }}
                    >
                      {items.freeChapter ? (
                        <>
                          <Button
                            type="primary"
                            onClick={() => handlePreview(lesson.videoLink)}
                          >
                            Xem thử
                          </Button>
                          {/* Assuming 12:30 is a placeholder for video duration */}
                          <p style={{ margin: 0 }}>12:30</p>
                        </>
                      ) : (
                        <LockOutlined />
                      )}
                    </Col>
                  </Row>
                ))}
              </Collapse.Panel>
            </Collapse>
          );
        })}
      </Space>
      <Modal
        title="Xem thử"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key="submit" type="primary" onClick={() => setOpen(false)}>
            OK
          </Button>,
        ]}
      >
        <video
          controls
          src={selectedVideo}
          style={{ width: "100%", height: "500px" }}
        ></video>
      </Modal>
    </>
  );
};
