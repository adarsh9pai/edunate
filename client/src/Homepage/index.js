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
import { getAllBarters, getTrendingHashtags, addBarter, Barter, updateBarter } from '../API/Barter';
import { connect } from 'react-redux';
import SnackBar from '../Components/snackbar';
import { Request } from '../API/Request';
import Payment from '../Payment/Payment';
import { getUser } from '../API/User';

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
            trendingHashtags: [],
            isAddPostOpen: false,
            isEditPostOpen: false,
            isPaymentOpen: false,
            requests: [],
            hashtags: [],
            barters: [],
            tag: '',
            selectedPost: null,
            selectedTag: '',
            selectedPayment: null,
            user: null,

            confirmation: {
                variant: null,
                message: null,
                isOpen: false,
            },
        }
    }

    componentDidMount = async () => {
        const { userID } = this.props;

        this.fetchAll();
        const user = await getUser(userID);
        this.setState({ user });
    }

    fetchAll = async () => {
        const barters = await getAllBarters();
        const trendingHashtags = await getTrendingHashtags();
        this.setState({
            barters,
            trendingHashtags,
        });
    }

    handleHashtagClick = hashtag => () => {
        this.setState({ selectedTag: hashtag });
    }

    handleClose = () => {
        this.setState({ isAddPostOpen: false, isEditPostOpen: false, isPaymentOpen: false, });
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

    handlePost = () => {
        const { user } = this.state;

        addBarter(new Barter({
            user,
            request: new Request(this.state),
            ...this.state,
        }))
            .then(() => this.fetchAll())
            .then(() => this.handleShowConfirmation('success', 'Post created!'))
            .then(() => this.setState({ isAddPostOpen: false }))
            .catch(err => this.handleShowConfirmation('error', "oof, something went wrong!"));
    }

    handleUpdatePost = () => {
        const { selectedPost } = this.state;

        updateBarter(new Barter({
            ...selectedPost,
            ...this.state,
            request: new Request(this.state),
        }))
            .then(() => this.fetchAll())
            .then(() => this.handleShowConfirmation('success', 'Post updated!'))
            .then(() => this.setState({ isEditPostOpen: false }))
            .catch(err => this.handleShowConfirmation('error', "Oof, something went wrong!"));
    }

    handleSelectChange = id => e => {
        this.setState({ [id]: e.target.value });
    }

    handleAddHashtag = () => {
        const { tag, hashtags } = this.state;
        if (tag)
            hashtags.push(tag);

        this.setState({ hashtags, tag: '' });
    }

    handleDeleteHashtag = hashtagIndex => () => {
        const { hashtags } = this.state;
        hashtags.splice(hashtagIndex, 1);

        this.setState({ hashtags });
    }

    handleEditPostClick = post => () => {
        this.setState({
            ...post,
            ...post.request,
            isEditPostOpen: true,
            selectedPost: post,
        })
    }

    handleShowConfirmation = (type, message) => {
        this.setState({
            confirmation: {
                variant: type,
                message: message,
                isOpen: true,
            },
        });
    };

    handleHideConfirmation = () => {
        this.setState(prevState => ({
            confirmation: {
                ...prevState.confirmation,
                isOpen: false,
            },
        }));
    };

    handlePostExpand = () => {
        this.grid.updateLayout();

    }

    handleDonateClick = post => () => {
        this.setState({
            isPaymentOpen: true,
            selectedPayment: post,
        })
    }

    renderMyPosts = () => {
        const { classes, userID } = this.props;
        const { barters } = this.state;

        let userBarters = barters.filter(barter => barter.user.displayName === userID);

        return (
            <div className={classes.marginTheme}>
                <Typography variant='h6' color='primary'>My Posts</Typography>
                <Divider className={classes.marginTheme} />
                <StackGrid columnWidth={350} gutterWidth={20} gutterHeight={20} gridRef={grid => this.grid = grid}>
                    {userBarters.map((post, i) =>
                        <Post key={`post-${i}`}
                            post={post}
                            onEditClick={this.handleEditPostClick}
                            onExpand={this.handlePostExpand}
                            onDonateClick={this.handleDonateClick} />)}
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
        const { barters, selectedTag } = this.state;

        // Get only the posts that were posted within the last 3 days
        const recentPosts = barters.filter(barter => barter.hashtags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase() || !selectedTag))
            .filter(barter => ((new Date()) - (new Date(barter.datePosted))) / 1000 / 60 / 60 / 24 < 3)

        return (
            <div className={classes.marginTheme}>
                <Typography variant='h6' color='primary'>Recent Posts</Typography>
                <Divider className={classes.marginTheme} />
                <StackGrid columnWidth={350} gutterWidth={20} gutterHeight={20} gridRef={grid => this.grid = grid}>
                    {recentPosts.map(post =>
                        <Post
                            post={post}
                            onExpand={this.handlePostExpand}
                            onDonateClick={this.handleDonateClick}
                        />)}
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
                                <MenuItem value='Monetary'>Monetary</MenuItem>
                                <MenuItem value='Commodity'>Commodity</MenuItem>
                                <MenuItem value='Skill'>Skill</MenuItem>
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
                            <Chip key={`hashtag-${i}`} label={hashtag} className={classes.marginTheme} onDelete={this.handleDeleteHashtag(i)} clickable />
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

    renderEditPost = () => {
        const { classes } = this.props;
        const { isEditPostOpen, type, tag, title, description, promise, hashtags } = this.state;

        return (
            <Dialog
                open={isEditPostOpen}
                onClose={this.handleClose}
            >
                <DialogTitle>Edit Post</DialogTitle>
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
                            <TextField id="title" label="Title" defaultValue={title} onBlur={this.handleTextChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formGridItem}>
                            <TextField id='type' label="Type" value={type} onChange={this.handleSelectChange('type')} fullWidth select
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                            >
                                <MenuItem value='Monetary'>Monetary</MenuItem>
                                <MenuItem value='Commodity'>Commodity</MenuItem>
                                <MenuItem value='Skill'>Skill</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={classes.formGridItem}>
                            <TextField id="description" label="Description" defaultValue={description} onBlur={this.handleTextChange} fullWidth multiline />
                        </Grid>


                        {/* Promise */}
                        <Grid item xs={12} className={classes.formGridItem}>
                            <Typography variant='h6'>Promise</Typography>
                            <Typography>A short description of what I promise to any of my benefactors</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.formGridItem}>
                            <TextField id="promise" defaultValue={promise} label="Promise" onBlur={this.handleTextChange} fullWidth />
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
                            <Chip key={`hashtag-${i}`} label={hashtag} className={classes.marginTheme} onDelete={this.handleDeleteHashtag(i)} clickable />
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}> Cancel </Button>
                    <Button onClick={this.handleUpdatePost} color="primary"> Update </Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderPaymentDialog = () => {
        const { classes } = this.props;
        const { isPaymentOpen } = this.state;

        return (
            <Dialog
                open={isPaymentOpen}
                onClose={this.handleClose}
            >
                <DialogTitle>Donate</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Thank you for helping this student out with supporting their way through college. 
                        Your donations mean more than you think they do!
                    </DialogContentText>

                    <Grid container>
                        <Payment onFinish={this.handleClose} onClose={this.handleClose}/>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    renderSnackBar() {
        const { confirmation } = this.state;

        return (
            <SnackBar
                variant={confirmation.variant}
                message={confirmation.message}
                isOpen={confirmation.isOpen}
                onClose={this.handleHideConfirmation}
            />
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div >
                <MenuAppBar title='Homepage' history={this.props.history} />
                <div className={classes.root}>
                    <SearchBar />
                    {this.renderTrendingHashtags()}
                    {this.renderMyPosts()}
                    {this.renderRecentPosts()}
                    {this.renderAddPostDialog()}
                    {this.renderEditPost()}
                    {this.renderAddButton()}
                    {this.renderSnackBar()}
                    {this.renderPaymentDialog()}
                </div>
            </div>
        );
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userID: state.login.userID,
})

export default connect(mapStateToProps, {})(withStyles(styles)(Homepage));