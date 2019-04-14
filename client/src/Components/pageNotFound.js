import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import MenuAppBar from './appBar';

const styles = theme => ({
    root: {
        marginTop: 64 + theme.spacing.unit * 3,
    },
    top: {
        display: 'grid',
    },
    center: {
        margin: 'auto',
    },
    oops: {
        fontSize: '10rem',
    },
    pageNotFound: {
        fontSize: '3rem',
        marginTop: -70,
    },
    returnBtn: {
        marginTop: 20,
    }
})

class PageNotFound extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <MenuAppBar title='' history={this.props.history}/>

                <div className={classes.root}>
                    <div className={classes.top}>
                        <div className={classes.center}>
                            <Typography className={classes.oops}>OOPS!</Typography>
                        </div>

                        <div className={classes.center}>
                            <Typography className={classes.pageNotFound}>PAGE NOT FOUND</Typography>
                        </div>

                        <div className={classes.center}>
                            <NavLink to='/homepage' className={classes.link}>
                                <Button color='primary' variant='extendedFab' className={classes.returnBtn}>
                                    <Home />
                                    Return to Homepage
                            </Button>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PageNotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    token: state.login.token,
})

export default withStyles(styles)(PageNotFound);