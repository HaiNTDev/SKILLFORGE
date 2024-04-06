import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, Radio, Row, Space } from "antd";
import api from "../../config/axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const Quiz = ({ id }) => {
  const [value, setValue] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizId, setQuizId] = useState();
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [isDo, setIsDo] = useState(false);

  const getQuiz = async () => {
    const res = await api.get(`/quiz/lessonId?id=${id}`);
    setQuiz(res.data.quiz.quizQuestion);
    setQuizId(res.data.quiz.id);
    setIsDo(res.data.isDo);
    setValue(res.data.answerUser);
    console.log(res.data);
    setIncorrectAnswers(res.data.falseAnswerIds);
    setCorrectAnswer(res.data.trueAnswerIds);
  };
  useEffect(() => {
    getQuiz();
  }, [id]);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeOption = (index, value) => {
    console.log(index, value);
    if (!incorrectAnswers.includes(value)) {
      answers[index] = value;
      setAnswers([...answers]);
      setValue([...answers]);
    }
  };

  const submitAnswer = async () => {
    // console.log(quiz);
    const res = await api.post("/quizResult", {
      quizId: Number(quizId),
      answerIds: answers,
    });
    getQuiz();
    // console.log(res.data);
    Modal.success({
      title: `Chúc mừng ${res.data.quizResult.doBy.fullName} đã hoàn thành!`,
      content: (
        <div>
          <h5>Bạn đạt được {res.data.quizResult.score} điểm</h5>
          <p>Số câu đúng : {res.data.quizResult.trueAnswerNumber} </p>
          <p>Số câu sai: {res.data.quizResult.falseAnswerNumber} </p>
        </div>
      ),
    });
    setIncorrectAnswers(res.data.falseAnswerIds);
    setCorrectAnswer(res.data.trueAnswerIds);
  };

  return (
    <div className="container">
      <Space direction="vertical" style={{ width: "100%" }}>
        {quiz.map((item, index) => {
          // console.log(item);
          // console.log(quiz);
          return (
            <React.Fragment key={index}>
              <Row gutter={24}>
                <Col span={22} style={{ paddingLeft: "200px" }}>
                  {" "}
                  <h3>
                    {item.questionNumber}: {item.questionContent}
                  </h3>
                  <Radio.Group
                    value={value[index]}
                    // onChange={(e) => {
                    //   onChangeOption(index, e.target.value);
                    // }}
                    disabled={isDo}
                  >
                    <Space direction="vertical">
                      {item.quizAnswers?.map((option, i) => (
                        <Radio
                          name={item.question}
                          key={i}
                          value={option.id}
                          style={{ position: "relative" }}
                          onClick={(e) => {
                            onChangeOption(index, option.id);
                          }}
                        >
                          {option.answerContent}
                          {incorrectAnswers.includes(option.id) && (
                            <CloseOutlined
                              className="bg-danger p-1 mx-3 text-white "
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                          {correctAnswer.includes(option.id) && (
                            <CheckOutlined
                              className="bg-success p-1 mx-3 text-white "
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Col>
                <Col span={2}>
                  <Button style={{ borderRadius: "20px " }}> 1 điểm</Button>
                </Col>
              </Row>
            </React.Fragment>
          );
        })}
        <Button
          type="primary"
          onClick={() => {
            console.log(answers);
            submitAnswer();
          }}
        >
          Submit
        </Button>
      </Space>
    </div>
  );
};

export default Quiz;
