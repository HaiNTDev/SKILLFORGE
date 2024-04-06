import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { handleDone } from "../../redux/feature/cartSlice";
const CheckoutSuccess = () => {
  const [order, setOrder] = useState();
  const dispatch = useDispatch();
  const fetchOrder = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("vnp_TxnRef");
    const response = await api.get(`/update-order?orderId=${orderId}`);
    console.log(response);
    setOrder(response.data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle={`Order number: ${order?.id} Cloud server configuration takes 1-5 minutes, please wait.`}
      extra={[
        <Link
          to={"/"}
          key={1}
          onClick={() => {
            dispatch(handleDone());
          }}
        >
          Back to home
        </Link>,
      ]}
    />
  );
};
export default CheckoutSuccess;
