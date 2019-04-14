import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import defaultStyles from '../Theme/styles';

const styles = theme => ({
    ...defaultStyles(theme),
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 8,
    },
})
class Add extends React.Component {
    
    render() {
        const { classes, onClick } = this.props;

        return (
            <Fab className={classes.fab} color='primary' onClick={onClick}><Add /></Fab>
        )
    }
}

Add.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(Add);