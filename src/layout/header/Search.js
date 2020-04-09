import React, { useState } from 'react';
import { Input, Popover, List, Avatar } from 'antd';
import api from '../../helpers/api';
import './Search.css';
import { Link } from 'react-router-dom';
export default function Search() {
  const [searchResults, setSearchResult] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const handleSearch = async (value) => {
    const searchResultFetch = await api.search(value);
    if (searchResultFetch.data.search) {
      setSearchResult(searchResultFetch.data.search);
    } else setSearchResult([]);
    setIsVisible(true);
  };
  const visibleChange = (visible) => {
    setIsVisible(visible);
  };
  return (
    <div className="header__search">
      <Input.Search
        onSearch={handleSearch}
        placeholder={'Название результата'}
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
                      <List.Item>
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
                      </List.Item>
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

//searchResult.map((result) => (
// <div key={result.id}>{result.id}</div>
// ))
