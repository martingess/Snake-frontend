import React from "react";
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'

function Result(p) {
  const store = useSelector(state=>state)
  let result;
  if (store.results.data) {
    result = store.results.data.find(result => result.id === p.match.params.id.substr(1))
  }
  if(store.login.status != 'done' || !result){
    return <div>Access denied</div>
  }
  if (!result) {
    return <Spin size="large" />
  }
  return (
    <>
      <CarouselComponent />
      <DataComponent result={result} />
    </>
  )
}

//{name,
// analyzeType,
// id,
// date,
// imgsPaths,
// doctorName,
// note
// }

function DataComponent(p) {
  console.log(p)
  return (Object.keys(p.result).map(item => <div key={item}>{p.result[item]}</div>))
}

function CarouselComponent(p) {
  return (
    <Carousel effect="fade"
      style={{
        textAlign: 'center',
        height: '160px',
        lineHeight: '160px',
        background: '#364d79',
        overflow: 'hidden'
      }}>
      <div>1</div>
    </Carousel>
  );
}

export default Result 