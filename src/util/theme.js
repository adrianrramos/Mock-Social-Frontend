const globalTheme = {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00acee ",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  form: {
    textAlign: "center",
  },
  pageTitle: {
    marginBottom: 10,
  },
  imgLogo: {
    width: 100,
    height: "auto",
    margin: "30px auto",
  },
  // DIALOGS
  submitForm: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  textFeild: {
    margin: "10px auto",
    width: "100%",
  },
  textRow: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: "20px auto",
    textAlign: "center",
  },
  customError: {
    color: "red",
  },
  progress: {},
  hrVisible: {
    width: "100%",
    marginBottom: "4px ",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
  deleteButton: {
    marginRight: "30px",
  },
  // PROFILE STYLING
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: "50%",
    margin: 10,
    textAlign: "center",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  profileButtons: {
    margin: "10px auto",
    height: 35,
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
  },
  profileBottomButtons: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
  },
  loginSignup: {
    borderRadius: 20,
  },
  paperNoAuth: {
    height: 150,
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
  },
  noAuthTitle: {
    height: "50%",
  },
  paper: {
    padding: 30,
  },
};

export default globalTheme;
