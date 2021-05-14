import React from 'react'
import {useState}  from 'react'
import { makeStyles } from '@material-ui/core/styles'

export function useForm(initialValues) {
    const[values, setValues] = useState(initialValues)
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues ({
            ...values,
            [name]:value
        })
    }
    return {
        values,
        setValues,
        handleInputChange,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiFormControl-root': {
          width: '90%',
          margin: theme.spacing(1)
      }
}}))

export function Form(props) {
    const classes = useStyles()
    return (
        <form className={classes.root}>
            {props.children}
        </form>
    )
}
