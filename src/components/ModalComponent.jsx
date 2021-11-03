import Modal from "@mui/material/Modal";
import React from "react";
import {
  Button,
  Checkbox,
  Container,
  createTheme,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import axios from "axios";
import { useSelector } from "react-redux";

const theme = createTheme();

const ModalComponent = ({ open, item, handleClose, setOpen }) => {
  const [checked, setChecked] = React.useState(false);

  const { apiUrl, token } = useSelector((state) => state.task_store);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {};
    if (event.target.text.value !== item.text) {
      if (checked) {
        data = { text: event.target.text.value, status: 11 };
      } else {
        data = { text: event.target.text.value, status: 1 };
      }
    } else {
      if (checked) {
        data = { text: event.target.text.value, status: 10 };
      } else {
        handleClose(true);
      }
    }

    const bodyFormData = new FormData();
    bodyFormData.set("status", data.status);
    bodyFormData.set("text", data.text);
    bodyFormData.set("token", token);

    axios
      .post(
        `${apiUrl}edit/${item.id}?developer=${process.env.REACT_APP_DEVELOPER_NAME}`,
        bodyFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setChecked(false);
        handleClose(true);
      });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const ModalBox = (
    <div
      style={{
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%,   -50%)`,
        position: "absolute",
        width: 350,

        backgroundColor: "#fff",
        color: "#000",
        padding: "40px",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h6">
              Edit task
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                multiline={true}
                margin="normal"
                required
                fullWidth
                name="text"
                label="text"
                type="text"
                id="text"
                minRows="3"
                maxRows="5"
                autoComplete="text"
                defaultValue={item.text}
              />

              <Typography component="h1" variant="h6" align="center">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Done
              </Typography>
              <Grid container>
                <Grid item xs>
                  <Button
                    onClick={() => handleClose(true)}
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Edit task
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {ModalBox}
    </Modal>
  );
};
export default ModalComponent;
