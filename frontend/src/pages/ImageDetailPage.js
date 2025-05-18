import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ImageDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/items/${id}`).then((res) => {
      setItem(res.data);
    });
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>Step 3: Image Detail</h2>
      <img
        src={`http://localhost:8000/${item.file_path}`}
        alt={item.filename}
        style={{ maxWidth: "100%", border: "1px solid #ccc" }}
      />
      <p><strong>Filename:</strong> {item.filename}</p>
      <p><strong>Datetime:</strong> {item.datetime}</p>
      <p><strong>Latitude:</strong> {item.latitude}</p>
      <p><strong>Longitude:</strong> {item.longitude}</p>
      <p><strong>Caption:</strong> {item.description_text}</p>
    </div>
  );
}

export default ImageDetailPage;
