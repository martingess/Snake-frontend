import React, { useRef } from 'react';
import { Carousel, Col, Row, Icon } from 'antd';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import './Result.css'
import imgPlaceholder from '../imgs/image-placeholder.jpg'

function Result(p) {
  const store = useSelector((state) => state);
  console.log(store);
  let result;
  if (store.results.data) {
    result = store.results.data.find(
      (result) => result.id === p.match.params.id.substr(1),
    );
  }
  if (store.login.status != 'done' || !result) {
    return <div>Access denied</div>;
  }
  if (!result) {
    return <Spin size="large" />;
  }
  return (
    <>
      <Row type={'flex'} align={'middle'}>
        <Col span={10} offset={1}>
          <CarouselComponent result={result}/>
        </Col>
        <Col span={10} offset={1}>
          <DataComponent result={result} />
        </Col>
      </Row>
    </>
  );
}

function DataComponent(p) {
  console.log(p);
  return Object.keys(p.result).map((item) => (
    <div key={item}>{p.result[item]}</div>
  ));
}

function CarouselComponent(p) {
  const carousel = useRef(null);
  const haveImg = !!p.result.imgsPaths[0]
  const imgs = haveImg ? p.result.imgsPaths.map(img=> <img key={img} src={process.env.REACT_APP_BACKEND_PATH + img}/>) : <img src={imgPlaceholder}/>
  const next = () => carousel.current.next()
  const previous = () => carousel.current.prev()
  return (
    <div className="result__carousel">
    {imgs[1] ? <Icon type="left-circle" className="result__left-arrow" onClick={previous} /> : null}
    <Carousel ref={carousel}
      effect="fade"
      style={{
        textAlign: 'center',
        height: '50vh',
        lineHeight: '50vh',
        background: '#364d79',
        overflow: 'hidden',
      }}>
        {imgs}
      </Carousel>
      {imgs[1] ? <Icon type="right-circle" className="result__right-arrow" onClick={next} /> : null}
      </div>
  );
}

export default Result;
