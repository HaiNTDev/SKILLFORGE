import { Avatar, Button, Card, Col, Flex, Row, Space, Typography } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

const cardStyle = {
  width: 620,
};
const imgStyle = {
  display: "block",
  width: 200,
  height: 200,
};
export const LectureTab = ({ data }) => {
  return (
    <div>
      <Card
        className="w-100"
        hoverable
        style={cardStyle}
        styles={{
          body: {
            padding: 0,
            overflow: "hidden",
            with: 100,
          },
        }}
      >
        <Flex justify="flex-start">
          <img alt="avatar" src={data.avatar} style={imgStyle} />
          <Flex
            vertical
            align="flex-start"
            // justify="space-between"
            style={{
              padding: 32,
            }}
          >
            {/* <Typography.Title level={3}>
              antd is an enterprise-class UI design language and React UI
              library.
            </Typography.Title> */}
            <h5>Tên: {data.fullName}</h5>
            <h5>Số điện thoại liên hệ: {data.phone}</h5>
            <h5>Email: {data.email}</h5>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
