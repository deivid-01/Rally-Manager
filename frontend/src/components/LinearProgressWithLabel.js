import React from "react";
import {Box,LinearProgress} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'; 


const LinearProgressWithLabel = (props)=> {
    return (
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" color ="primary"{...props} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
              props.value,
            )}%`}</Typography>
          </Box>
        </Box>
      );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

export default LinearProgressWithLabel;