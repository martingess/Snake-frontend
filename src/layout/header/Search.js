/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Input, Popover, List, Avatar, Button } from 'antd';
import './Search.css';
import { Link } from 'react-router-dom';

export default function Search({searchDoctor = false, handleAddDoctor, handleSearch, placeholder}) {
  const [searchResults, setSearchResult] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const visibleChange = (visible) => {
    setIsVisible(visible);
  };
  return (
    <div className="header__search">
      <Input.Search
        onSearch={handleSearch(setSearchResult, setIsVisible)}
        placeholder={placeholder}
      />
      <div className="header__search-results">
        {
          <Popover
            visible={isVisible}
            placement="bottom"
            onVisibleChange={visibleChange}
            content={
              <>
                <List
                  dataSource={searchResults}
                  itemLayout="horizontal"
                  renderItem={(item) => {
                    return (

                     !searchDoctor ? <List.Item>
                        <List.Item.Meta
                          title={
                            <Link
                              onClick={() => setIsVisible(false)}
                              to={`/showResult:${item.id}`}>
                              {item.name}
                            </Link>
                          }
                          avatar={
                            <Avatar
                              size="large"
                              shape="square"
                              src={
                                process.env.REACT_APP_BACKEND_PATH +
                                item.imgsPaths[0]
                              }
                            />
                          }
                        />
                      </List.Item> :
                      <List.Item>{item.name} <Button onClick={handleAddDoctor(item.id)}>Добавить</Button></List.Item>
                    );
                  }}
                />
              </>
            }
          />
        }
      </div>
    </div>
  );
}