import React, { useState, useEffect } from "react";
import moment from "moment";
import classnames from "classnames";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExitToApp,
  WatchLater,
  PersonOutline,
  Search,
  ExpandMore,
} from "@material-ui/icons";

import { TOOLBAR, ROUTES } from "./constants";
import SearchBar from "./components/Search";

const drawerWidth = 70;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#ebebeb",
    boxShadow: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#3b3b3b",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#ebebeb",
    padding: theme.spacing(3),
    height: "100%",
    width: `calc(100% - ${drawerWidth}px)`,
  },
  primaryText: {
    fontSize: 10,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  listItemChild: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#757575",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.only('xs')]: {
      padding: 10,
    },
  },
  title: {
    color: "black",
    fontFamily: "monospace",
  },
  watchLater: {
    color: "#9d9d9d",
    marginRight: 10,
  },
  color: {
    color: "#9d9d9d",
  },
  logoutIcon: {
    transform: "rotate(180deg)",
  },
  container: {
    display: "flex",
  },
}));

export default function WatchThis() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentDate, setDate] = useState(moment());
  const [isHovered, setHovered] = useState(false);
  let history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHover = () => {
    setHovered(false);
  };

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDate(moment());
    }, 1000);
    return () => clearInterval(secTimer);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            Watch<b>This</b>
          </Typography>
          <div className={classes.container}>
            <WatchLater className={classes.watchLater} />
            <Typography variant="h6" className={classes.title}>
              <span className={classes.color}>
                {currentDate.format("DD MMM")}
              </span>
              , <span>{currentDate.format("HH:mm")}</span>
            </Typography>
          </div>
          <div className={classes.container}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ExpandMore />}
              style={{ textTransform: "none" }}
            >
              Richa Shah
            </Button>
            <PersonOutline style={{ color: "black" }} fontSize="large" />
            <Divider
              orientation="vertical"
              flexItem
              style={{ margin: "0px 10px" }}
            />
            {isHovered && <SearchBar handleHover={handleHover} />}
            <Search
              className={classes.color}
              fontSize="large"
              onMouseOver={() => setHovered(true)}
            />
          </div>
        </Toolbar>
        <Divider style={{ margin: "0px 24px" }} />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List className={classes.list}>
          <div>
            {TOOLBAR.map((toolbar) => (
              <ListItem
                button
                key={toolbar.label}
                className={classes.listItem}
                onClick={() => history.push(`/${toolbar.path}`)}
              >
                <ListItemIcon className={classes.listItemChild}>
                  <toolbar.icon
                    fontSize="large"
                    style={{
                      color:
                        history.location.pathname === `/${toolbar.path}`
                          ? "#feb900"
                          : "#757575",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={toolbar.label}
                  className={classes.listItemChild}
                  classes={{
                    primary: classes.primaryText,
                  }}
                  style={{
                    color:
                      history.location.pathname === `/${toolbar.path}`
                        ? "#feb900"
                        : "#757575",
                  }}
                />
              </ListItem>
            ))}
          </div>
          <div>
            <ListItem button key="logout" className={classes.listItem}>
              <ListItemIcon
                className={classnames(
                  classes.listItemChild,
                  classes.logoutIcon
                )}
              >
                <ExitToApp fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                className={classes.listItemChild}
                classes={{
                  primary: classes.primaryText,
                }}
              />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {ROUTES.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={route.main}
            />
          ))}
        </Switch>
      </main>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
