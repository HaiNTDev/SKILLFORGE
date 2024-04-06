import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import { uploadFile } from "../../utils/upload";
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
// const columns = [
//   {
//     title: "ID",
//     dataIndex: "Id",
//     fixed: "left",
//   },
//   {
//     title: "Avatar",
//     dataIndex: "avatar",
//     render: (avatar) => (
//       <img
//         src={avatar}
//         alt="..."
//         style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//       />
//     ),
//   },
//   {
//     title: "Tài khoản",
//     dataIndex: "username",
//     fixed: "left",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//   },
//   {
//     title: "Tên",
//     dataIndex: "fullName",
//     fixed: "left",
//   },
//   {
//     title: "Số điện thoại",
//     dataIndex: "phone",
//   },
//   {
//     title: "Vai trò",
//     dataIndex: "role",
//   },
//   {
//     title: " Edit",
//     fixed: "right",
//     render: () => <Button type="primary">Sửa</Button>,
//   },
//   {
//     title: "Delete",
//     render: () => (
//       <Popconfirm
//         title="Are you sure you want to delete this account?"
//         onConfirm={() => handleDelete(record.id)}
//         onCancel={() => console.log("Cancel")}
//       >
//         <Button type="primary" danger>
//           Xóa
//         </Button>
//       </Popconfirm>
//     ),
//   },
// ];

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const [listAccount, setListAccount] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // const [deleteAccount, setDeleteAccount] = useState([]);
  const getAccount = async () => {
    const res = await api.get("authentication/getAllAccounts");
    const activeAccounts = res.data.filter(
      (account) => account.status === "ACTIVE"
    );
    setListAccount(activeAccounts);
    console.log(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getAccount();
  }, []);
  const data = listAccount?.map((item) => {
    return {
      key: "1",
      Id: item.id,
      email: item.email,
      avatar: item.avatar,
      username: item.username,
      fullName: item.fullName,
      phone: item.phone,
      role: item.role,
    };
  });
  const [form] = useForm();
  const createAccount = async (values) => {
    if (values.avatar) {
      const url = await uploadFile(values.avatar.file.originFileObj);
      values.avatar = url;
    }
    const res = await api.post("/authentication/register", values);
    form.resetFields();
    setOpen(false);
    toast.success("Đã thêm thành công");
    getAccount();
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
  const [fileList, setFileList] = useState([]);
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

  const edit = (record) => {
    setIsEdit(true);
    setEditingUser(record); // Lưu thông tin của người dùng cần chỉnh sửa vào state
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const res = await api.delete(`/authentication/deleteAccount?id=${id}`);
    getAccount();
    toast.success("Xoa thanh cong");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      fixed: "left",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          alt="..."
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "username",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tên",
      dataIndex: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },

    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, record) => (
        <Button type="primary" onClick={() => edit(record)}>
          Sửa
        </Button>
      ),
    },

    {
      title: "Delete",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có muốn xóa tài khoản này không?"
          onConfirm={() => handleDelete(record.Id)}
          onCancel={() => console.log("Cancel")}
        >
          <Button type="primary" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={() => setOpen(true)} className="mb-3">
          + Thêm
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
        bordered
      />
      <Modal
        title={isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        centered
        open={open}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          setIsEdit(false); // Reset trạng thái của modal khi đóng modal
        }}
        width={1000}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={createAccount}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Tài khoản"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Input />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              {" "}
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar"
                label="Ảnh đại diện"
                rules={[{ required: true, message: "Không được để trống" }]}
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
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                name="role"
                label="Giáo vụ"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "ADMIN",
                      label: "ADMIN",
                    },
                    {
                      value: "TEACHER",
                      label: "TEACHER",
                    },
                    {
                      value: "STUDENT",
                      label: "STUDENT",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UserManagement;
