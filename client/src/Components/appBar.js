import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        height: 64,
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class MenuAppBar extends React.Component {

    handleProfileClick = () => {
        this.props.history.push('/profile');
    }

    render() {
        const { classes, title } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {title}
                        </Typography>
                        <IconButton color='inherit' onClick={this.handleProfileClick}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    token: state.login.token,
})

export default withStyles(styles)(MenuAppBar);
