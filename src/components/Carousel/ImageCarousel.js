
// className "owl-theme" is optional
import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { API } from '../../config';

const Photos = (length, Id) => {
    let rows = [];
    let index;
    for (index = 0; index < length; index++) {
        rows.push(<Slide index={0}><img src={`${API}/product/photos/${Id}/${index}`} /></Slide>);
    }

    return (
        rows
    );
};

export default function ImageCarousel({ item }) {

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
        >
            <Slider>
                {
                    item.photos && (item.photos.length) ? Photos(item.photos.length, item._id) : <></>
                }
            </Slider>
        </CarouselProvider>
    );
}