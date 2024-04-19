import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateCam({ open, selectedZone, handleClose, handleUpdate }) {
  const [formData, setFormData] = useState({ topic: "", location: "" });

  useEffect(() => {
    if (selectedZone) {
      setFormData(selectedZone);
    }
  }, [selectedZone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    handleUpdate(formData); 
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Grid
            sx={style}
            container
            spacing={1}
            justifyContent={"space-around"}
          >
            <Grid item md={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Camera:
              </Typography>
            </Grid>
            <Grid item md={6}>
              <TextField
                id="topic"
                name="topic"
                label="Topic"
                variant="filled"
                value={formData.topic}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="location"
                name="location"
                label="Location"
                variant="filled"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleUpdateClick}>
                Update
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
