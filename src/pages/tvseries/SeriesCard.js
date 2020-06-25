import React from "react";
import PropTypes from "prop-types";
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
  main: {
    width: "100%",
    padding: 10,
  },
  poster: {
    width: 130,
    height: 180,
    borderRadius: 10,
    border: "3px solid #FCBC02",
  },
  cardContent: {
    padding: "0px 10px 10px 10px",
    color: "black",
    textAlign: "left",
  },
  imdbRating: {
    fontWeight: 600,
    fontSize: 12,
    whiteSpace: "nowrap",
  },
  details: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

function SeriesCard({ tvshow, onSeriesClick }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      key={tvshow.imdbID}
      onClick={() => onSeriesClick(tvshow)}
    >
      <div className={classes.main}>
        <img
          src={tvshow.Poster}
          className={classes.poster}
          alt={tvshow.title}
        />
      </div>
      <div>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{tvshow.Title}</Typography>
          <div className={classes.details}>
            <Typography className={classes.imdbRating}>
              iMDB Rating :
            </Typography>
            <Typography style={{ fontSize: 12, marginLeft: 3 }}>
              {tvshow.imdbRating} / 10
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default SeriesCard;

SeriesCard.propTypes = {
  tvshow: PropTypes.object.isRequired,
  onSeriesClick: PropTypes.func,
};

SeriesCard.defaultProps = {
  tvshow: {},
  onSeriesClick: () => {},
};
