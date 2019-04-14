import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Chip, Typography, Divider, Fab, Dialog, DialogTitle, DialogContent, DialogActions,
    DialogContentText, TextField, Button, MenuItem, Grid
} from '@material-ui/core';
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
    btnRight: {
        marginLeft: '77%',
    },
});

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trendingHashtags: ['Computer Science', 'Giving', 'Charity', 'Robert'],
            isAddPostOpen: false,
            requests: [],
            hashtags: [],
            tag: '',
        }
    }

    handleHashtagClick = hashtag => () => {

    }

    handleClose = () => {
        this.setState({ isAddPostOpen: false });
    }

    handleAddPostClick = () => {
        this.setState({
            isAddPostOpen: true,
            requests: [],
            hashtags: [],
        });
    }

    handleTextChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleRequestTextChange = requestIndex => e => {
        const { requests } = this.state;
        requests[requestIndex].title = e.target.value;

        this.setState({ requests });
    }

    handlePost = () => {

    }

    handleSelectChange = id => e => {
        this.setState({ [id]: e.target.value });
    }

    handleAddHashtag = () => {
        const { tag, hashtags } = this.state;
        if (tag)
            hashtags.push({
                id: null,
                tag,
            });

        this.setState({ hashtags, tag: '' });
    }

    handleAddRequestClick = () => {
        const { requests } = this.state;

        requests.push({
            type: '',
            title: '',
            description: '',
        });

        this.setState({ requests });
    }

    handleDeleteHashtag = hashtagIndex => () => {
        const { hashtags } = this.state;
        hashtags.splice(hashtagIndex, 1);

        this.setState({ hashtags });
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

    renderAddPostDialog = () => {
        const { classes } = this.props;
        const { isAddPostOpen, type = '', tag, hashtags } = this.state;

        return (
            <Dialog
                open={isAddPostOpen}
                onClose={this.handleClose}
            >
                <DialogTitle>Add Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We get it, it's tough. So, crowd source your friends, family, and kind-hearted strangers to give you either money, commodities, or their skills
                        to help you through your college journey.
                    </DialogContentText>

                    <Grid container>

                        {/* Request */}
                        <Grid item xs={12} className={classes.formGridItem}>
                            <Typography variant='h6'>Request</Typography>
                            <Typography>A description of what you are needing for college</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formGridItem}>
                            <TextField id="title" label="Title" onBlur={this.handleTextChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formGridItem}>
                            <TextField id='type' label="Type" value={type} onChange={this.handleSelectChange('type')} fullWidth select
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                            >
                                <MenuItem value='monetary'>Monetary</MenuItem>
                                <MenuItem value='commodity'>Commodity</MenuItem>
                                <MenuItem value='skill'>Skill</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={classes.formGridItem}>
                            <TextField id="description" label="Description" onBlur={this.handleTextChange} fullWidth multiline />
                        </Grid>


                        {/* Promise */}
                        <Grid item xs={12} className={classes.formGridItem}>
                            <Typography variant='h6'>Promise</Typography>
                            <Typography>A short description of what I promise to any of my benefactors</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.formGridItem}>
                            <TextField id="promise" label="Promise" onBlur={this.handleTextChange} fullWidth />
                        </Grid>

                        {/* Hashtags */}
                        <Grid item xs={12} className={classes.formGridItem}>
                            <Typography variant='h6'>Hash Tags</Typography>
                            <Typography>Give your post some keywords to search by</Typography>
                        </Grid>
                        <Grid item xs={12} sm={7} className={classes.formGridItem}>
                            <TextField id='tag' label='Hashtag Name' value={tag} onChange={this.handleTextChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.formGridItem}>
                            <Button variant='contained' color='primary' onClick={this.handleAddHashtag}> Add Hashtag </Button>
                        </Grid>
                        {hashtags.map((hashtag, i) => (
                            <Chip key={`hashtag-${i}`} label={hashtag.tag} className={classes.marginTheme} onDelete={this.handleDeleteHashtag(i)} clickable />
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}> Cancel </Button>
                    <Button onClick={this.handlePost} color="primary"> Create </Button>
                </DialogActions>
            </Dialog>
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
                    {this.renderAddPostDialog()}
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