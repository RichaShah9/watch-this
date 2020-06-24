import React from "react";
import { Tabs, Tab, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Series from "./Series";
import { SORT_ITEMS, MY_TVSERIES, POPULAR_TVSERIES } from "../../constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    padding: "10px 25px",
  },
  indicator: {
    background: "#EBEBEB",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px",
    flexWrap: "wrap",
    [theme.breakpoints.only('xs')]: {
      padding: 10,
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
  },
  leftBar: { display: "flex", alignItems: "center" },
  sortBy: {
    marginRight: 20,
    color: "gray",
  },
}));

function TVSeries() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const [sortBy, setSortBy] = React.useState("ratings");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.container}>
        <div>
          <Tabs
            value={value}
            classes={{
              indicator: classes.indicator,
            }}
            onChange={handleTabChange}
          >
            <Tab
              label="My Series"
              className={classes.tab}
              style={{
                background: value === 0 ? "#fcbc02" : "inherit",
              }}
            />
            <Tab
              label="Popular"
              className={classes.tab}
              style={{
                background: value === 1 ? "#fcbc02" : "inherit",
              }}
            />
          </Tabs>
        </div>
        <div className={classes.leftBar}>
          <Typography className={classes.sortBy}>Sort By</Typography>
          <Select
            native
            value={sortBy}
            onChange={handleChange}
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
            variant="outlined"
            classes={{
              select: classes.select,
            }}
          >
            {SORT_ITEMS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Series
        sortBy={sortBy}
        seriesType={value === 0 ? MY_TVSERIES : POPULAR_TVSERIES}
      />
    </div>
  );
}

export default TVSeries;
