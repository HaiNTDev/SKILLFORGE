import { Button, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import ViewFeedback from "../../components/feedbackModal/ViewFeedback";

const CourseManagement = () => {
  const [listCourse, setListCourse] = useState([]);
  const [viewFeedback, setViewFeedback] = useState(false);
  const [currentCourse, setCurrentCourse] = useState();

  const getCourse = async () => {
    try {
      const res = await api.get("/course");
      console.log(res.data);
      setListCourse(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  const data = listCourse.map((item) => {
    return {
      key: "1",
      category: item.category.name,
      id: item.id,
      name: item.name,
      description: item.description,
      pictureLink: item.pictureLink,
      fullName: item.createBy.fullName,
    };
  });

  const handleViewFeedback = (id) => {
    console.log(id);
    setCurrentCourse(id);
    setViewFeedback(true);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Mã khóa học",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hình ảnh",
      dataIndex: "pictureLink",
      key: "pictureLink",
      render: (pictureLink) => (
        <img src={pictureLink} alt="Hình ảnh" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Đánh giá",
      key: "id",
      dataIndex: "id",
      render: (value) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewFeedback(value)}>
            Xem đánh giá
          </Button>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Sửa</Button>
          <Button type="primary" danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        pagination={{
          pageSize: 3,
        }}
        columns={columns}
        dataSource={data}
      />

      <Modal
        centered
        open={viewFeedback}
        onOk={() => setViewFeedback(false)}
        onCancel={() => setViewFeedback(false)}
        width={700}
      >
        <ViewFeedback currentCourse={currentCourse} />
      </Modal>
    </>
  );
};

export default CourseManagement;
