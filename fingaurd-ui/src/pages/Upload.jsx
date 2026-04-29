import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file");

    console.log("Uploading:", file);

    alert("File ready for upload (backend not connected yet)");
  };

  return (
    <div className="flex-1 p-10 bg-gray-100 dark:bg-slate-900 text-black dark:text-white">

      <h1 className="text-3xl font-bold mb-6">
        Upload Transaction Data
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mb-10">
        Upload CSV files to analyze transactions and detect fraud patterns.
      </p>

      {/* UPLOAD BOX */}
      <div className="border-2 border-dashed border-primary p-12 rounded-xl text-center bg-white dark:bg-slate-800 hover:shadow-[0_0_25px_#3b82f6] transition">

        <UploadCloud size={40} className="mx-auto mb-4 text-primary" />

        <p className="mb-3 text-lg">
          Drag & Drop CSV file here
        </p>

        <p className="text-sm text-gray-500 mb-4">
          or click below to browse
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="mb-4"
        />

        {file && (
          <p className="text-sm text-primary mb-4">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition"
        >
          Analyze Transactions →
        </button>
      </div>
    </div>
  );
}