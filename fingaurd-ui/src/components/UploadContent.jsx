// import { useState } from "react";
// import { UploadCloud } from "lucide-react";

// export default function UploadContent() {
//   const [file, setFile] = useState(null);

//   const handleFile = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!file) return alert("Please select a file");

//     console.log("Uploading:", file);

//     alert("File ready for upload (backend not connected yet)");
//   };

//   return (
//     <div className="p-10">

//       <h1 className="text-3xl font-bold mb-6 hover:drop-shadow-[0_0_10px_#3b82f6] transition">
//         Upload Transaction Data
//       </h1>

//       <p className="text-gray-500 dark:text-gray-400 mb-10">
//         Upload CSV files to analyze transactions and detect fraud patterns.
//       </p>

//       {/* UPLOAD BOX */}
//       <div className="border-2 border-dashed border-primary p-12 rounded-xl text-center bg-white dark:bg-slate-800 hover:shadow-[0_0_25px_#3b82f6] transition-all duration-300">

//         <UploadCloud size={40} className="mx-auto mb-4 text-primary" />

//         <p className="mb-3 text-lg">
//           Drag & Drop CSV file here
//         </p>

//         <p className="text-sm text-gray-500 mb-4">
//           or click below to browse
//         </p>

//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFile}
//           className="mb-4 cursor-pointer"
//         />

//         {file && (
//           <p className="text-sm text-primary mb-4">
//             Selected: {file.name}
//           </p>
//         )}

//         <button
//           onClick={handleUpload}
//           className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition"
//         >
//           Analyze Transactions →
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Database,
  ShieldCheck,
} from "lucide-react";

export default function UploadContent() {
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
    <div className="p-10">

      {/* HEADER */}

      <h1 className="text-3xl font-bold mb-3">
        Upload Transaction Data
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Upload CSV files to analyze transactions and detect fraud patterns.
      </p>

      {/* QUICK STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
          <FileText className="text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Format</p>
          <h3 className="font-bold">CSV</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
          <Database className="text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Processing</p>
          <h3 className="font-bold">Real-Time</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
          <ShieldCheck className="text-green-500 mb-2" />
          <p className="text-sm text-gray-500">Accuracy</p>
          <h3 className="font-bold text-green-500">
            99.7%
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
          <UploadCloud className="text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Max Size</p>
          <h3 className="font-bold">50 MB</h3>
        </div>

      </div>

      {/* UPLOAD CARD */}

      <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        p-10
        text-center
        border-2
        border-dashed
        border-blue-500
        hover:shadow-[0_0_25px_#3b82f6]
        transition-all
      ">

        <UploadCloud
          size={70}
          className="mx-auto mb-5 text-blue-500"
        />

        <h2 className="text-2xl font-semibold mb-2">
          Upload CSV Dataset
        </h2>

        <p className="text-gray-500 mb-6">
          Drag & drop your transaction dataset
          or browse from your device
        </p>

        <label className="
          inline-block
          cursor-pointer
          bg-blue-500
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-blue-600
          transition
        ">
          Choose CSV File

          <input
            type="file"
            accept=".csv"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        {file && (
          <div className="
            mt-6
            mx-auto
            max-w-md
            bg-blue-500/10
            border
            border-blue-500/20
            rounded-xl
            p-4
          ">

            <p className="font-semibold">
              {file.name}
            </p>

            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <p className="text-green-500 text-sm mt-1">
              ✓ Ready for Analysis
            </p>

          </div>
        )}

        <button
          onClick={handleUpload}
          className="
            mt-6
            px-8
            py-3
            bg-blue-500
            text-white
            rounded-lg
            hover:bg-blue-600
            hover:shadow-[0_0_15px_#3b82f6]
            transition
          "
        >
          Analyze Transactions →
        </button>

      </div>

      {/* AI PIPELINE */}

      <div className="
        mt-8
        bg-white
        dark:bg-slate-800
        p-6
        rounded-xl
        shadow
      ">

        <h3 className="text-xl font-semibold mb-4">
          AI Processing Pipeline
        </h3>

        <div className="flex flex-wrap gap-3">

          <span className="px-4 py-2 rounded-full bg-blue-500/10">
            CSV Upload
          </span>

          <span className="px-4 py-2 rounded-full bg-blue-500/10">
            Feature Extraction
          </span>

          <span className="px-4 py-2 rounded-full bg-blue-500/10">
            Graph Generation
          </span>

          <span className="px-4 py-2 rounded-full bg-blue-500/10">
            AI Analysis
          </span>

          <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-500">
            Fraud Prediction
          </span>

        </div>

      </div>

    </div>
  );
}