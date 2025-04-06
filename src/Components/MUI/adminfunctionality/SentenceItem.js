import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SentenceItem = ({ sentence ,onDoubleClick}) => {
  return (
    <Box
    onDoubleClick={onDoubleClick}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9"
      }}
    >
      {/* Left Part: Sentence */}
      <Typography variant="body1"  >
        {sentence}
      </Typography>

      {/* Right Part: Icons */}
      <Box display="flex" alignItems="center">
        <IconButton>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton>
          <ArrowForwardIcon color="secondary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SentenceItem;
