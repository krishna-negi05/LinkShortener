import React, { useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./TextBox.css";

const FullWidthTextField = () => {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");  // New state to store the custom alias
  const [btnText, setBtnText] = useState("Shorten");

  const baseUrl = "https://kutt.it/api/v2/url/shorten";  // Kutt API endpoint
  const apiKey = "0NSPhqR565usGHPVMAiiSAFgMDDZPE0jjOMF8ymf";  // Your Kutt API key

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl("Loading...");
    if (btnText === "Copy To Clipboard") {
      navigator.clipboard.writeText(url);
      setBtnText("Copied!");
      setUrl(url);
    } else {
      // Ensure the URL starts with http:// or https://
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid URL that starts with 'http://' or 'https://'.",
        });
        setUrl("");
        return;
      }

      // Prepare the payload for the API request
      const requestData = {
        target: url,
      };

      // Add custom alias if provided
      if (alias) {
        requestData.alias = alias;
      }

      // Make a POST request to Kutt API
      axios
        .post(baseUrl, requestData, {
          headers: {
            'X-API-KEY': apiKey,  // Add your API key in the header
          },
        })
        .then((response) => {
          // Handle success
          setUrl(response.data.shortUrl);  // Get the shortened URL
          setBtnText("Copy To Clipboard");
        })
        .catch(function (error) {
          // Handle error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later.",
          });
          setUrl("");  // Reset URL if there's an error
        });
    }
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (e.target.value !== url) {
      setBtnText("Shorten");
    }
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);  // Handle custom alias input
  };

  return (
    <Box className="text-box-container">
      <TextField
        className="url-area"
        fullWidth
        id="fullWidth"
        value={url}
        onChange={handleChange}
        placeholder="Paste long URL and shorten it"
        size="small"
        helperText="Ex: http://example.com/"
        sx={{
          [`& fieldset`]: {
            borderRadius: 50,
          },
        }}
      />
      <TextField
        className="url-area"
        fullWidth
        id="alias"
        value={alias}
        onChange={handleAliasChange}
        placeholder="Enter custom alias (optional)"
        size="small"
        helperText="Ex: example or custom-alias"
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
    </Box>
  );
};

export default FullWidthTextField;
