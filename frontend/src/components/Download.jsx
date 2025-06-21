import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DownloadPage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/download/${id}`,
          {
            headers: {
              id: id,
            },
          }
        );
        if (!res.ok) throw new Error("File not found");

        const data = await res.json();
        setFile(data.file);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [id]);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/download/${id}`,
        {
          headers: {
            id: id,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      // Get the filename from the content-disposition header or use the stored filename
      const contentDisposition = response.headers.get('content-disposition');
      let filename = file.filename;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      // Create a blob from the response and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!file)
    return <div className="text-center p-4 text-yellow-500">No file found</div>;

  return (
    <div className="h-screen flex flex-col gap-8 justify-center items-center p-4 bg-white">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Share<span className="text-gray-500">Xpress</span>
        </h1>
        <p className="text-sm text-gray-500">Simple file sharing</p>
      </div>
      <div className="border rounded-lg p-4 flex justify-between items-center w-full max-w-md">
        <div>
          <p className="font-medium text-gray-900 truncate max-w-[200px]">
            {file.filename}
          </p>
          <p className="text-xs text-gray-500">
            {(file.length / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
        >
          Download
        </button>
      </div>
    </div>
  );
}