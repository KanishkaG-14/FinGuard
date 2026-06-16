// // import { useState } from "react";
// // import { UploadCloud } from "lucide-react";

// // export default function UploadContent() {
// //   const [file, setFile] = useState(null);

// //   const handleFile = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   const handleUpload = () => {
// //     if (!file) return alert("Please select a file");

// //     console.log("Uploading:", file);

// //     alert("File ready for upload (backend not connected yet)");
// //   };

// //   return (
// //     <div className="p-10">

// //       <h1 className="text-3xl font-bold mb-6 hover:drop-shadow-[0_0_10px_#3b82f6] transition">
// //         Upload Transaction Data
// //       </h1>

// //       <p className="text-gray-500 dark:text-gray-400 mb-10">
// //         Upload CSV files to analyze transactions and detect fraud patterns.
// //       </p>

// //       {/* UPLOAD BOX */}
// //       <div className="border-2 border-dashed border-primary p-12 rounded-xl text-center bg-white dark:bg-slate-800 hover:shadow-[0_0_25px_#3b82f6] transition-all duration-300">

// //         <UploadCloud size={40} className="mx-auto mb-4 text-primary" />

// //         <p className="mb-3 text-lg">
// //           Drag & Drop CSV file here
// //         </p>

// //         <p className="text-sm text-gray-500 mb-4">
// //           or click below to browse
// //         </p>

// //         <input
// //           type="file"
// //           accept=".csv"
// //           onChange={handleFile}
// //           className="mb-4 cursor-pointer"
// //         />

// //         {file && (
// //           <p className="text-sm text-primary mb-4">
// //             Selected: {file.name}
// //           </p>
// //         )}

// //         <button
// //           onClick={handleUpload}
// //           className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition"
// //         >
// //           Analyze Transactions →
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Database,
  ShieldCheck,
} from "lucide-react";

export default function UploadContent({
  setSummary,
  setTransactions,
  setActive,
}) {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {

  if (!file) {

    alert("Please select a CSV file");

    return;
  }

  console.log("Uploading:", file);

  const mockSummary = {

    total_transactions: 1000,

    fraud_transactions: 47,

    normal_transactions: 953,
  };

  const mockTransactions = [

    {
      trans_num: "TXN001",
      merchant: "Amazon",
      amt: 1200,
      fraud_probability: 92,
      prediction: 1,
    },

    {
      trans_num: "TXN002",
      merchant: "Flipkart",
      amt: 860,
      fraud_probability: 84,
      prediction: 1,
    },

    {
      trans_num: "TXN003",
      merchant: "Myntra",
      amt: 1450,
      fraud_probability: 97,
      prediction: 1,
    },
  ];

  setSummary(mockSummary);

  setTransactions(mockTransactions);

  alert("Mock analysis completed.");

  setActive("summary");
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


























// NEW after integration
// // import { useState } from "react";
// import axios from "axios";

// import {
//   UploadCloud,
//   FileText,
//   Database,
//   ShieldCheck,
//   Loader2,
// } from "lucide-react";

// export default function UploadContent({

//   setSummary,

//   setTransactions,

//   setActive,

// }) {

//   const [file, setFile] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const handleFile = (e) => {

//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {

//     if (!file) {

//       alert("Please select a CSV file.");

//       return;
//     }

//     try {

//       setLoading(true);

//       const formData = new FormData();

//       formData.append("file", file);

//       const res = await axios.post(

//         "http://localhost:8000/predict",

//         formData,

//         {

//           headers: {

//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setSummary(res.data.summary);

//       setTransactions(res.data.transactions);

//       alert("Analysis completed successfully!");

//       setActive("summary");

//     } catch (err) {

//       console.error(err);

//       alert("Failed to analyze transactions.");

//     } finally {

//       setLoading(false);
//     }
//   };

//   return (

//     <div>

//       {/* HEADER */}

//       <div className="mb-10">

//         <h1 className="text-4xl font-black mb-3">

//           Upload Transaction Data

//         </h1>

//         <p className="text-gray-500 dark:text-gray-400">

//           Upload a CSV dataset to detect suspicious financial transactions.

//         </p>

//       </div>

//       {/* QUICK INFO */}

//       <div className="grid md:grid-cols-4 gap-6 mb-10">

//         <div className="feature-card">

//           <FileText
//             className="text-green-500 mb-3"
//             size={32}
//           />

//           <p className="text-gray-500 text-sm">

//             Supported Format

//           </p>

//           <h3 className="font-bold text-xl">

//             CSV

//           </h3>

//         </div>

//         <div className="feature-card">

//           <Database
//             className="text-green-500 mb-3"
//             size={32}
//           />

//           <p className="text-gray-500 text-sm">

//             Processing Mode

//           </p>

//           <h3 className="font-bold text-xl">

//             Real-Time

//           </h3>

//         </div>

//         <div className="feature-card">

//           <ShieldCheck
//             className="text-green-500 mb-3"
//             size={32}
//           />

//           <p className="text-gray-500 text-sm">

//             Model Accuracy

//           </p>

//           <h3 className="font-bold text-xl">

//             99.7%

//           </h3>

//         </div>

//         <div className="feature-card">

//           <UploadCloud
//             className="text-green-500 mb-3"
//             size={32}
//           />

//           <p className="text-gray-500 text-sm">

//             Maximum Size

//           </p>

//           <h3 className="font-bold text-xl">

//             50 MB

//           </h3>

//         </div>

//       </div>

//       {/* UPLOAD CARD */}

//       <div className="feature-card text-center p-12">

//         <UploadCloud

//           size={80}

//           className="
//             mx-auto
//             mb-6
//             text-green-500
//           "
//         />

//         <h2 className="text-3xl font-bold mb-4">

//           Upload CSV Dataset

//         </h2>

//         <p className="text-gray-500 dark:text-gray-400 mb-8">

//           Browse and upload transaction records for fraud detection.

//         </p>

//         {/* FILE PICKER */}

//         <label className="btn-outline cursor-pointer">

//           Choose CSV File

//           <input

//             type="file"

//             accept=".csv"

//             onChange={handleFile}

//             className="hidden"
//           />

//         </label>

//         {/* FILE DETAILS */}

//         {file && (

//           <div className="
//             mt-8
//             max-w-lg
//             mx-auto
//             p-5
//             rounded-2xl
//             border
//             border-green-500/20
//             bg-green-500/5
//           ">

//             <h3 className="font-bold">

//               {file.name}

//             </h3>

//             <p className="text-gray-500 text-sm mt-2">

//               {(file.size / 1024 / 1024).toFixed(2)} MB

//             </p>

//             <p className="text-green-500 mt-2">

//               ✓ Ready for Analysis

//             </p>

//           </div>
//         )}

//         {/* ANALYZE BUTTON */}

//         <button

//           onClick={handleUpload}

//           disabled={loading}

//           className="
//             mt-8
//             btn-primary
//             flex
//             items-center
//             justify-center
//             gap-3
//             mx-auto
//           "
//         >

//           {loading ? (

//             <>

//               <Loader2
//                 className="animate-spin"
//                 size={20}
//               />

//               Processing...

//             </>

//           ) : (

//             "Analyze Transactions"

//           )}

//         </button>

//       </div>

//       {/* PIPELINE */}

//       <div className="mt-10 feature-card">

//         <h2 className="text-2xl font-bold mb-6">

//           Fraud Detection Pipeline

//         </h2>

//         <div className="
//           flex
//           flex-wrap
//           gap-4
//         ">

//           <span className="btn-outline">

//             CSV Upload

//           </span>

//           <span className="btn-outline">

//             Preprocessing

//           </span>

//           <span className="btn-outline">

//             Feature Extraction

//           </span>

//           <span className="btn-outline">

//             GNN Analysis

//           </span>

//           <span className="btn-danger">

//             Fraud Prediction

//           </span>

//         </div>

//       </div>

//     </div>
//   );
// }