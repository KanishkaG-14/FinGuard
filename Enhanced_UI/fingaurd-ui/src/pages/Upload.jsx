import { useState } from "react";

import axios from "axios";

import {
  UploadCloud,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Loader2
} from "lucide-react";

export default function UploadPage() {

  // ======================================================
  // STATES
  // ======================================================

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState(null);

  // ======================================================
  // FILE SELECT
  // ======================================================

  const handleFile = (e) => {

    setFile(e.target.files[0]);
  };

  // ======================================================
  // HANDLE UPLOAD
  // ======================================================

  const handleUpload = async () => {

    if (!file) {

      alert("Please select CSV file");

      return;
    }

    try {

      setLoading(true);

      // Create form data
      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      // Send to backend
      const response = await axios.post(

        "http://127.0.0.1:8000/predict",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResults(response.data);
    }

    catch (error) {

      console.error(error);

      alert("Backend connection failed");
    }

    finally {

      setLoading(false);
    }
  };
  

  // ======================================================
  // UI
  // ======================================================

  return (
  <div
    className="
      flex-1
      p-10
      bg-gray-100
      dark:bg-slate-900
      text-black
      dark:text-white
      min-h-screen
    "
  >
    {/* TITLE */}

    <h1 className="text-3xl font-bold mb-6">
      Upload Transaction Data
    </h1>

    <p className="text-gray-500 dark:text-gray-400 mb-8">
      Upload CSV files to analyze transactions and detect fraud patterns.
    </p>

    {/* QUICK STATS */}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Format</p>
        <h3 className="font-bold text-xl">CSV</h3>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Max Size</p>
        <h3 className="font-bold text-xl">50 MB</h3>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Processing</p>
        <h3 className="font-bold text-xl">Real-Time</h3>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Accuracy</p>
        <h3 className="font-bold text-xl text-blue-500">
          99.7%
        </h3>
      </div>
    </div>

    {/* UPLOAD BOX */}

    <div
      className="
        border-2
        border-dashed
        border-blue-500
        p-12
        rounded-2xl
        text-center
        bg-white
        dark:bg-slate-800
        hover:shadow-[0_0_25px_#3b82f6]
        transition-all
      "
    >
      <UploadCloud
        size={60}
        className="mx-auto mb-4 text-blue-500"
      />

      <h2 className="text-xl font-semibold mb-2">
        Upload CSV Dataset
      </h2>

      <p className="text-gray-500 mb-6">
        Drag & drop your transaction file or browse below
      </p>

      <label
        className="
          inline-block
          cursor-pointer
          bg-blue-500
          text-white
          px-5
          py-3
          rounded-lg
          hover:bg-blue-600
          transition
        "
      >
        Choose CSV File

        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {file && (
        <div
          className="
            mt-6
            mx-auto
            max-w-md
            bg-blue-500/10
            border
            border-blue-500/20
            rounded-xl
            p-4
          "
        >
          <p className="font-semibold">
            {file.name}
          </p>

          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <p className="text-green-500 text-sm mt-1">
            ✓ CSV Ready for Analysis
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          mt-6
          px-6
          py-3
          bg-blue-500
          text-white
          rounded-lg
          hover:shadow-[0_0_15px_#3b82f6]
          transition
        "
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2
              className="animate-spin"
              size={18}
            />
            Analyzing...
          </span>
        ) : (
          "Analyze Transactions →"
        )}
      </button>
    </div>

    {/* AI PIPELINE */}

    <div
      className="
        mt-8
        bg-white
        dark:bg-slate-800
        p-6
        rounded-xl
        shadow
      "
    >
      <h3 className="font-bold text-xl mb-4">
        AI Processing Pipeline
      </h3>

      <div className="flex flex-wrap gap-4">
        <div className="px-4 py-2 rounded-full bg-blue-500/10">
          CSV Upload
        </div>

        <div className="px-4 py-2 rounded-full bg-blue-500/10">
          Feature Extraction
        </div>

        <div className="px-4 py-2 rounded-full bg-blue-500/10">
          Graph Generation
        </div>

        <div className="px-4 py-2 rounded-full bg-blue-500/10">
          AI Analysis
        </div>

        <div className="px-4 py-2 rounded-full bg-green-500/10">
          Fraud Prediction
        </div>
      </div>
    </div>

    {/* RESULTS */}

    {results && (
      <div className="mt-10">
        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-[0_0_25px_#3b82f6] transition-all duration-300">
            <Activity className="text-blue-500 mb-3" />

            <h2 className="text-lg font-semibold">
              Total Transactions
            </h2>

            <p className="text-3xl font-bold mt-2">
              {results.summary.total_transactions}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-[0_0_25px_#ef4444] transition-all duration-300">
            <AlertTriangle className="text-red-500 mb-3" />

            <h2 className="text-lg font-semibold">
              Fraud Transactions
            </h2>

            <p className="text-3xl font-bold mt-2 text-red-500">
              {results.summary.fraud_transactions}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-[0_0_25px_#22c55e] transition-all duration-300">
            <ShieldCheck className="text-green-500 mb-3" />

            <h2 className="text-lg font-semibold">
              Normal Transactions
            </h2>

            <p className="text-3xl font-bold mt-2 text-green-500">
              {results.summary.normal_transactions}
            </p>
          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">
            Transaction Results
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-500/10 border-b border-gray-300 dark:border-slate-700">
                <th className="py-3 px-4">
                  Amount
                </th>

                <th className="py-3 px-4">
                  Fraud Probability
                </th>

                <th className="py-3 px-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {results.transactions.map(
                (txn, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-slate-700"
                  >
                    <td className="py-3 px-4">
                      ₹ {txn.amt}
                    </td>

                    <td className="py-3 px-4">
                      {txn.fraud_probability?.toFixed(4)}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          ${
                            txn.prediction === 1
                              ? "bg-red-500/20 text-red-500"
                              : "bg-green-500/20 text-green-500"
                          }
                        `}
                      >
                        {txn.prediction === 1
                          ? "FRAUD"
                          : "NORMAL"}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);
}