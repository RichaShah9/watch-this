import React from "react";
import PropTypes from 'prop-types';

import { CircularProgress, Box, Typography } from "@material-ui/core";

export default function CircularProgressWithLabel({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        value={value * 10}
        thickness={3}
        size="5rem"
        style={{ color: "#FEB900" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="textSecondary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.string.isRequired,
};
