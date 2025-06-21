import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [selectedFiles, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isPasswordProtected, setPasswordStatus] = useState(false);
  const [filePassword, setPassword] = useState('');
  const [fileConfPassword, setConfPassword] = useState('');
  const nav = useNavigate();

  // ✅ ID Generation Function
  function generateId(length = 5) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // ✅ Upload Handler
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const id = generateId();

    const formData = new FormData();
    formData.append("file", selectedFiles[0]); // Send only the first file for now
    formData.append("id", id); // Optional: pass the generated id to backend if needed

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/upload`,
        {
          method: "POST",
          headers: {
            id: id,
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log("File uploaded successfully:", data);

      // Navigate to the share page after upload
      nav(`/share/${id}`);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 p-4 bg-white">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Share<span className="text-gray-500">Xpress</span>
        </h1>
        <p className="text-sm text-gray-500">Simple file sharing</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            onChange={(e) => setFiles(Array.from(e.target.files))} // Convert FileList to Array
            ref={fileInputRef}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <UploadIcon className="h-5 w-5 text-gray-400" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">Any file type up to 50MB</p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-4">
            <div className="border rounded-md p-3 text-sm">
              <div className="font-medium">{selectedFiles[0].name}</div>
              <div className="text-gray-500 text-xs">
                {(selectedFiles[0].size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-start">
              <div className="flex gap-2">
                <input
                  onChange={(e) => setPasswordStatus(!isPasswordProtected)}
                  type="checkbox"
                  className="accent-gray-900"
                />
                <p className="font-light text-xs">password protect this file</p>
              </div>

              {isPasswordProtected && <div className="flex flex-col gap-1">
                <input
                  type="text"
                  onChange={e => setPassword(e.target.value)}
                  className="border border-gray-200 rounded-md text-xs p-1 px-2 outline-none"
                  placeholder="enter password"
                />
                <input
                  type="text"
                  onChange={e => setConfPassword(e.target.value)}
                  className="border border-gray-200 rounded-md text-xs p-1 px-2 outline-none"
                  placeholder="confirm password"
                />
              </div>}
            </div>

            <button
              onClick={handleUpload} // ✅ Correct syntax here
              className="w-full py-2 px-4 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
            >
              Upload File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
