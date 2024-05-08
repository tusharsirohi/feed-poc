import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { MenuItem, Select } from "@mui/material";

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

export default function AddCamModal({ open, handleClose, sendDataToParent }) {
  const [formData, setFormData] = React.useState({
    topic: "none",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addOnclick = () => {
    if (!formData.topic || formData.topic ==="none" || !formData.location) {
      return;
    }

    sendDataToParent(formData);
    setFormData({ topic: "", location: "" });
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
                New Camera:
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Select
                style={{ width: "100%" }}
                id="topic"
                name="topic"
                label="Topic"
                variant="filled"
                value={formData.topic ?? ""}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} label="Filter" />
                )}
              >
                <MenuItem 
                value={"none"} selected disabled  >
                  Select Topic
                </MenuItem>
                <MenuItem value={"Zone_1"}>PPE_detection</MenuItem>
                <MenuItem value={"Zone_3"}>Fire_detection</MenuItem>
              </Select>
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
              <Button variant="contained" onClick={addOnclick}>
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

const Zoneslist = [
  { title: "PPE_detection", mqtt_topic: "Zone_1" },
  { title: "Fire_detection", mqtt_topic: "Zone_2" },
];
