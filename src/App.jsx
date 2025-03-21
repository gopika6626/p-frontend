import { useState } from "react";
import axios from "axios";
import './App.css'


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/extract-text/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExtractedText(response.data.text);
      navigator.clipboard.writeText(response.data.text); // Copy to clipboard
      alert("Text copied to clipboard!");
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Failed to extract text.");
    }
  };

  return (
    <div style={{display:"flex"}}>
      <h2 style = {{color:"white",position:"absolute",top:"10%",left:"43%",fontSize:"80px"}}>Scan!</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{display:"flex",position:"absolute",left:"30%"}} />
      <button onClick={handleUpload} style={{ display:"flex",backgroundColor:"white",position:"absolute",left:"60%",top:"49%",color:"black"}}>
        Extract Text
      </button>

      {extractedText && (
        <div style={{ display:"flex",backgroundColor:"black",color:"white" }}>
          <h3 style = {{fontSize:"40px",color:"white",position:"absolute",top:"70%",left:"30%"}}>Extracted Text:</h3>
          <p style = {{position:"absolute",left:"60%",top:"70%",fontSize:"20px",color:"white",fontWeight:"20px"}}>{extractedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
