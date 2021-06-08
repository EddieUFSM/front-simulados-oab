import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function MyTags() {
    const [tags, setTags] = useState([]);

    const onTagsChange = async (event, values) => {
        const SelectedTags = values;
        setTags(SelectedTags);
        console.log(tags);
    };

    return (
        <div style={{ width: 500 }}>
            <Autocomplete
                multiple
                options={options}
                getOptionLabel={option => option.name}
                onChange={onTagsChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Multiple values"
                        placeholder="Favorites"
                        margin="normal"
                        fullWidth
                    />
                )}
            />
            <div style={{ marginTop: 20 }}>{JSON.stringify(tags)}</div>
        </div>
    );

}

const options = [
    { name: 'B', _id: 'x' },
    { name: 'C', _id: 'z' },
    { name: 'D', _id: 'y' },
    { name: 'E', _id: 'v' },
    { name: 'F', _id: 'u' },
    { name: 'G', _id: 'o' },
    { name: 'A', _id: 'w' },
];