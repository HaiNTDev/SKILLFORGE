import { Button, Result } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ role }) => {
  const account = useSelector((store) => store.account);
  if (account.role === role) return <Outlet />;
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page !!!"
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default PrivateRoute;
