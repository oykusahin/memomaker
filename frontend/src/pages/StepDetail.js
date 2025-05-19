import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const StepDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/items/${id}`).then((res) => {
      setItem(res.data);
    });
  }, [id]);

  if (!item) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h5">Image Metadata</Typography>
      <img
        src={`http://localhost:8000/storage/${item.filename}`}
        alt={item.filename}
        style={{ width: "100%", maxWidth: 600, marginTop: 20 }}
      />
      <Typography><strong>Datetime:</strong> {item.datetime}</Typography>
      <Typography><strong>Latitude:</strong> {item.latitude}</Typography>
      <Typography><strong>Longitude:</strong> {item.longitude}</Typography>
      <Typography><strong>Caption:</strong> {item.description_text}</Typography>
    </Box>
  );
};

export default StepDetail;
