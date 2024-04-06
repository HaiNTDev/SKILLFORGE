import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import "./chapter-table.css";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { uploadFile } from "../../utils/upload";
import { PlusOutlined } from "@ant-design/icons";

export const ChapterTable = ({ id }) => {
  const { TextArea } = Input;
  const [listChapter, setListChapter] = useState([]);
  const [form] = useForm();
  const urlParams = new URLSearchParams(window.location.search);
  const idURL = urlParams.get("id");
  console.log(urlParams);

  const columns = [
    {
      title: "Chapter name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button danger type="primary">
            Delete
          </Button>
          <Button type="primary">Edit</Button>
        </Space>
      ),
    },
  ];

  const getListChapter = async () => {
    const res = await api.get(`/chapters/courseId?id=${idURL}`);
    setListChapter(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getListChapter();
  }, []);

  const data = listChapter.map((items) => {
    return {
      key: items.id,
      name: items.name,
      id: items.id,
    };
  });

  const [isOpen, setIsOpen] = useState(false);
  const onSubmitChapter = async (values) => {
    values.course_id = Number(idURL);
    console.log(values);
    const res = await api.post("/chapter", values);
    form.resetFields();
    setIsOpen(false);
    toast.success("Thêm thành công");
    getListChapter();
  };
  return (
    <>
      <div style={{}}>
        <Button
          type="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          + Thêm chương mới
        </Button>
        <Table
          style={{
            width: "100%",
          }}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <Lesson chapter_id={record.id} />,
          }}
          dataSource={data}
        />
      </div>
      <Modal
        title="Thêm chương"
        centered
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsOpen(false)}
        width={500}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={onSubmitChapter}
        >
          <Form.Item
            name="name"
            label="Tên chương"
            rules={[
              {
                required: true,
                message: "Không được để trống ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Không được để trống ",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item initialValue={false} label="Học thử" name="freeChapter">
            <Switch
              onChange={(value) => {
                form.setFieldValue("freeChapter", value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Lesson = ({ chapter_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = useForm();
  const { TextArea } = Input;
  const [listLesson, setListLesson] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const getLesson = async () => {
    const res = await api.get(`/lessons/chapterId?id=${chapter_id}`);
    setListLesson(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getLesson();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Video Link",
      dataIndex: "videoLink",
      key: "videoLink",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quiz Link",
      dataIndex: "quiz",
      key: "quiz",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Button type="primary" danger>
              Delete
            </Button>
            <Button type="primary">Edit</Button>
          </Space>
        );
      },
    },
  ];

  const data = listLesson.map((lesson) => {
    return {
      key: lesson.id,
      name: lesson.name,
      videoLink: lesson.videoLink,
      quiz: lesson.quiz,
    };
  });

  const onSubmitLesson = async (values) => {
    setIsSubmitting(true);
    console.log(values);
    values.chapter_id = Number(chapter_id);
    if (values.videoLink) {
      const url = await uploadFile(values.videoLink.file.originFileObj);
      values.videoLink = url;
    }

    if (values.quiz) {
      const url = await uploadFile(values.quiz.file.originFileObj);
      values.quiz = url;
    }
    const res = await api.post("/lesson", values);
    form.resetFields();
    setIsOpen(false);
    toast.success("Thêm thành công");
    getLesson();
    setIsSubmitting(false);
  };

  return (
    <div
      className="lesson"
      style={{
        backgroundColor: "#ffface",
      }}
    >
      <Button
        className="lesson__button"
        type="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Lesson
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Modal
        title="Thêm chương"
        centered
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsOpen(false)}
        width={500}
        confirmLoading={isSubmitting}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={onSubmitLesson}
        >
          <Form.Item
            name="name"
            label="Tên bài học"
            rules={[
              {
                required: true,
                message: "Không được để trống ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Không được để trống ",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="videoLink"
            label="Video"
            rules={[
              {
                required: true,
                message: "Không được để trống ",
              },
            ]}
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="quiz"
            label="Bài tập trắc nghiệm "
            // rules={[
            //   {
            //     required: true,
            //     message: "Không được để trống ",
            //   },
            // ]}
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              maxCount={1}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
