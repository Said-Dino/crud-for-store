import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import icons from "@mui/material/Icon";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TodosProvider, useTodos } from "../Context/TodosContext";
import TextField from "@mui/material/TextField";
import { useToast } from "../Context/ToastContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Todo({ todo, TransferDeleteIconId, transferUpdateIconId}) {
  const {Todos, dispatch} = useTodos();
  const {showHideToast} = useToast();
  
  

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  function handleChekClickChild() {
    dispatch({type:"check",pyload:todo})
    showHideToast('Updated successfully !')
  }

  function handleDeleteClick() {
    TransferDeleteIconId(todo)
  }

  function handleUpdatedClick() {
    transferUpdateIconId(todo)
  }

    

  return (
    <>
      <Card sx={{ minWidth: 275, background: "#5376ea", marginTop: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                gutterBottom
                variant="h4"
                sx={{
                  textAlign: "left",
                  color: "white",
                  marginLeft: 2,
                  marginTop: 1,
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  textAlign: "left",
                  color: "white",
                  marginLeft: 2,
                  marginTop: 1,
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              size={4}
            >
              {/* icons */}
              <IconButton
                onClick={handleChekClickChild}
                className="IconButt"
                style={{
                  background: todo.isCompleted ? "white" : "white",
                  color: todo.isCompleted ? "teal" : "gray",
                }}
                aria-label="delete"
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdatedClick}
                className="IconButt"
                style={{ background: "white", color: "brown" }}
                aria-label="delete"
              >
                <CreateIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="IconButt"
                style={{ background: "white", color: "red" }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              {/* icons */}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
