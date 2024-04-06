import { Form, Input } from "antd";
import React from "react";

const CourseForm = () => {
  return (
    <Form>
      <Form.Item name={"name"} label={"Name"}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
