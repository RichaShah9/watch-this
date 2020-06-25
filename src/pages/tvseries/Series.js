import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SeriesCard from "./SeriesCard";
import SelectedSeriesCard from "./SelectedSeriesCard";
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
    [theme.breakpoints.only("xs")]: {
     width: "100%"
    },
  },
  iMDBLogo: {
    width: 40,
    height: 25,
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
                  <SelectedSeriesCard
                    key={tvshow.imdbID}
                    tvshow={tvshow}
                    seasons={seasons}
                    onSeriesClick={onSeriesClick}
                  />
                ) : (
                  <SeriesCard
                    key={tvshow.imdbID}
                    tvshow={tvshow}
                    onSeriesClick={onSeriesClick}
                  />
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
