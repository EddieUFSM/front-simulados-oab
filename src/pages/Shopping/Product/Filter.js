import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Container, Grid, Button, FormControl, MenuItem, Paper, Divider, CardMedia, Select, Card, CardActionArea, CardContent, Typography, CardActions, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Slider, Chip } from '@material-ui/core';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import { getAllProducts } from 'admin/apiAdmin';
import { API } from 'config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Banner from 'assets/img/Banner/banner01.png';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
  
    appBar: {
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuIcon: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        borderRight: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        height: '100vh',
        overflow: 'auto',
    },
    contentShift: {

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1
    },

    logo: {
        height: 30
    },
    ListItemText: {
        fontSize: 14
    },
    listItem: {
        paddingTop: 6,
        paddingBottom: 6
    },
    MuiList: {
        paddingTop: 0,
        paddingBottom: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    cardRoot: {
        maxWidth: 345,
    },
  
  
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    productFilter: {
        root: {
            flexGrow: 1,
        },
        filterDiv: {
            backgroundColor: 'white'
        }
    },
    filterStyles: {
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    filterContainerStyles: {
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightBold,
        },
        filterAccordion: {
            boxShadow: 'none',
            margin: '0px !important',
        },
        filterAccordionSummary: {
            margin: '0px !important',
        },
    },
    checkBoxFilterStyle: {
        root: {
            display: 'flex',
        },
        formControl: {
        },
    },
    filters: {
        margin: 20
    }
}));

function valuetext(value) {
    return `${value}`;
}

export default function Filters() {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(min-width:600px)');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [products, setProducts] = useState([]);

    const init = () => {
        getAllProducts().then(data => {
            if (data.error) {
                setMessage(data.message);
                setError(data.error);
            } else {
                setProducts(data.products);
                setSuccess(data.success);
                setMessage(data.message);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleClick = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const ClouthsFilter = () => {
        const [state, setState] = useState({
            EP: false,
            P: false,
            PP: false,
            M: false,
            G: false,
            GG: false,
            EG: false
        });

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };

        const { EP, P, PP, M, G, GG, EG } = state;
        const error = [EP, P, PP, M, G, GG, EG].filter((v) => v).length !== 2;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Tamanho</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={EP} onChange={handleChange} name="EP" />}
                            label="EP"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={PP} onChange={handleChange} name="PP" />}
                            label="PP"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={M} onChange={handleChange} name="M" />}
                            label="M"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={G} onChange={handleChange} name="G" />}
                            label="G"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={GG} onChange={handleChange} name="GG" />}
                            label="GG"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={EG} onChange={handleChange} name="EG" />}
                            label="EG"
                        />
                    </FormGroup>
                    <FormHelperText>Escolha o tamanho</FormHelperText>
                </FormControl>

            </div>
        );
    };

    const GenderFilter = () => {
        const [state, setState] = useState({
            Masculino: false,
            Feminino: false,
            Infantil: false,
            Agenero: false

        });

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };

        const { Masculino, Feminino, Infantil, Agenero } = state;
        const error = [Masculino, Feminino, Infantil, Agenero].filter((v) => v).length !== 2;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gênero</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={Masculino} onChange={handleChange} name="Masculino" />}
                            label="Masculino"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Feminino} onChange={handleChange} name="Feminino" />}
                            label="Feminino"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Infantil} onChange={handleChange} name="Infantil" />}
                            label="Infantil"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Agenero} onChange={handleChange} name="Agenero" />}
                            label="Agênero"
                        />
                    </FormGroup>
                    <FormHelperText>Escolha o Sexo</FormHelperText>
                </FormControl>

            </div>
        );
    };


    const PriceFilter = () => {
        const [value, setValue] = useState([50, 207]);
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        return (
            <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>Preço</Typography>
                <Slider
                    min={0}
                    max={800}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            </div>
        );
    };

    const ChipsSelected = () => {

        const [categories, setCategories] = useState([{ category: 'categoria' }]);
        const [filters, setFilters] = useState([{ filter: 'PP' }, { filter: 'masculine' }]);
        const [authors, setAuthors] = useState([{ name: 'Philip K. Dick' }]);
        const [brands, setBrands] = useState([{ brand: 'Nike' }]);

        const handleDelete = (obj, name) => {
            name === 'filter' ? setFilters(filters => filters.filter(filter => filter.filter !== obj.filter)) && console.log(filters) : console.log(filters);
            name === 'category' ? setCategories(categories => categories.filter(category => category.category !== obj.category)) && console.log(categories) : console.log(categories);
            name === 'brand' ? setBrands(brands => brands.filter(brand => brand.category !== obj.category)) && console.log(brands) : console.log(brands);
            name === 'author' ? setAuthors(authors => authors.filter(author => author.category !== obj.category)) && console.log(authors) : console.log(authors);
        };

        const handleClick = () => {
            console.info('You clicked the Chip.');
        };

        return (
            <div>

                <Typography id="range-slider" gutterBottom>Filtros</Typography>
                {
                    categories ? categories.map((c) => (
                        <Chip key={c.category}
                            variant="outlined"
                            size="small"
                            label={c.category}
                            onClick={handleClick}
                            deleteIcon={<DeleteIcon />}
                            onDelete={() => handleDelete(c, 'category')}
                        />
                    )) : <></>
                }
                {
                    filters ? filters.map((f) => (
                        <Chip
                            key={f.filter}
                            variant="outlined"
                            color='primary'
                            size="small"
                            label={f.filter}
                            onClick={handleClick}
                            deleteIcon={<DeleteIcon />}
                            onDelete={() => handleDelete(f, 'filter')}
                        />
                    )) : <></>
                }
                {
                    brands ? brands.map((b) => (
                        <Chip
                            key={b.brand}
                            variant="outlined"
                            color='secondary'
                            size="small"
                            label={b.brand}
                            onClick={handleClick}
                            onDelete={() => handleDelete(b, 'brand')}
                            deleteIcon={<DeleteIcon />}
                        />
                    )) : <></>
                }
                {
                    authors ? authors.map((a) => (
                        <Chip
                            key={a.name}
                            variant="outlined"
                            color='secondary'
                            size="small"
                            label={a.name}
                            onClick={handleClick}
                            onDelete={() => handleDelete(a, 'author')}
                            deleteIcon={<DeleteIcon />}
                        />
                    )) : <></>
                }


            </div>
        );
    };

    const CategoriesFiltes = () => {

        const [state, setState] = useState({
            Categoria: false,
        });

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };

        const { Categoria1 } = state;
        const error = [Categoria1].filter((v) => v).length !== 2;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Categoria</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={Categoria1} onChange={handleChange} name="Categoria1" />}
                            label="Categoria1"
                        />

                    </FormGroup>
                    <FormHelperText>Escolha a categoria</FormHelperText>
                </FormControl>

            </div>
        );
    };

    return (
        <Container>
            <img src={Banner} width='100%' height='auto' style={{ padding: 30 }}></img>
            <Grid container spacing={2}>
                <Grid sm={12} md={12} lg={12}>
                    <AppBar position='relative' color='inherit' elevation={0}>
                        <Toolbar>
                            {!matches ? <Button color='inherit' edge='start' aria-label="menu" onClick={() => handleClick()}>
                                Filtrar
                            </Button> : <></>}
                            <div style={{ width: '100%' }}>
                                <FormControl style={{ float: 'right', width: 200 }}>
                                    <Select variant='outlined' defaultValue={'popularity'}>
                                        <MenuItem value={'hight'}>Menor preço</MenuItem>
                                        <MenuItem value={'lower'}>Maior preço</MenuItem>
                                        <MenuItem value={'popularity'}>Popularidade</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>


                <Grid sm={matches ? 3 : 12}>
                    {matches || open ?
                        <div style={{ marginTop: 20 }}>
                            <Paper elevation={0} >
                                <div className={classes.filters} style={{ paddingTop: 20 }}>
                                    <ChipsSelected className={classes.filters} />
                                </div>
                                <Divider />
                                <div className={classes.filters}>
                                    <GenderFilter className={classes.filters} />
                                </div>
                                <Divider />
                                <div className={classes.filters}>
                                    <PriceFilter className={classes.filters} />
                                </div>
                                <div className={classes.filters} style={{ paddingBottom: 20 }}>
                                    <ClouthsFilter />
                                </div>
                            </Paper>
                        </div> : <></>
                    }

                </Grid>
                <Grid sm={9}>
                    <div style={{ marginTop: 20, backgroundColor: 'transparent' }}>
                        <Paper style={{ marginTop: 20, backgroundColor: 'transparent', padding: 10 }} elevation={0}>
                            <Grid container spacing={2}>
                                {
                                    products.map((product) => (
                                        <Grid item sm={4} key= {product._id}>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Produto"
                                                        height="210"
                                                        src={`${API}/product/photos/${product._id}/${0}`}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {product.name}
                                                        </Typography>
                                                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                                        <Typography gutterBottom variant="h6" component="h3">
                                                            {product.price}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button variant="outlined" color="primary" href={'/product/' + product._id + '/Single'}>
                                                        Conferir
                                                    </Button>
                                                    <IconButton color="primary" aria-label="add to shopping cart" style={{ marginLeft: '40%' }}>
                                                        <AddShoppingCartIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                    ))
                                }
                            </Grid>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </Container >

    );
}
