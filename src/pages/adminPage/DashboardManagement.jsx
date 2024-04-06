import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Button, Calendar, Col, DatePicker, Row, Select } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../config/axios";
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [22500000, 0, 0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y", // Assign to the first y-axis
      },
      {
        label: "Người mua khóa học",
        data: [3, 0, 0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1", // Assign to the second y-axis
      },
    ],
  });

  const onChange = (date, dateString) => {
    if (date) {
      
      setSelectedMonth(date.month() + 1); 
      setSelectedYear(date.year());
    } else {
     
      setSelectedMonth(null);
      setSelectedYear(null);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value); 
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu và số người mua khóa học",
      },
    },
    scales: {
      y: {
      
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Doanh thu (VND)",
        },
        beginAtZero: true,
      },
      y1: {
       
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Số người mua khóa học",
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const startMonth = new Date().getMonth() - 5;
  const numMonths = 30;
  const handleSubmit = async () => {
    if (selectedMonth && selectedYear && selectedValue) {
      try {
        const requestData = {
          month: selectedMonth,
          year: selectedYear,
          interval: Number(selectedValue),
        };

        const response = await api.post("/chart", requestData);

        setChartData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Doanh thu",
              data: response.data.revenue,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Người mua khóa học",
              data: response.data.numOfStudents,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    } else {
      console.log("Please select all fields.");
    }
  };
  const labels = [];
  for (let i = startMonth; i <= startMonth + numMonths - 1; i++) {
    labels.push(
      new Date(2022, i - 1).toLocaleString("default", { month: "long" })
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: labels.map(
          () => Math.floor(Math.random() * (10 - -10 + 1)) + -10
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Người đăng kí",
        data: labels.map(
          () => Math.floor(Math.random() * (10 - -10 + 1)) + -10
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const DatePickerValue =
    selectedMonth && selectedYear
      ? dayjs(
          `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`,
          "YYYY-MM"
        )
      : null;

  return (
    <>
      <Row gutter={24}>
        <Col span={4}>
          <p>Chọn tháng </p>
          <DatePicker
            picker="month"
            onChange={onChange}
            value={DatePickerValue}
          />

          {/* {selectedMonth && <p>Month: {selectedMonth}</p>}
          {selectedYear && <p>Year: {selectedYear}</p>} */}
          <p>Chọn khoảng tháng </p>
          <Select
            showSearch
            placeholder="Chọn số tháng muốn thống kê"
            value={selectedValue}
            onChange={handleSelectChange}
            options={[
              { value: "3", label: "3 Tháng" },
              { value: "6", label: "6 Tháng" },
              { value: "9", label: "9 Tháng" },
            ]}
          />
          <Button type="primary" className="mx-2" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
        <Col span={20}>
          <Line options={options} data={chartData} />
        </Col>
      </Row>
    </>
  );
};

export default DashboardManagement;
