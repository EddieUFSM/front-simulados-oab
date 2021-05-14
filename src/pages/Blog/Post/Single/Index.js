import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Box, CardMedia, Paper } from '@material-ui/core';


import Comments from 'pages/Comments/Comments'

import Tags from 'components/Tags/Tags'
import LastPosts from 'pages/Blog/LastPosts'


const useStyles = makeStyles((theme) => ({

    paper: {
        padding: '50px',
        margin: '30px',
    },
    title: {
        fontWeight: 'bold'
    },
    bodyPost: {
        padding: theme.spacing(3)
    },
    bodyPostParagraphy: {
        padding: theme.spacing(3),
        textIndent: theme.spacing(2),
        lineHeight: '30px',
    },
    headerPost: {
        padding: theme.spacing(5)
    },
    quotePost: {
        marginLeft: theme.spacing(5),
        borderLeft: 'solid 3px #aaaaaaaa',
        padding: theme.spacing(3),
        textIndent: theme.spacing(2),
        lineHeight: '30px',
    }
}));




export default function RecipeReviewCard() {
    const classes = useStyles();

    return (
        <Fragment>
            <Box>
                <CardMedia image='https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' style={{ width: '100%', height: '400px', padding: '50px' }}></CardMedia>
            </Box>
            <Paper className={classes.paper}>

                <Box className={classes.headerPost}>
                    <Typography variant='h4' component='h1' className={classes.title}> Titulo da matéria</Typography>
                    <Typography variant='subtitle2'> Subtítulo da Matéria</Typography>

                </Box>

                <Box className={classes.bodyPost}>
                    <Typography variant="body1" className={classes.bodyPostParagraphy}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat ac. Velit sed ullamcorper morbi tincidunt ornare massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Lacus sed viverra tellus in hac. Urna duis convallis convallis tellus id interdum velit. Vestibulum sed arcu non odio euismod lacinia at. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Ultricies integer quis auctor elit sed. Mi tempus imperdiet nulla malesuada. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Lacus sed turpis tincidunt id aliquet. Risus nullam eget felis eget nunc. Elit sed vulputate mi sit. Massa sed elementum tempus egestas sed sed risus. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Curabitur gravida arcu ac tortor dignissim.
                    </Typography>
                    <Typography variant="body1" className={classes.bodyPostParagraphy}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat ac. Velit sed ullamcorper morbi tincidunt ornare massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Lacus sed viverra tellus in hac. Urna duis convallis convallis tellus id interdum velit. Vestibulum sed arcu non odio euismod lacinia at. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Ultricies integer quis auctor elit sed. Mi tempus imperdiet nulla malesuada. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Lacus sed turpis tincidunt id aliquet. Risus nullam eget felis eget nunc. Elit sed vulputate mi sit. Massa sed elementum tempus egestas sed sed risus. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Curabitur gravida arcu ac tortor dignissim.
                    </Typography>
                </Box>

                <Box className={classes.quotePost}>
                    <Typography variant='body2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat ac.
                    </Typography>
                    <Typography variant="subtitle2">
                        Autor Citado
                    </Typography>

                </Box>

                <Tags />
                <Comments />




            </Paper>
            <LastPosts />

        </Fragment>
    )
}
