import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
import { getTvSeries, getSeasons } from "../../services";
import { sortByKey, getAverage } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  seriesContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  card: {
    width: 150,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  seasons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "50px 0px",
  },
  season: {
    minWidth: 200,
    margin: 10,
    height: "fit-content",
    padding: 10,
  },
  iMDBLogo: {
    width: 40,
    height: 25,
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
  ratings: {
    textAlign: "left",
    margin: "10px 0px",
    fontWeight: 500,
  },
  seasonTitle: {
    fontWeight: 600,
  },
  seasonBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

function MySeries({ sortBy, seriesType }) {
  const [series, setSeries] = useState(null);
  const [selectedSeries, setSelecteSeries] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const classes = useStyles();

  const onSeriesClick = async (tvshow = {}) => {
    if (tvshow.imdbID === (selectedSeries && selectedSeries.imdbID)) {
      return;
    }
    setSelecteSeries(tvshow);
    const seasons = await getSeasons(tvshow);
    setSeasons(seasons);
  };

  const getEpisodes = () => {
    if (!seasons) return;
    let totalEpisodes = seasons.reduce(function (prev, cur) {
      return prev + cur.Episodes.length;
    }, 0);
    return totalEpisodes;
  };

  const getFilteredSeries = React.useCallback(
    function getFilteredSeries(series) {
      let filteredSeries = [...(series || [])];
      switch (sortBy) {
        case "alphabetically":
          filteredSeries = sortByKey(filteredSeries, "Title", false);
          return filteredSeries;
        case "alphabeticallyReverse":
          filteredSeries = filteredSeries = sortByKey(
            filteredSeries,
            "Title",
            false,
            "reverse"
          );
          return filteredSeries;
        case "ratings":
          filteredSeries = filteredSeries = sortByKey(
            filteredSeries,
            "imdbRating",
            true,
            "reverse"
          );
          return filteredSeries;
        case "ratingsReverse":
          filteredSeries = filteredSeries = sortByKey(
            filteredSeries,
            "imdbRating",
            true
          );
          return filteredSeries;
        default:
          return filteredSeries;
      }
    },
    [sortBy]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const series = await getTvSeries(seriesType);
      if (series.length <= 0) return;
      let filteredSeries = getFilteredSeries(series);
      setSeries(filteredSeries);
      const seasons = await getSeasons(series[0]);
      setSelecteSeries(series[0]);
      setSeasons(seasons);
      setLoading(false);
    })();
  }, [getFilteredSeries, seriesType]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.root}>
          <div className={classes.seriesContainer}>
            {series &&
              series.map((tvshow) =>
                selectedSeries && selectedSeries.imdbID === tvshow.imdbID ? (
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
                        <Typography
                          variant="h5"
                          className={classes.selectedTitle}
                        >
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
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
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
                ) : (
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
                )
              )}
          </div>
          <div className={classes.seasons}>
            {seasons &&
              seasons.map((season) => (
                <Card key={season.Season} className={classes.season}>
                  <CardContent style={{ padding: 10 }}>
                    <div className={classes.seasonBlock}>
                      <Typography className={classes.seasonTitle} variant="h6">
                        Season {season.Season}
                      </Typography>
                      <CardMedia
                        className={classes.iMDBLogo}
                        image="https://i.ya-webdesign.com/images/transparent-imbd-ico-5.png"
                        title="iMDB"
                      />
                    </div>
                    <Typography className={classes.ratings}>Rating:</Typography>
                    <CircularProgressWithLabel value={getAverage(season)} />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MySeries;
