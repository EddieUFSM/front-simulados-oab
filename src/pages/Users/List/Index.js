import React, { useState, useEffect } from 'react';

import {
    makeStyles
} from '@material-ui/core';

import { listUsers } from 'apis';
import { isAuthenticated } from 'auth';

import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const CustomerListView = () => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const { token } = isAuthenticated();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

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

    ];

    const init = () => {
        listUsers(token).then(async data => {
            if (data.error) {
                setError(data.error);
                setSuccess(data.success);
                setMessage(data.message);
                setLoading(false);
            } else {

                data.users.forEach(function (obj) {
                    obj.id = obj._id;
                    delete obj._id;
                });
                setRows(data.users);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        init();
        setLoaded(true);
    }, []);

    return (
        <div style={{ height: 500, width: '100%', padding: 16 }}>
            <DataGrid loading={loading} rows={rows} columns={columns} pageSize={10} checkboxSelection />
        </div>
    );
};

export default CustomerListView;
