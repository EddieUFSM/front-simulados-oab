import { makeStyles } from '@material-ui/core/styles'
const drawerWidth = 240;
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
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

  /**Menu TOP */
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    MozBoxShadow: "none",
    boxShadow: "none",
    WebkitBoxShadow: "none",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: 10,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    border: "0px",
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconAppBarSvg: {
    margin: 10,
    height: 'auto',
    width: 15,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  linkAppBar: {

  },
  nested: {
  },
  iconAppBar: {
    marginLeft: 10,
  },
  iconAppBarSecondLevel: {
    marginLeft: 10,
  },
  logoAppBar: {

    margin: 'auto',
    height: 30,
    width: "auto"
  },

  notificationAppBarr: {
    float: "left"
  },
  avatarTopMenu: {
    marginLeft: 10
  },
  inputSelection: {
    minWidth: "44vh",
    maxWidth: "44vh"
  }
}));
