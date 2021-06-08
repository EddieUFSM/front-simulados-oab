/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';

import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    },
    searchInput: {
        margin: theme.spacing(2)
    }
}));

export default function Sizes() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Container>
                <Autocomplete
                    multiple
                    options={tags}
                    getOptionLabel={(option) => option.tag}
                    defaultValue={[tags[1]]}
                    variant="outlined"

                    className={classes.searchInput}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={index}
                                label={option.tag}
                                size="small"
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Tags"
                            placeholder="Assunto"
                        />
                    )}
                />

            </Container>

        </div>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const tags = [
    { tag: 'Direito Constitucional' },
    { tag: '2021' },
    { tag: 'Exame da Ordem' },
    { tag: 'Direito da Mulher' },
    { tag: 'Homofobia' },

];
