import { Card, Col, Progress, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import formatCurrency from "../../utils/Currency";

import dayjs from "dayjs";

const columns = [
  {
    title: "Mã giao dịch",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Người gửi",
    dataIndex: "nguoiGui",
    key: "nguoiGui",
  },
  {
    title: "Nội dung giao dịch",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ngày giao dịch",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Người nhận",
    dataIndex: "nguoiNhan",
    key: "nguoiNhan",
  },
  {
    title: "Số tiền",
    dataIndex: "money",
    key: "money",
  },
  {
    title: "Loại giao dịch",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Tình trạng",
    key: "status",
    render: () => (
      <Space size="middle">
        <a>Thành công </a>
      </Space>
    ),
  },
];

const Wallet = () => {
  const [wallet, setWallet] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const getWalletApi = async () => {
    try {
      const res = await api.get("/wallet");

      setWallet(res.data);
    } catch (error) {
      console.error("Error fetching wallet data: ", error);
    }
  };
  useEffect(() => {
    getWalletApi();
  }, []);

  const getTransactionApi = async () => {
    const res = await api.get("/wallet/transactions");
    setTransaction(res.data);
  };

  useEffect(() => {
    getTransactionApi();
  }, []);
  const data = transaction.map((item) => {
    return {
      id: `GD${item.id}`,
      nguoiGui: item.from.account.fullName,
      name: `Tiền khóa học ${item.course.name}`,
      date: dayjs(item.date).format("DD-MM-YYYY"),
      nguoiNhan: item.to.account.fullName,
      money: formatCurrency(item.money),
      tags: ["Nhận tiền"],
    };
  });

  return (
    <>
      <div className="wallet-title">
        <h3>Ví</h3>
      </div>
      <div className="wallet-content mb-3 ">
        <Row gutter={24}>
          <Col span={12}>
            <Card>
              <div className="p-3" style={{ background: "#f5f8fa" }}>
                {" "}
                <h5>Số dư</h5>
                <h3>{formatCurrency(wallet.balance)}</h3>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <h5>Tiền rút</h5>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="wallet-table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default Wallet;
