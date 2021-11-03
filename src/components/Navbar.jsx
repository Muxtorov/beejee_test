import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.task_store.token);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={Link} color="inherit" to={"/"}>
              Tasks
            </Button>
          </Typography>
          {!token ? (
            <Button component={Link} color="inherit" to={"/login"}>
              Log in
            </Button>
          ) : (
            <Button
              component={Link}
              color="inherit"
              to={"/"}
              onClick={() => {
                dispatch({ type: "RESET" });
              }}
            >
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
