import React, { useState } from "react";
import axios from "axios";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("default");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:8000/api/uploadfile/", formData, {
      params: { mode },
    });

    setResponse(JSON.stringify(res.data, null, 2));
  };

  return (
    <div>
      <h2>Step 1: Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="default">Default</option>
          <option value="romantic">Romantic</option>
          <option value="historical">Historical</option>
          <option value="journalistic">Journalistic</option>
        </select>
        <button type="submit">Upload</button>
      </form>
      <pre>{response}</pre>
    </div>
  );
}

export default UploadPage;
