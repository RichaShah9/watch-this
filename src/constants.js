import React from "react";
import { Home, OndemandVideo, Theaters } from "@material-ui/icons";
import HomePage from "./pages/home/Home";
import Movie from "./pages/movie/Movie";
import TVSeries from "./pages/tvseries/TVSeries";

export const TOOLBAR = [
  { label: "Home", icon: Home, path: "" },
  { label: "TV Series", icon: OndemandVideo, path: "tvseries" },
  { label: "Movies", icon: Theaters, path: "movie" },
];

export const ROUTES = [
  {
    path: "/",
    exact: true,
    main: <HomePage />,
  },
  {
    path: "/tvseries",
    exact: true,
    main: <TVSeries />,
  },
  {
    path: "/movie",
    exact: true,
    main: <Movie />,
  },
];

export const MY_TVSERIES = ["Game of Thrones", "Archer", "Mr. Robot"];

export const POPULAR_TVSERIES = [
  "Friends",
  "The Office",
  "Suits",
  "Money Heist",
  "Sacred Games",
];

export const SORT_ITEMS = [
  { label: "Sort Alphabetically(A-Z)", value: "alphabetically" },
  { label: "Sort Alphabetically(Z-A)", value: "alphabeticallyReverse" },
  { label: "Ratings(High to low)", value: "ratings" },
  { label: "Ratings(Low to high)", value: "ratingsReverse" },
];
