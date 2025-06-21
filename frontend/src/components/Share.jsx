import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Share() {
  const [qr, setQR] = useState(null);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { id } = params;
  const shareUrl = `${window.location.origin}/get/${id}`;

  useEffect(() => {
    setQR(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            {qr && (
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <img src={qr} alt="QR Code" className="w-40 h-40" />
              </div>
            )}

            <div className="w-full space-y-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Scan to download</span> or share the link
              </p>
              
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 truncate focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}