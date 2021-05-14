import React, { useState, useEffect } from 'react'

import {
  makeStyles,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  AppBar,
  IconButton,
  Drawer,
  Paper,
  Chip,
  Button
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Page from 'components/Page'
import Toolbar from './Toolbar'
import { getAllUsers } from 'admin/apiAdmin'
import { isAuthenticated } from 'auth'
import TablePaginationActions from './TablePagination'
import PropTypes from 'prop-types'
import { API } from 'config'

import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const { user, token } = isAuthenticated()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  let columns = [
    { field: 'id', headerName: 'ID', width: 150 },

    { field: 'firstName', headerName: 'Nome', width: 150 },
    { field: 'surname', headerName: 'Sobrenome', width: 150 },
    {
      field: 'cell', headerName: 'Celular', width: 250,
    },

    {
      field: 'email', headerName: 'Email', width: 200,

    },

  ]

  const init = () => {
    getAllUsers(token).then(async data => {
      if (data.error) {
        setError(data.error)
        setSuccess(data.success)
        setMessage(data.message)
        setLoading(false)
      } else {

        data.users.forEach(function (obj) {
          obj.id = obj._id;
          delete obj._id;
        });
        setRows(data.users)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    init()
    setLoaded(true)
  }, [])

  return (

    <div style={{ height: 500, width: '100%', padding: 16 }}>
      <DataGrid loading={loading} rows={rows} columns={columns} pageSize={10} checkboxSelection />
    </div>



  );
};

export default CustomerListView;
