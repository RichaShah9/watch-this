import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 150,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  active: {
    background: "#fcbc02",
    width: 460,
    display: "flex",
    flexDirection: "row-reverse",
    padding: 10,
    "& :hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  selectedImage: {
    width: 175,
    height: 260,
    borderRadius: 10,
    border: "3px solid white",
  },
  selectedMain: {
    width: "100%",
  },
  selectedCardContent: {
    padding: 10,
    color: "white",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    height: "100%",
  },
  selectedTitle: {
    whiteSpace: "nowrap",
    textAlign: "left",
    fontWeight: 900,
  },
  selectedDetails: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
    alignItems: "flex-start",
  },
  typography: {
    textAlign: "left",
  },
}));

function SelectedSeriesCard({ tvshow = {}, onSeriesClick, seasons }) {
  const classes = useStyles();

  const getEpisodes = () => {
    if (!seasons) return;
    let totalEpisodes = seasons.reduce(function (prev, cur) {
      return prev + cur.Episodes.length;
    }, 0);
    return totalEpisodes;
  };

  return (
    <Card
      className={classnames(classes.card, classes.active)}
      key={tvshow.imdbID}
      onClick={() => onSeriesClick(tvshow)}
    >
      <div className={classes.imageContainer}>
        <img
          src={tvshow.Poster}
          className={classes.selectedImage}
          alt={tvshow.title}
        />
      </div>
      <div className={classes.selectedMain}>
        <CardContent className={classes.selectedCardContent}>
          <Typography variant="h5" className={classes.selectedTitle}>
            {tvshow.Title}
          </Typography>
          <div className={classes.selectedDetails}>
            <div>
              <Typography className={classes.typography}>
                {tvshow.totalSeasons} Seasons
              </Typography>
              <Typography className={classes.typography}>
                {getEpisodes(tvshow)} Episodes
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <Typography className={classes.typography}>
                  iMDB Rating :
                </Typography>
                <Typography
                  className={classes.typography}
                  style={{ marginLeft: 3 }}
                >
                  {tvshow.imdbRating} / 10
                </Typography>
              </div>
              <Typography className={classes.typography}>
                Go to iMDB Page
              </Typography>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default SelectedSeriesCard;

SelectedSeriesCard.propTypes = {
  tvshow: PropTypes.object.isRequired,
  seasons: PropTypes.array,
  onSeriesClick: PropTypes.func,
};

SelectedSeriesCard.defaultProps = {
  tvshow: {},
  seasons: [],
  onSeriesClick: () => {},
};
