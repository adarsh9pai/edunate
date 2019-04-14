import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Typography, Divider, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import MenuAppBar from '../Components/appBar';
import Post from './searchCards';
import defaultStyles from '../Theme/styles';
import SearchBar from '../Components/searchBar';
import StackGrid from 'react-stack-grid';

const styles = theme => ({
    ...defaultStyles(theme),
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 8,
        zIndex: 1000,
    },
});

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trendingHashtags: ['Computer Science', 'Giving', 'Charity', 'Robert'],
        }
    }

    handleHashtagClick = hashtag => () => {

    }

    handleAddPostClick = () => {

    }

    renderMyPosts = () => {
        const { classes } = this.props;

        return (
            <div className={classes.marginTheme}>
                <Typography variant='h6' color='primary'>My Posts</Typography>
                <Divider className={classes.marginTheme} />
                <StackGrid columnWidth={350} gutterWidth={20} gutterHeight={20}>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </StackGrid>
            </div>
        );
    }

    renderTrendingHashtags = () => {
        const { classes } = this.props;
        const { trendingHashtags } = this.state;

        return (
            <div className={classes.marginTheme}>
                <Typography variant='h6' color='primary'>Trending Hashtags</Typography>
                <Divider className={classes.marginTheme} />
                {trendingHashtags.map(hashtag => (
                    <Chip label={hashtag} className={classes.marginTheme} onClick={this.handleHashtagClick(hashtag)} clickable />
                ))}
            </div>
        );
    }

    renderRecentPosts = () => {
        const { classes } = this.props;

        return (
            <div className={classes.marginTheme}>
                <Typography variant='h6' color='primary'>Recent Posts</Typography>
                <Divider className={classes.marginTheme} />
                <StackGrid columnWidth={350} gutterWidth={20} gutterHeight={20}>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </StackGrid>
            </div>
        );
    }

    renderAddButton = () => {
        const { classes } = this.props;

        return (
            <Fab className={classes.fab} color='primary' onClick={this.handleAddPostClick}><Add /></Fab>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div >
                <MenuAppBar title='Homepage' />
                <div className={classes.root}>
                    <SearchBar />
                    {this.renderMyPosts()}
                    {this.renderTrendingHashtags()}
                    {this.renderRecentPosts()}
                    <Post />
                    {this.renderAddButton()}
                </div>
            </div>
        );
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);