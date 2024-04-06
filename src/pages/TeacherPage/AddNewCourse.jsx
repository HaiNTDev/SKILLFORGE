import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  theme,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { useForm } from "antd/es/form/Form";
import { uploadFile } from "../../utils/upload";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
// import { addChapter, addLesson } from "../../redux/feature/courseSlice";
import { PlusOutlined } from "@ant-design/icons";
import { ChapterTable } from "./ChapterTable";
const CourseInfoForm = ({
  form1,
  onSubmitForm1,
  setId,
  fileList,
  setFileList,
}) => {
  const [categories, setCategories] = useState([]);
  const fetchCategory = async (values) => {
    console.log("Received values:", values);
    try {
      const response = await api.get("/categoryAll");
      setCategories(response.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
  const handleCancel = () => setPreviewOpen(false);
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
  return (
    <>
      <Form
        form={form1}
        onFinish={onSubmitForm1}
        labelCol={{
          span: 24,
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              wrapperCol={12}
              name="courseID"
              label="Mã môn"
              rules={[
                {
                  required: true,
                  message: "Không được để trống ",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>{" "}
          </Col>
          <Col span={12}>
            <Form.Item
              wrapperCol={12}
              name="name"
              label="Tên môn"
              rules={[
                {
                  required: true,
                  message: "Không được để trống ",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>{" "}
          </Col>
          <Col span={12}>
            <Form.Item name="pictureLink" label="Hình ảnh">
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
          </Col>
          <Col span={12}>
            <Form.Item
              name="categoryId"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Không được để trống ",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn danh mục"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={categories.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              wrapperCol={12}
              name="price"
              label="Giá tiền"
              rules={[
                {
                  required: true,
                  message: "Không được để trống ",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

const AddNewCourse = ({
  current,
  onSubmitForm1,
  form1,
  setFileList,
  fileList,
}) => {
  const { token } = theme.useToken();
  const [form] = useForm();
  const [id, setId] = useState();
  const steps = [
    {
      title: "Tạo khóa học",
      content: (
        <CourseInfoForm
          setFileList={setFileList}
          fileList={fileList}
          setId={setId}
          form1={form1}
          onSubmitForm1={onSubmitForm1}
        />
      ),
    },
    {
      title: "Thêm chương và bài học",
      content: <ChapterTable id={id} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <Steps current={current} items={items} />
      <Form
        form={form}
        onFinish={(values) => {
          console.log(values);
        }}
        labelCol={{
          span: 24,
        }}
      >
        {steps.map((item, index) => {
          console.log(item);
          return (
            <div className={index != current ? "d-none" : ""}>
              {item.content}
            </div>
          );
        })}
      </Form>
      <div
        style={{
          marginTop: 24,
        }}
      ></div>
    </>
  );
};

export default AddNewCourse;
