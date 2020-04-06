import React from "react";
import { Row, Form, Input, Col, DatePicker, Button, Upload, Icon, Spin } from "antd";
import api from "../helpers/api";
import notification from "../helpers/notification";

class AddResult extends React.Component {
  state = {
    imgPaths: []
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      (async ()=>{
      const imgPaths = this.state.imgPaths
      this.setState({fetching: true})
      try{
        const result = await api.createResult(values, imgPaths)
        //TODO: добавить валидацию на случай ошибки
        notification.resultAddedSuccessfuly()
        this.setState({fetching: false})
      } catch (e){
        notification.resultAddingFailed();
      }
      })()
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Row type={'flex'} justify={'center'}>
        <Col span={8}>
          {this.state.fetching ? <Spin size="large"/> : <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please, input analyze name' }],
              })(
                <Input name="name" placeholder={'Название анализа'} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('doctorName')( 
              <Input name="doctorName" placeholder={'Имя врача'} />
              )
            }
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('date')( 
              <DatePicker name="date" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('note')( 
              <Input.TextArea name="note" rows={4} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('analyzeType')( 
              <Input name="analyzeType" placeholder={'Тип анализов'} />
              )
            }
            </Form.Item>
              <Upload 
              headers={{'Authorization': "Bearer " + localStorage.authToken}}
              action={'http://localhost:3022/api/v1/result/img'}
              onChange={(e)=>{
                if(e.file.status === 'done'){
                  const imgPaths = e.file.response.data[0].substr('public'.length)
                  this.setState({imgPaths: [...this.state.imgPaths, imgPaths]})
                  console.log(this.state)
                }
              }}>
                <Button>
                  <Icon type="upload" /> Файлы результатов
                </Button>
              </Upload>
            <Button htmlType="submit">Добавить</Button>
          </Form>}
        </Col>
      </Row>
    )
  }
}

const WrappedResultCreate = Form.create({ name: 'resultCreate' })(AddResult);
export default WrappedResultCreate