import React from 'react';
import { API } from 'config';


const ShowImage = ({ item, url, index }) => (
    <div className='product-img'>
        <img
            src={`${API}/${url}/photo/${item._id}/${index}`}
            alt={item.name}
            className="mb-3"
            style={{ maxWidth: 100, height: 'auto' }}
        />
    </div>
);

export default ShowImage;