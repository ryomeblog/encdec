import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import CryptoJS from "crypto-js";

const App = () => {
  const [secretKey, setSecretKey] = useState("hogehoge");

  const handleFileUploadEnc = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const encrypted = CryptoJS.AES.encrypt(content, secretKey).toString();
      const fileName = file.name + ".txt";
      downloadFile(encrypted, fileName);
    };
    reader.readAsText(file);
  };

  const handleFileUploadDec = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const decrypted = CryptoJS.AES.decrypt(content, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      const fileName = file.name.replace(".txt", "");
      downloadFile(decrypted, fileName);
    };
    reader.readAsText(file);
  };

  const downloadFile = (content, fileName) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <Typography variant="h4">シークレットキー</Typography>
      <TextField
        label="シークレットキー"
        variant="outlined"
        fullWidth
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        margin="normal"
      />
      <Typography variant="h4">暗号化（anyファイル→.txtファイル）</Typography>
      <input type="file" onChange={handleFileUploadEnc} />
      <Typography variant="h4">復号化（.txtファイル→anyファイル）</Typography>
      <input type="file" onChange={handleFileUploadDec} />
    </div>
  );
};

export default App;
