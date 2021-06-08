'use strict';
import React, { useState, useEffect } from 'react';
import { Form } from 'components/Form/useForm';
import { Grid, TextField, FormControl, Button, makeStyles, Select } from '@material-ui/core';
import { isAuthenticated } from 'auth';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ImageOutlined } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createPost } from 'admin/apiAdmin';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        alignItems: 'center',
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

    /**Menu TOP */

    title: {
        flexGrow: 1,
    },
    iconAppBarSvg: {
        margin: 10,
        height: 'auto',
        width: 15,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    inputSelection: {
        minWidth: '45vh',
        maxWidth: '45vh'
    },
    inputSelection6: {
        minWidth: '68vh',
        maxWidth: '68vh'
    },
    imputExam: {
        minWidth: '45vh',
        maxWidth: '45vh'
    },
    btn: {
        margin: theme.spacing(3),
        justifyContent: 'center'
    }
}));

export default function PostForm() {
    const classes = useStyles();
    const { user, token } = isAuthenticated();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [inputList, setInputList] = useState([{ order: '', type: '', paragraph: '', image: '', quote: '' }]);
    const [files, setFiles] = useState([]);
    const [desable, setDesable] = useState(true);
    const [indexSelected, setIndexSelected] = useState(0);
    const [tags, setTags] = useState([]);
    const [values, setValues] = useState({
        title: '',
        subtitle: '',
        matterCall: '',
        tags: [],
        formData: '',
        body: [],
        message: ''
    });

    const {
        title,
        subtitle,
        formData,
        body,
    } = values;

    const init = () => {
        setValues({
            ...values,
            formData: new FormData()
        });
    };

    useEffect(() => {
        init();
    }, []);


    const onTagsChange = async (event, tags) => {
        const SelectedTags = tags;
        setTags(SelectedTags);
        setValues({ ...values, tags: SelectedTags });
    };


    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
        formData.set(name, value);
    };
    // handle image update

    const handleImageUpdate = async (index) => {
        console.log(index);
        setIndexSelected(index);
    };

    // handle input change
    const handleInputChange = async (e, index) => {
        let name = e.target.name;
        let value;
        let list;

        switch (name) {
        case 'image':
            value = e.target.files[0];
            list = [...inputList];
            list[indexSelected] = {
                name: value,
                order: indexSelected
            };
            setValues({ ...values, 'body': list });
            formData.set('image' + indexSelected, value);
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            break;
        case 'quote':
            console.log('veio aqui');
            value = e.target.value;
            list = [...inputList];
            list[index][name] = value;
            list[index]['order'] = index;
            setValues({ ...values, 'body': list });
            formData.set('quote' + index, value);
            break;
        case 'paragraph':
            console.log('veio aqui');
            value = e.target.value;
            list = [...inputList];
            list[index][name] = value;
            list[index]['order'] = index;
            setValues({ ...values, 'body': list });
            formData.set('paragraph' + index, value);
            break;
        default:
            console.log('veio aqui');
            value = e.target.value;
            list = [...inputList];
            list[index][name] = value;
            list[index]['order'] = index;
            setValues({ ...values, 'body': list });
            break;

        }
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { order: '', type: '', paragraph: '', image: '', quote: '' }]);
    };

    const clickSumit = event => {
        event.preventDefault();
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        setValues({ ...values, message: '', loading: true });
        createPost(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, message: data.message });
                setError(data.error);
            } else {
                setValues({
                    ...values,
                    title: '',
                    subtitle: '',
                    matterCall: '',
                    tags: [],
                    formData: new FormData(),
                    message: data.message
                });
                setInputList([{ order: '', type: '', paragraph: '', image: '', quote: '' }]);
                setTags([]);
                setSuccess(data.success);
            }
        });
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Título"
                        name="title"
                        value={values.title}
                        onChange={handleChange('title')}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Título"
                        name="subtitle"
                        value={values.subtitle}
                        onChange={handleChange('subtitle')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Chamada do Post (resumo)"
                        name="matterCall"
                        value={values.matterCall}
                        onChange={handleChange('matterCall')}
                        multiline
                        rows={4}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={option => option.name}
                        value={values.tags}
                        onChange={onTagsChange}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="standard"
                                margin="normal"
                                fullWidth
                            />
                        )}
                    />

                </Grid>

                {inputList.map((x, i) => {
                    return (
                        <Grid container key={i}>
                            <Grid item xs={3}>
                                <Select
                                    name="type"
                                    value={x.type}
                                    onChange={e => handleInputChange(e, i)}
                                    variant="outlined"
                                    style={{
                                        width: '80%',
                                        margin: 'auto'
                                    }}
                                >
                                    {
                                        types.map((type) => (
                                            <option value={type.type} key={type.type} onChange={handleChange}>
                                                {type.type}
                                            </option>
                                        ))
                                    }
                                </Select>
                            </Grid>

                            {x.type === 'PARAGRAPH' &&
                                <Grid item xs={6}>
                                    <TextField multiline rows={4} className="ml10" name="paragraph" placeholder="Paragrafo" value={x.paragraph} type='text' onChange={e => handleInputChange(e, i)} />
                                </Grid>

                            }
                            {x.type === 'IMAGE' &&
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <input accept="image/*" name={'image'} className={classes.input} onChange={e => handleInputChange(e, i)} style={{ display: 'none' }} id="raised-button-file" multiple type="file" />
                                        <label htmlFor="raised-button-file">
                                            <Button color="primary" variant="outlined" onClick={e => handleImageUpdate(i)} component="span" aria-label="add" size="large" startIcon={<ImageOutlined />}>
                                                Adicionar Imagem
                                            </Button>
                                        </label>
                                    </FormControl>
                                </Grid>
                            }
                            {x.type === 'QUOTE' &&
                                <Grid item xs={6}>
                                    <TextField className="ml10" multiline rows={2} name="quote" placeholder="Citação" value={x.quote} type='text' onChange={e => handleInputChange(e, i)} />
                                </Grid>

                            }
                            <Grid item xs={3}>
                                {inputList.length !== 1 && <Button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                {
                                    inputList.length - 1 === i && <Grid item xs={6}>
                                        <Button onClick={handleAddClick} variant="outlined">Adicionar item</Button>
                                    </Grid>
                                }
                            </Grid>

                        </Grid>
                    );
                })}

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" className={classes.btn} type="submit" onClick={clickSumit}>
                        Enviar
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    This is a error message!
                </Alert>
            </Snackbar>

            <div style={{ marginTop: 20 }}>{JSON.stringify(values)}</div>
        </Form>
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

const types = [
    { type: 'IMAGE' },
    { type: 'PARAGRAPH' },
    { type: 'QUOTE' },
];