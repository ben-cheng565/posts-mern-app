import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, blue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 50px",
    backgroundColor: blue[300],
  },
  heading: {
    flexGrow: 1,
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: theme.palette.getContrastText(blue[200]),
  },
}));
