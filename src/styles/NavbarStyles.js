// eslint-disable-next-line
export default {
  Navbar: {
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },

  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a":{
      textDecoration: "none",
      color: "black",
      fontFamily: "Roboto",
    }
  },

  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-rail": {
      heigth: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover": {
      backgroundColor: "green",
      outline: "none",
      border: "2px solid green",
      boxShadow: "none",
      width: "14px",
      height: "14px",
      marginLeft: "7px",
    },
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    }
  },
  sliderContainer:{
    display: "flex",
    alignItems: "center",
  },
  selectContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "1rem"
  }
}