import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useHistory } from "react-router";
import axios from "axios";
import { Grid } from "@mui/material";

const theme = createTheme();

const AddTask = () => {
  const history = useHistory();

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (event) => {
    if (validateEmail(event.target.email.value)) {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      axios
        .post(
          `https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${process.env.REACT_APP_DEVELOPER_NAME}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.status === "ok") {
            alert("task added");
            history.push({ pathname: "/" });
          }
        });
    } else {
      alert("error");
    }
  };

  const handleClose = () => {
    history.push({ pathname: "/" });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6">
            Add task
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
            />
            <TextField
              multiline={true}
              margin="normal"
              required
              fullWidth
              minRows="3"
              maxRows="5"
              name="text"
              label="text"
              type="text"
              id="text"
              autoComplete="text"
            />
            <Grid container>
              <Grid item xs>
                <Button
                  onClick={handleClose}
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
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add task
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddTask;
