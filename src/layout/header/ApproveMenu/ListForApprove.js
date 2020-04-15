import React from 'react';
import { List, Button } from 'antd';

export default function ListForApprove({
  approveData,
  approveResult,
  rejectResult,
}) {
  return (
    <List
      dataSource={approveData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <p>{`Пациент ${item.user.name} хочет поделится ${item.name}`}</p>
            }
            description={
              <div>
                <Button size="small" onClick={approveResult(item.id)}>
                  Подтвердить
                </Button>
                <Button size="small" onClick={rejectResult(item.id)}>
                  Отклонить
                </Button>
              </div>
            }
          />
        </List.Item>
      )}></List>
  );
}
