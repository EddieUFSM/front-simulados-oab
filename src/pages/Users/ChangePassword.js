import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { update, updateUser } from 'admin/apiUser';
import { isAuthenticated } from 'auth';
import { Redirect } from 'react-router-dom';

export default function ChangePassword() {
    const { user, token } = isAuthenticated();
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = event => {
        setPassword(event.target.value);
    };

    const handleConfirmationChange = event => {
        setConfirmation(event.target.value);
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        update(user._id, token, { 'password': password, 'confirmation': confirmation }).then((data) => {
            if (data.error) {
                console.log('deu ruim');
            } else {
                updateUser(data.user, () => {
                    setSuccess(true);
                });
            }
        });
    };

    const redirectUser = (success) => {
        console.log('5');
        if (success) {
            return <Redirect to="/home" />;
        }
    };

    return (
        <div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmation"
                label="confirmation"
                type="confirmation"
                id="confirmation"
                value={confirmation}
                onChange={handleConfirmationChange}
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={clickSubmit}
            >
                mudar senha
            </Button>
            {redirectUser(success)}
        </div>
    );
}