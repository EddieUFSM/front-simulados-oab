
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField, Button, InputAdornment, FormControl } from '@material-ui/core'
import { ImageOutlined } from '@material-ui/icons'
import { Form } from 'components/Form/useForm'
import { isAuthenticated } from 'auth'
import { createProduct, getCategories } from "admin/apiAdmin"
import Snackbar from '@material-ui/core/Snackbar'
import Autocomplete from '@material-ui/lab/Autocomplete'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
    },
    toolbar: {
        alignItems: "center",
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}))

export default function ProductForm() {
    const classes = useStyles()
    const { user, token } = isAuthenticated()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [indexSelected, setIndexSelected] = useState(0)
    const [inputList, setInputList] = useState([{ image: '' }])
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        shipping: '',
        qnt: '',
        photos: '',
        photo: '',
        loading: false,
        message: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: '',
    })

    const {
        name,
        description,
        price,
        categories,
        shipping,
        qnt,
        photos,
        loading,
        createdProduct,
        redirectToProfile,
        formData
    } = values
    const [allCategories, setAllCategories] = useState([])

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                data.map((c) => {
                    setAllCategories(...allCategories, data)
                    setValues({
                        ...values,
                        formData: new FormData()
                    })
                })
            }
        })
    }


    const onCategoryChange = async (event, categories) => {
        let myArray = []
        setValues({ ...values, categories: categories })
        let index = 0
        categories.map(category => {
            formData.append('category' + index, category._id);
            index++
        })

    }

    useEffect(() => {
        init();
    }, [])


    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }

    const handleInputChange = async (e, index) => {
        let name = e.target.name
        let value = e.target.files[0]
        formData.append(name + indexSelected, value)
    }

    const handleImageUpdate = async (index) => {
        setIndexSelected(index)
    }

    const handleRemoveClick = index => {
        const list = [...inputList]
        formData.delete('image' + index)
        console.log(index)
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }

        list.splice(index, 1)

        setInputList(list)
    }

    const handleAddClick = () => {
        setInputList([...inputList, { image: '' }])
    }

    const clickSumit = event => {
        event.preventDefault();
        setValues({ ...values, message: '', loading: true })
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }
        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, message: data.message })
                setError(data.error)
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    qnt: '',
                    loading: false,
                    createdProduct: data.name
                });
                setSuccess(data.success)
            }
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccess(false)
        setError(false)
    }

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Nome"
                        name="name"
                        onChange={handleChange('name')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="Remessa"
                        name="shipping"
                        onChange={handleChange('shipping')}
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField type="number" onChange={handleChange('price')} variant="outlined" name="price" label="Preço" InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}></TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField type="number" onChange={handleChange('qnt')} variant="outlined" name="qnt" label="Quantidade"></TextField>
                </Grid>

                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Autocomplete
                            variant="outlined"
                            multiple
                            options={allCategories}
                            getOptionLabel={option => option.category}
                            value={values.tags}
                            onChange={onCategoryChange}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    margin="normal"
                                    label='Categoria'
                                    fullWidth
                                />
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Descrição do Produto"
                        name="description"
                        multiline
                        rows={6}
                        onChange={handleChange('description')}
                    />
                </Grid>
                {inputList.map((x, i) => {
                    return (
                        <Grid container>

                            {
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



                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Button variant="contained" color="primary" className={classes.btn} onClick={clickSumit} >
                            Adicionar
                </Button>
                    </FormControl>
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

            {JSON.stringify(inputList)}

        </Form>
    )
}