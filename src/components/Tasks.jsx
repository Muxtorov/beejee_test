import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Pagination, Stack } from "@mui/material";
import { useHistory } from "react-router";
import ModalComponent from "./ModalComponent";

const headCells = [
  {
    id: "id",
    sort: true,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "username",
    sort: true,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "eMail",
    sort: true,
    disablePadding: false,
    label: "E-mail",
  },
  {
    id: "text",
    sort: false,
    disablePadding: false,
    label: "Text",
  },
  {
    id: "status",
    sort: true,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const token = useSelector((state) => state.task_store.token);
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
        {token ? (
          <TableCell align={"center"} padding={"normal"}>
            Action
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
        align={"center"}
      >
        Tasks
      </Typography>
    </Toolbar>
  );
};

const Tasks = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const history = useHistory();
  const [totalTasks, setTotalTasks] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(0);
  const { apiUrl, token } = useSelector((state) => state.task_store);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios
      .get(
        apiUrl +
          `?developer=${process.env.REACT_APP_DEVELOPER_NAME}&page=${page}&sort_field=${orderBy}&sort_direction=${order}`
      )
      .then((res) => {
        setData(res.data.message.tasks);
        setTotalTasks(res.data.message.total_task_count * 1);
      });
  }, [apiUrl, page, orderBy, order, open]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (e, page) => {
    setPage(page);
  };

  const checkStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <Button color="warning" variant="contained">
            задача не выполнена
          </Button>
        );
      case 1:
        return (
          <Button color="secondary" variant="contained">
            задача не выполнена, отредактирована админом
          </Button>
        );

      case 10:
        return (
          <Button color="primary" variant="contained">
            задача выполнена
          </Button>
        );

      case 11:
        return (
          <Button color="success" variant="contained">
            задача отредактирована админом и выполнена
          </Button>
        );

      default:
        break;
    }
  };
  const handleEdit = (data) => {
    handleOpen();
    setItem(data);
  };

  const AddTaskButton = () => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          align={"right"}
        >
          <Button
            variant="outlined"
            onClick={() => history.push({ pathname: "/addtask" })}
          >
            Add Task
          </Button>
        </Typography>
      </Toolbar>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddTaskButton />
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: 5,
          bgcolor: "background.paper",
        }}
      >
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${index + 1} `}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="center"
                    >
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.text}</TableCell>
                    <TableCell align="center">
                      {checkStatus(row.status)}
                    </TableCell>
                    {token ? (
                      <TableCell align="center">
                        <EditIcon
                          sx={{
                            cursor: "pointer",
                          }}
                          color="primary"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </EditIcon>
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={3}>
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
            count={Math.ceil(totalTasks / 3)}
            shape="rounded"
            color="primary"
            onChange={handleChangePage}
          />
        </Stack>
      </Paper>
      <ModalComponent
        open={open}
        onClose={handleClose}
        item={item}
        handleClose={handleClose}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default Tasks;
