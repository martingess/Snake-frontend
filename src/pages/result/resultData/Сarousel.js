import React, {useRef} from 'react';
import imgPlaceholder from "../../../imgs/image-placeholder.jpg";
import {Icon, Carousel} from 'antd';

function CarouselComponent(p) {
  const carousel = useRef(null);
  const haveImg = !!p.result.imgsPaths[0];
  const imgs = haveImg ? (
    p.result.imgsPaths.map((img) => (
      <img key={img} alt="resultImg" src={process.env.REACT_APP_BACKEND_PATH + img} />
    ))
  ) : (
    <img alt="placeholder" src={imgPlaceholder} />
  );
  const next = () => carousel.current.next();
  const previous = () => carousel.current.prev();
  return (
    <div className="result__carousel">
      {imgs[1] ? (
        <Icon
          type="left-circle"
          className="result__left-arrow"
          onClick={previous}
        />
      ) : null}
      <Carousel
        ref={carousel}
        effect="fade"
        style={{
          textAlign: "center",
          height: "50vh",
          lineHeight: "50vh",
          background: "#364d79",
          overflow: "hidden",
        }}
      >
        {imgs}
      </Carousel>
      {imgs[1] ? (
        <Icon
          type="right-circle"
          className="result__right-arrow"
          onClick={next}
        />
      ) : null}
    </div>
  );
}

export default CarouselComponent