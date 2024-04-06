import React, { useState } from "react";
import { Button, Form, Modal, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

const Feedback = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [rate, setRate] = useState([]);
  const [form] = useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const sendFeedback = async (values) => {
    const res = await api.post("/feedback", {
      ...values,
      courseId: id,
    });
    form.resetFields();
    setIsModalOpen(false);
    toast.success("Đã đánh giá thành công");
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Đánh giá
      </Button>
      <Modal
        title="Để lại đánh giá của bạn ở đây nhé "
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} onFinish={sendFeedback}>
          <Form.Item name="star" label="" initialValue={2.5}>
            <Rate allowHalf />
          </Form.Item>
          <Form.Item name="content" label="">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Feedback;
