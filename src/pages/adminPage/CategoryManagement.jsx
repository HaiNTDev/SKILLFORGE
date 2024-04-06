import { Button, Flex, Form, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

const columns = [
  {
    title: "ID",
    dataIndex: "Id",
    fixed: "left",
  },
  {
    title: "Code",
    dataIndex: "code",
    fixed: "left",
  },
  {
    title: "Tên",
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
  },

  {
    title: " Edit",
    fixed: "right",
    render: () => <Button type="primary">Sửa</Button>,
  },
  {
    title: "Delete",
    render: () => (
      <Popconfirm
        title="Bạn có muốn xóa danh mục này không?"
        onConfirm={() => handleDelete(record.id)}
        onCancel={() => console.log("Cancel")}
      >
        <Button type="primary" danger>
          Xóa
        </Button>
      </Popconfirm>
    ),
  },
];

const CategoryManagement = () => {
  const [open, setOpen] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const getCategory = async () => {
    const res = await api.get("/categoryAll");
    setListCategory(res.data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  const data = listCategory?.map((item) => {
    return {
      key: "1",
      Id: item.id,
      name: item.name,
      code: item.code,
      description: item.description,
    };
  });
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const createCategory = async (values) => {
    const res = await api.post("/category", values);
    form.resetFields();
    setOpen(false);
    toast.success("Đã thêm thành công");
    getCategory();
  };
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
        // scroll={{
        //   x: 1000,
        // }}
        pagination={{
          pageSize: 6,
        }}
        bordered
      />

      <Modal
        title="Thêm người dùng"
        centered
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={createCategory}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="Code của danh nục"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryManagement;
