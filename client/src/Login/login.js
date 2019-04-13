import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar />

            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
