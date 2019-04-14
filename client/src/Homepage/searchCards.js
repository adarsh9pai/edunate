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




const styles = theme => ({
  card: {
    minWidth: 300,
    maxWidth: 400
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
    backgroundColor: red[500]
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
});

class Post extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <Badge
        className={classes.badge}
        classes={{ badge: classes.badgeAvatar }}
        badgeContent={
          <Avatar>
            <Done />
          </Avatar>
        }
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                bit
              </Avatar>
            }
            title="name" //user.displayName
            subheader="type" //request.type[]
          />
          <CardContent className={classes.title}>
            <Typography>Title</Typography>
            <Typography component="p">
              request.title {/*user.title*/},
            </Typography>
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
                request.description {/*user.description*/},
              </Typography>
              <Typography paragraph>
                promise {/*user.description*/},
              </Typography>
              <Typography paragraph>
                request.datePosted {/*request.datePosted*/},
              </Typography>
              <Typography paragraph>
                request.dateEnd {/*request.dateEnd*/},
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
