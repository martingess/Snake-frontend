import React from "react";
import {
  Row,
  Form,
  Input,
  Col,
  DatePicker,
  Button,
  Upload,
  Icon,
  Spin,
} from "antd";
import api from "../helpers/api";
import notification from "../helpers/notification";
import { useSelector, connect } from "react-redux";

class AddResult extends React.Component {
  state = {
    imgPaths: [],
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      (async () => {
        const imgPaths = this.state.imgPaths;
        this.setState({ fetching: true });
        try {
          await api.createResult(values, imgPaths);
          //TODO: добавить валидацию на случай ошибки
          notification.resultAddedSuccessfuly();
          this.setState({ fetching: false });
        } catch (e) {
          notification.resultAddingFailed();
        }
      })();
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { bearer } = this.props;

    return (
      <Row type={"flex"} justify={"center"}>
        <Col xs={24} md={12} lg={8}>
          {this.state.fetching ? (
            <Spin size="large" />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста, введите название анализа",
                    },
                    {min: 2,
                    max: 20,
                    message: "Название должно содержать от 2 до 24 символов"}
                  ],
                })(<Input name="name" placeholder={"Название анализа"} />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("doctorName")(
                  <Input name="doctorName" placeholder={"Имя врача"} />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("date")(<DatePicker name="date" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("note")(
                  <Input.TextArea name="note" rows={4} />
                )}
              </Form.Item>
              <Upload
                headers={{ Authorization: "Bearer " + bearer }}
                action={`${process.env.REACT_APP_BACKEND_PATH}/api/v1/result/img`}
                onChange={(e) => {
                  console.log(e);
                  if (e.file.status === "done") {
                    const imgPaths = e.file.response.data[0].substr(
                      "public".length
                    );
                    this.setState({
                      imgPaths: [...this.state.imgPaths, imgPaths],
                    }, ()=> console.log(this.state));
                  }
                  if (e.file.status === "removed") {
                    this.setState(
                      (state) => {
                        return {
                          imgPaths: [
                            ...state.imgPaths.filter(
                              (item) =>
                                item !==
                                e.file.response.data[0].substr("public".length)
                            ),
                          ],
                        };
                      },
                      () => console.log(this.state)
                    );
                  }
                }}
              >
                <Button>
                  <Icon type="upload" /> Файлы результатов
                </Button>
              </Upload>
              <Button htmlType="submit">Добавить</Button>
            </Form>
          )}
        </Col>
      </Row>
    );
  }
}

const WrappedResultCreate = Form.create({ name: "resultCreate" })(AddResult);
const ConnectedResultCreate = connect((state) => ({
  bearer: state.login.data.jwt,
}))(WrappedResultCreate);
export default ConnectedResultCreate;
