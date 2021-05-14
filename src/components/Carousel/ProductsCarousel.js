import React, { forwardRef } from 'react';
import Carousel from 'infinite-react-carousel'
import '@brainhubeu/react-carousel/lib/style.css';

const ImageCarousel = forwardRef(({
    images = [],
}) => {
    const settings = {
        centerMode: true,
        arrows: false,
        slidesPerRow: 5
    };

    const style = {
        control: base => ({
            ...base,
            border: 0,
            // This line disable the blue border
            boxShadow: "none",
            outline: 'none',
            dots: true,
            slidesPerRow: 5
        })
    };

    return (
        <Carousel  {...settings}>
            {images.map((k) => (
                <div styles={style}>
                    <img src={k} style={{
                        textAlign: "center",
                        display: "block",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                        height: '200px',
                        width: 'auto'
                    }} />
                </div>
            ))}
        </Carousel>
    )
})


export default ImageCarousel;