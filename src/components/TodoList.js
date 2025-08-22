import Todo from "./Todo";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useMemo,useReducer } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTodos } from "../Context/TodosContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useToast } from "../Context/ToastContext";
import TodosReducer from "../Reducers/TodosReducer";

//for button
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TodoList() {
  const {Todos, dispatch} = useTodos();
  const [dispalyTodosType, setDisplayTodosType] = useState("all");
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdatedDialog, setShowUpdatedDialog] = useState(false);
  const [todoOpenDialogToConfirm, setTodoOpenDialogToConfirm] = useState("");
  const {showHideToast} = useToast();
  
  


  // filtrition arrays
  const completedTodos = useMemo(() => {
    return Todos.filter((t) => {
      return t.isCompleted;
    });
  },[Todos]);

  const notCompletedTodos = useMemo(()=>{
    return (Todos.filter((t) => {
    return !t.isCompleted;
  }))
  },[Todos])
    

  let todosToBeRender = Todos;

  if (dispalyTodosType == "completed") {
    todosToBeRender = completedTodos;
  } else if (dispalyTodosType == "not-yet") {
    todosToBeRender = notCompletedTodos;
  } else {
    todosToBeRender = Todos;
  }

  
  // filtrition arrays

  const todosmap = todosToBeRender.map((t) => {
    return <Todo key={t.id} todo={t} TransferDeleteIconId={openDeleteDialog} transferUpdateIconId={openUpdateDialog}/>;
  });

  function changeDisplayType(e) {
    setDisplayTodosType(e.target.value);
  }

  // functions of hundle

  function handleAddClick() {
    dispatch({type:"added",pyload:{title:titleInput,details:detailsInput}})
    setTitleInput("");
    setDetailsInput("");
    showHideToast("Added successfully !")
  }

  
  ////////////////////////////////

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }
  
  function openDeleteDialog(todo){
    setShowDeleteDialog(true)
    setTodoOpenDialogToConfirm({...todo})
  }

  function handleDeleteConfirm() {
    dispatch({type:"deleted",pyload:todoOpenDialogToConfirm})
    setShowDeleteDialog(false)
    showHideToast("Deleted successfully !")
  }
  /////////////////////////
  function openUpdateDialog(todo){
    setShowUpdatedDialog(true);
    setTodoOpenDialogToConfirm({...todo})
  }

  function handleUpdateClose() {
    setShowUpdatedDialog(false);
  }

  function handleUpdatedConfirm() {
    dispatch({type:"updated",pyload:todoOpenDialogToConfirm})
    setShowUpdatedDialog(false);
    showHideToast("Updated successfully !")
  }

  ////////////////////////
  useEffect(() => {
    dispatch({type:"get"});}, []);
  
  return (
    <>
    {/* delete dialoge */}
      <Dialog
        onClose={handleDeleteClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to permanently delete this. You won’t be able to
            recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteClose}>
            close
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            style={{ background: "red" }}
            autoFocus
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialoge */}

      {/* updatedTodos dialog */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdatedDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"UPDATE TODO"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="Title"
            label="The title of todo"
            fullWidth
            variant="standard"
            value={todoOpenDialogToConfirm.Title}
            onChange={(e) => {
              setTodoOpenDialogToConfirm({ ...todoOpenDialogToConfirm, Title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="Details"
            label="The details of todo"
            fullWidth
            variant="standard"
            value={todoOpenDialogToConfirm.detail}
            onChange={(e) => {
              setTodoOpenDialogToConfirm({ ...todoOpenDialogToConfirm, detail: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleUpdateClose}>
            close
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdatedConfirm}
            style={{ background: "red" }}
            autoFocus
          >
            confirme
          </Button>
        </DialogActions>
      </Dialog>
      {/* updated todos */}

    <Container maxWidth="md">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "90vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h2" sx={{ color: "#123" }}>
            Dino store
          </Typography>
          <hr></hr>
        </CardContent>

        {/* toggle button */}
        <ToggleButtonGroup
          style={{ marginBottom: "10px" }}
          value={dispalyTodosType}
          exclusive
          onChange={changeDisplayType}
          aria-label="text alignment"
        >
          <ToggleButton
            style={{ color: "black" }}
            value="all"
            aria-label="left aligned"
          >
            All
          </ToggleButton>
          <ToggleButton
            style={{ color: "black" }}
            value="not-yet"
            aria-label="centered"
          >
            not yet
          </ToggleButton>
          <ToggleButton
            style={{ color: "black" }}
            value="completed"
            aria-label="right aligned"
          >
            completed
          </ToggleButton>
        </ToggleButtonGroup>
        {/* toggle button */}

        <CardContent>
          {/* all todos */}
          {todosmap}
          {/* all todos */}

          {/* input and add */}
          <Grid container spacing={2} style={{ marginTop: "30px" }}>
            <Grid size={4}>
              <div style={{ height: "80%", border: "solid 2px #6f85ce" }}>
                Add a new product <ArrowForwardIcon />
              </div>
            </Grid>
            <Grid size={8}>
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                id="outlined-basic"
                style={{ width: "100%" }}
                label="Title of prodcut"
                variant="outlined"
              />
            </Grid>

            <Grid size={4}>
              <Button
                disabled={titleInput.length <= 0 || detailsInput.length <= 0}
                onClick={handleAddClick}
                className="gridBut"
                style={{
                  background: "#5376ea",
                  height: "100%",
                  width: "100%",
                  float: "left",
                }}
                variant="contained"
              >
                {" "}
                Add the new article{" "}
                <AddToPhotosIcon style={{ marginLeft: "3px" }} />
              </Button>
            </Grid>
            <Grid size={8}>
              <TextField
                value={detailsInput}
                onChange={(e) => {
                  setDetailsInput(e.target.value);
                }}
                id="outlined-basic"
                style={{ width: "100%" }}
                label="The details of prodcut"
                variant="outlined"
              />
            </Grid>
          </Grid>
          {/* input and add */}
        </CardContent>
      </Card>
    </Container>
    </>
  );
}
