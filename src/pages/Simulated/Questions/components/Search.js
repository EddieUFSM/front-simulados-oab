import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid, Paper, InputBase, IconButton, Button, Divider, InputLabel, FormControl, Select } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        alignItems: 'center',
        display: 'flex',
        MozBoxShadow: 'none',
        boxShadow: 'none',
        WebkitBoxShadow: 'none',
        backgroundColor: 'transparent',
        border: 'none'

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}))

export default function SearchSection() {

    const classes = useStyles();
    const [state, setState] = React.useState({

    });

    const handleChange = event => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    return (
        <Grid container spacing={3} >
            <Grid item xs={12} >
                <Paper>
                    <Paper component="form" className={classes.paper}>
                        <InputBase

                            className={classes.input}
                            placeholder="Buscar"
                            inputProps={{ "aria-label": "Buscar" }}
                        />
                        <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchOutlined />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <Button variant="contained" color="primary">
                            Questão
                        </Button>
                        <Button>
                            Opções
                        </Button>
                    </Paper>
                    <Divider style={{ maxWidth: 1400, margin: 'auto' }} />

                </Paper>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Banca</InputLabel>
                        <Select
                            native
                            value={state.banca}
                            onChange={handleChange}
                            label="Banca"
                            inputProps={{
                                name: "Banca",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'Penal'}>FGV</option>
                            <option value={'Civil'}>CESPE</option>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Exame</InputLabel>
                        <Select
                            native
                            value={state.exame}
                            onChange={handleChange}
                            label="Exame"
                            inputProps={{
                                name: "Exame",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'...'}>...</option>
                            <option value={'...'}>...</option>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Ano</InputLabel>
                        <Select
                            native
                            value={state.ano}
                            onChange={handleChange}
                            label="Ano"
                            inputProps={{
                                name: "Ano",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'2020'}>2020</option>
                            <option value={'2019'}>2019</option>
                            <option value={'2018'}>2018</option>
                            <option value={'2017'}>2017</option>
                            <option value={'2016'}>2016</option>
                            <option value={'2015'}>2015</option>
                            <option value={'2014'}>2014</option>
                            <option value={'2013'}>2013</option>
                            <option value={'2012'}>2012</option>
                            <option value={'2011'}>2011</option>
                            <option value={'2010'}>2010</option>
                            <option value={'2009'}>2009</option>
                            <option value={'2008'}>2008</option>
                            <option value={'2007'}>2007</option>
                            <option value={'2006'}>2006</option>
                            <option value={'2005'}>2005</option>
                            <option value={'2004'}>2004</option>
                            <option value={'2003'}>2003</option>
                            <option value={'2002'}>2002</option>
                            <option value={'2001'}>2001</option>
                            <option value={'2000'}>2000</option>
                            <option value={'1999'}>1999</option>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Fase</InputLabel>
                        <Select
                            native
                            value={state.fase}
                            onChange={handleChange}
                            label="Categoria"
                            inputProps={{
                                name: "Fase",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'Penal'}>1°</option>
                            <option value={'Civil'}>2°</option>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Disciplina</InputLabel>
                        <Select
                            native
                            value={state.disciplina}
                            onChange={handleChange}
                            label="Disciplina"
                            inputProps={{
                                name: "Disciplina",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'PENAL'}>PENAL</option>
                            <option value={'CIVIL'}>CIVIL</option>
                            <option value={'ADMINISTRATIVO'}>ADMINISTRATIVO</option>
                            <option value={'PROCESSUAL CIVIL'}>PROCESSUAL CIVIL</option>
                            <option value={'CONSTITUCIONAL'}>CONSTITUCIONAL</option>
                            <option value={'EMPRESARIAL'}>EMPRESARIAL</option>
                            <option value={'PROCESSUAL PENAL'}>PROCESSUAL PENAL</option>
                            <option value={'TRABALHISTA'}>TRABALHISTA</option>
                            <option value={'PROCESSUAL DO TRABALHO'}>PROCESSUAL DO TRABALHO</option>
                            <option value={'TRIBUTÁRIO'}>TRIBUTÁRIO</option>
                            <option value={'HUMANOS'}>HUMANOS</option>
                            <option value={'CÓDIGO DE DEFESA DO CONSUMIDOR'}>CÓDIGO DE DEFESA DO CONSUMIDOR</option>
                            <option value={'ESTATUTO DA CRIANÇA E ADOLESCENTE'}>ESTATUTO DA CRIANÇA E ADOLESCENTE</option>
                            <option value={'AMBIENTAL'}>AMBIENTAL</option>
                            <option value={'INTERNACIONAL'}>INTERNACIONAL</option>
                            <option value={'FILOSOFIA DO DIREITO'}>FILOSOFIA DO DIREITO</option>
                            <option value={'ESTATUTO DA ADVOCACIA'}>ESTATUTO DA ADVOCACIA</option>
                            <option value={'REGULAMENTO GERAL'}>REGULAMENTO GERAL</option>
                            <option value={'CÓDIGO DE ÉTICA'}>CÓDIGO DE ÉTICA</option>
                            <option value={'DISCIPLINA DA OAB'}>DISCIPLINA DA OAB</option>
                            <option value={'CÓDIGO ELEITORAL'}>CÓDIGO ELEITORAL</option>
                            <option value={'CÓDIGO DE TRÂNSITO BRASILEIRO'}>CÓDIGO DE TRÂNSITO BRASILEIRO</option>
                        </Select>
                    </FormControl>



                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Tema</InputLabel>
                        <Select
                            native
                            value={state.tema}
                            onChange={handleChange}
                            label="Tema"
                            inputProps={{
                                name: "Tema",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'Execução trabalhista'}>Execução trabalhista</option>
                            <option value={'A'}>A</option>
                        </Select>
                    </FormControl>

                </div>
            </Grid>

        </Grid>
    )
}