import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";
import AddNewCourse from "./AddNewCourse";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { uploadFile } from "../../utils/upload";
import { useNavigate } from "react-router-dom";
import ViewFeedback from "../../components/feedbackModal/ViewFeedback";

const Courses = () => {
  const [fileList, setFileList] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form1] = useForm();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [listCourse, setListCourse] = useState([]);
  const [viewFeedback, setViewFeedback] = useState(false);
  const [currentCourse, setCurrentCourse] = useState();

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
      dataIndex: "code",
      key: "code",
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
          <Button type="primary">Edit</Button>
        </Space>
      ),
    },
  ];

  const handleDone = () => {
    const newUrl = window.location.pathname;
    window.history.pushState({}, null, newUrl);
    setOpen(false);
    setCurrent(0);
    form1.resetFields();
    setFileList([]);
  };
  const getCourse = async () => {
    try {
      const res = await api.get("/getCourseByTeacherId");
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
      key: item.id,
      category: item.category.name,
      code: item.code,
      name: item.name,
      description: item.description,
      pictureLink: item.pictureLink,
      fullName: item.createBy.fullName,
      id: item.id,
    };
  });

  const onSubmitForm1 = async (values) => {
    console.log("Received values:", values);
    try {
      if (course == null) {
        if (values.pictureLink) {
          const url = await uploadFile(values.pictureLink.file.originFileObj);
          values.pictureLink = url;
          console.log(values.pictureLink);
        }
        const response = await api.post("/course", values);
        console.log(response.data.categoryId);
        setCourse(response.data);
        setCurrent(current + 1);
        console.log(response.data.id);
        const newUrl = `?id=${response.data.id}`;
        window.history.pushState({}, null, newUrl);
      } else {
        const response = await api.put(`/course/${course.id}`, values);

        setCourse(response.data);
        setCurrent(current + 1);
      }
      console.log(current);
      setCurrent(current + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const next = () => {
    console.log(current);
    if (current == 0) {
      form1.submit();
    } else if (current == 1) {
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const handleViewFeedback = (id) => {
    console.log(id);
    setCurrentCourse(id);
    setViewFeedback(true);
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        + Thêm
      </Button>
      <Table
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Tạo khóa học"
        centered
        open={open}
        onOk={() => next()}
        onCancel={() => {
          setOpen(false);
        }}
        width={1000}
        okText={current < 1 ? "Next" : "Done"}
        cancelText={""}
        footer={
          <>
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current < 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === 1 && (
              <Button type="primary" onClick={handleDone}>
                Done
              </Button>
            )}
          </>
        }
      >
        <AddNewCourse
          setFileList={setFileList}
          fileList={fileList}
          current={current}
          onSubmitForm1={onSubmitForm1}
          form1={form1}
        />
      </Modal>

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
export default Courses;
