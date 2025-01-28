import React, { useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./TextBox.css";

const FullWidthTextField = () => {
  const [url, setUrl] = useState("");
  const [btnText, setBtnText] = useState("Shorten");
  const [customText, setCustomText] = useState(""); // For custom alias

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set loading state for UI
    setUrl("Loading...");

    // Construct the request URL for is.gd API
    let apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
    if (customText) {
      apiUrl += `&shorturl=${encodeURIComponent(customText)}`;
    }

    // Make the API request
    axios
      .get(apiUrl)
      .then((response) => {
        // On success, set the shortened URL
        setUrl(response.data);
        setBtnText("Copy To Clipboard");
      })
      .catch((error) => {
        // On error, show alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid URL! Please check the URL and try again.",
        });
        setUrl(""); // Reset URL field on error
      });
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (e.target.value !== url) {
      setBtnText("Shorten");
    }
  };

  const handleCustomTextChange = (e) => {
    setCustomText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setBtnText("Copied!");
  };

  return (
    <Box className="text-box-container">
      <TextField
        className="url-area"
        fullWidth
        id="fullWidth"
        value={url}
        onChange={handleChange}
        placeholder="Paste long url and shorten it"
        size="small"
        helperText="Ex: http://example.com/"
        sx={{
          [`& fieldset`]: {
            borderRadius: 50,
          },
        }}
      />
      <TextField
        className="custom-text-field"
        fullWidth
        id="customText"
        value={customText}
        onChange={handleCustomTextChange}
        placeholder="Custom alias (optional)"
        size="small"
        sx={{
          [`& fieldset`]: {
            borderRadius: 50,
          },
        }}
      />
      <Box className="btn-box">
        <Button
          className="btn"
          onClick={handleSubmit}
          variant="contained"
          style={{
            borderRadius: 50,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          {btnText}
        </Button>
      </Box>
      {url && btnText === "Copy To Clipboard" && (
        <Box className="copy-box">
          <Button
            className="btn"
            onClick={handleCopy}
            variant="contained"
            style={{
              borderRadius: 50,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            Copy To Clipboard
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FullWidthTextField;
