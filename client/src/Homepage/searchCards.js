import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import { Badge, Fab, Button, Grid } from "@material-ui/core";
import { Done, AttachMoney } from "@material-ui/icons";
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import defaultStyles from '../Theme/styles';




const styles = theme => ({
  ...defaultStyles(theme),
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
  fab: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  checkMark: {
    backgroundColor: '#66bb6a',
  },
  bitmoji: {
    width: 40,
    height: 40,
  },
  paddingSideTheme2: {
    padding: '0 16px',
  }
});

class Post extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    const { onExpand } = this.props;

    this.setState(state => ({ expanded: !state.expanded }));
    onExpand();
  };

  render() {
    const { classes, post, bitmoji, onEditClick, onDonateClick } = this.props;

    return (
      <Badge
        className={classes.badge}
        classes={{ badge: classes.badgeAvatar }}
        badgeContent={
          post.isFulfilled
            ? <Avatar className={classes.checkMark}>
              <Done />
            </Avatar>
            : null
        }
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar className={classes.avatar}>
              <img src={post.user.bitmoji} className={classes.bitmoji}></img>
            </Avatar>
            }
            title={post.user.fullName}
            subheader={post.request.type}
          />
          <CardContent className={classes.title}>
            <Typography variant='h6'>{post.request.title}</Typography>
            <Typography component="p">
              {post.request.description}
            </Typography>
          </CardContent>
          <CardContent className={classes.paddingSideTheme2}>
            {post.hashtags.map((hashtag, i) => (
              <Chip key={`hashtag-${i}`} label={hashtag} className={classes.marginTheme} />
            ))}
          </CardContent>
          <CardContent>
            {/* Promise */}
            <Typography variant='h6' className={classes.bold}>Promise</Typography>
            <Typography gutterBottom> {post.promise} </Typography>

            {/* Donators */}
           
              {
                // If there are no donators, then show that they should be the first to donate
                post.received.length !== 0 
                ? (
                  <React.Fragment>
                    <Typography variant='h6' className={classes.bold}>Donators</Typography>
                    <Grid container>
                      {post.received.map(user => (
                        <React.Fragment>
                          <Grid item xs={3} className={classes.formGridItem}>
                            <Avatar className={classes.avatar}>
                              <img src={user.bitmoji} className={classes.bitmoji}></img>
                            </Avatar>
                          </Grid>
                          <Grid item xs={9} className={classes.formGridItem}>
                          <Typography className={classes.bold}>{user.fullName}</Typography>
                          <Typography >{user.comment}</Typography>
                        </Grid>
                      </React.Fragment>
                      ))}
                    </Grid>
                  </React.Fragment>
                ): <Typography variant='h6' className={classes.bold}>Be the first to donate! </Typography>
              }

            <Typography gutterBottom className={classes.formGridItem}>{`Posted ${post.datePosted}`}</Typography>

            <Fab color="secondary" variant="extended" aria-label="Delete" className={classes.fab} onClick={onDonateClick(post)}>
              <AttachMoney className={classes.extendedIcon} />
              Donate
              </Fab>

            {
              // Conditionally show the edit button if the current user is the one who posted this 
              onEditClick
                ? <div classname={classes.buttonGroupRight}>
                  <Button color='primary' onClick={onEditClick(post)} className={classes.button}>Edit</Button>
                </div>
                : null
            }
          </CardContent>
        </Card>
      </Badge>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  onEditClick: PropTypes.func,
  onExpand: PropTypes.func.isRequired,
  onDonateClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ bitmoji: state.login.bitmoji, userID: state.login.userID, displayName: state.login.displayName })
export default connect(mapStateToProps, {})(withStyles(styles)(Post));
