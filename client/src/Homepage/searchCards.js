import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Badge, Fab, Button, View } from "@material-ui/core";
import { Done, AttachMoney } from "@material-ui/icons";
import NavigationIcon from '@material-ui/icons/Navigation';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';




const styles = theme => ({
  card: {
    minWidth: 300,
    maxWidth: 400,
    minHeight: 250,
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: 'right',
  },
  expand: {
    transform: "rotate(0deg)",
    margin: "auto 0",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500],
  },
  fullfilled: {
    margin: "auto 0",
    marginLeft: "80%",
    flex: 1
  },
  title: {
    flex: 1
  },
  badge: {
    margin: 15,
    },
  badgeAvatar: {
    top: 26,
    right: 26,
  }, 
  extendedIcon: {
    marginRight: theme.spacing.unit,
    color: '#000000',
  },
  fab:  {
    marginLeft: '30%',
    margin: 10,
  },
  checkMark: {
    backgroundColor: '#66bb6a',
  },
});

class Post extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  render() {
    const { classes, post, bitmoji, displayName } = this.props;
    const { expanded } = this.state;

    console.log(post);

    return (
      <Badge
        className={classes.badge}
        classes={{ badge: classes.badgeAvatar }}
        badgeContent={
            <Avatar className={classes.checkMark}>
            <Done />
          </Avatar>
        }
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                <img src={bitmoji}></img>
              </Avatar>
            }
            title={displayName} //user.displayName
            subheader={post.request.type}
          />
          <CardContent className={classes.title}>
            <Typography>{post.request.title}</Typography>
            <Typography component="p">
              {post.request.description},
            </Typography>
          </CardContent>
          <CardContent>
            {post.hashtags.map((hashtag,i) => (
                <Chip key={`hashtag-${i}`} label={hashtag} className={classes.chip} variant="outlined" /> 
             ) )}
            </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Typography>{expanded ? 'View Less' : 'View More'}</Typography>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {post.request.description}
              </Typography>
              <Typography paragraph>
                {post.promise}
              </Typography>
              <Typography paragraph>
                {post.datePosted}
              </Typography>
              <Typography paragraph>
                {post.dateEnd}
              </Typography>
              <Fab color="secondary" variant="extended" aria-label="Delete" className={classes.fab}>
                <AttachMoney className={classes.extendedIcon} />
                Donate
              </Fab>
            </CardContent>
          </Collapse>
        </Card>
      </Badge>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired, 
  post: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({ bitmoji: state.login.bitmoji, userID: state.login.userID, displayName: state.login.displayName })
export default connect(mapStateToProps, {})(withStyles(styles)(Post));
