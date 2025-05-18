import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GalleryPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/items/").then((res) => {
      setItems(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Step 2: View Uploaded Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{ margin: 10, cursor: "pointer" }}
            onClick={() => navigate(`/image/${item.id}`)}
          >
            <img
              src={`http://localhost:8000/${item.file_path}`}
              alt={item.filename}
              width={150}
              height={150}
              style={{ objectFit: "cover", border: "1px solid #ccc" }}
            />
            <div style={{ textAlign: "center", marginTop: 5 }}>
              {item.filename}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
