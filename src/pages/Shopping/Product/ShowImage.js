import React from 'react'
import { API } from 'config'


const ShowImage = ({ item, url }) => (
    <div className='product-img'>
        <img
            src={`${API}/${url}/photos/${item._id}/${0}`}
            alt={item.name}
            className="mb-3"
            style={{ maxWidth: 100, height: 'auto' }}
        />
    </div>
)

export default ShowImage 