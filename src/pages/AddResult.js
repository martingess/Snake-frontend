import React from "react";
import {Row, Form, Input, Col, DatePicker, Button, Upload, Icon} from "antd";

export default function AddResult() {
  return (
    <Row type={'flex'} justify={'center'}>
      <Col span={8}>
        <Form>
          <Input placeholder={'Название анализа'}/>
          <Input placeholder={'Имя врача'}/>
          <DatePicker/>
          <Input.TextArea rows={4}/>
          <Upload>
            <Button>
              <Icon type="upload" /> Файл результата
            </Button>
          </Upload>
          <Button>Добавить</Button>
        </Form>
      </Col>
    </Row>
  )
}