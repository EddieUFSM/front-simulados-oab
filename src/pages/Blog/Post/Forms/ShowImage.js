import React from 'react';
import { API } from 'config';


const ShowImage = ({ item, url, index }) => (
    <div className='post-imgs'>
        <img
            src={`${API}/${url}/body/images/${item._id}/${index}`}
            alt={item.name}
            className="mb-3"
            style={{ maxWidth: 100, height: 'auto' }}
        />
    </div>
);

export default ShowImage;