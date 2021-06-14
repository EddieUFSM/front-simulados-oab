import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Edit, Image } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import { API } from 'config';

import MuiAlert from '@material-ui/lab/Alert';

import {
    Avatar,
    Box,
    Badge,
    Card,
    CardContent,
    Divider,
    FormControl,
    makeStyles,
    ButtonBase,
    Button
} from '@material-ui/core';
import { isAuthenticated } from '../../../auth';
import { editProfilePhoto } from '../../../apis';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    },
    bt: {
        margin: theme.spacing(1)

    }
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Profile = ({ className, ...rest }) => {
    const classes = useStyles();
    const { user, token } = isAuthenticated();
    const [photo, setPhoto] = useState({ formData: '' });
    const {
        formData
    } = photo;

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [imageLink, setImageLink] = useState(`${API}/user/photo/${user._id}`);

    // load categories and set form data
    const init = () => {
        setPhoto({
            ...photo,
            formData: new FormData()
        });

    };

    useEffect(() => {
        init();
    }, []);

    const handlePhotoChange = async (e) => {
        let name = e.target.name;
        let value = e.target.files[0];
        formData.append('image', value);
        setImageLink(imageLink);
    };

    const handleRemovePhotoClick = () => {
        formData.delete('image');
        setMessage('Photo do perfil deletada com sucesso');
        setSuccess(true);
        setError(false);
        setImageLink(imageLink);
        editProfilePhoto(user._id, token, formData).then(data => {
            if (data.error) {
                setPhoto({ ...formData, formData: new FormData });
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            } else {
                setPhoto({ ...formData, formData: new FormData });
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            }
        });
    };

    const clickSumit = event => {
        event.preventDefault();
        setMessage('');

        if (!formData.has('image')) {
            setError(true);
            setSuccess(false);
            setMessage('Adidione uma imagem para atualizar a foto do perfil');
            return;
        }

        setImageLink(imageLink);

        editProfilePhoto(user._id, token, formData).then(data => {
            if (data.error) {
                setPhoto({ ...formData, formData: new FormData });
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            } else {
                setPhoto({ ...formData, formData: new FormData });
                setMessage(data.message);
                setError(data.error);
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

    const showError = () => (
        <Alert severity="warning" style={{ display: error ? '' : 'none' }}>
            {message}
        </Alert>
    );
    const showSuccess = () => (
        <Alert severity="success" style={{ display: success ? '' : 'none' }}>
            {message}
        </Alert>
    );



    return (
        <>
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <CardContent>
                    <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="column"
                    >


                        <FormControl variant="outlined" className={classes.formControl}>
                            <input accept="image/*" name={'image'} className={classes.input} onChange={e => handlePhotoChange(e)} style={{ display: 'none' }} id="raised-button-file" multiple type="file" />
                            <label htmlFor="raised-button-file">
                                <ButtonBase color="primary" variant="outlined" component="span" aria-label="add" size="large">
                                    <Badge
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        badgeContent={<Edit color="primary" style={{ fontSize: 40 }} />}
                                    >
                                        <Avatar
                                            src={imageLink}
                                            className={classes.avatar}
                                        />
                                    </Badge>


                                </ButtonBase>
                            </label>
                        </FormControl>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            p={2}
                            m={1}

                        >
                            <Button
                                onClick={(e) => clickSumit(e)}
                                color="primary"
                                variant="contained"

                                className={classes.bt}>
                                <Image style={{ marginRight: 5 }} /> Atulizar
                            </Button>
                            <Button
                                onClick={() => handleRemovePhotoClick()}
                                style={{ backgroundColor: '#CF3D33', color: 'white' }}
                                className={classes.bt}
                            >
                Exluir
                            </Button>
                        </Box>


                    </Box>
                </CardContent>
                <Divider />

            </Card>

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
        </>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;
