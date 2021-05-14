import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import { MdInbox } from 'react-icons/md'
import MessageList from '../Messages/MessagesList'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function LabTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <AppBar position="static">
                <TabList onChange={handleChange} aria-label="simple tabs example">
                    <Tab icon={<MdInbox />} label="Caixa de Entrada" value="1" />
                    <Tab icon={<MdInbox />} label="Enviadas" value="2" />
                    <Tab icon={<MdInbox />} label="Mensagens do Sistema" value="3" />
                    <Tab icon={<MdInbox />} label="Assinatura" value="4" />
                </TabList>
            </AppBar>
            <TabPanel value="1"><MessageList /></TabPanel>
            <TabPanel value="2"><MessageList /></TabPanel>
            <TabPanel value="3">Sistema</TabPanel>
            <TabPanel value="4">Assinatura</TabPanel>
        </TabContext>
    );
}
