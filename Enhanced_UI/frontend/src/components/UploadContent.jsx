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
      night_transactions: 143,
      high_risk_transactions: 47,
    };

    const mockTransactions = [
      {
        trans_num: "TXN001",
        merchant: "Amazon",
        category: "shopping_net",
        city: "Hyderabad",
        state: "Telangana",
        hour: 2,
        txn_during_night: 1,
        amt: 1200,
        fraud_probability: 92,
        prediction: 1,
      },

      {
        trans_num: "TXN002",
        merchant: "Flipkart",
        category: "shopping_net",
        city: "Mumbai",
        state: "Maharashtra",
        hour: 23,
        txn_during_night: 1,
        amt: 860,
        fraud_probability: 84,
        prediction: 1,
      },

      {
        trans_num: "TXN003",
        merchant: "Myntra",
        category: "shopping_pos",
        city: "Bangalore",
        state: "Karnataka",
        hour: 15,
        txn_during_night: 0,
        amt: 1450,
        fraud_probability: 97,
        prediction: 1,
      },

      {
        trans_num: "TXN004",
        merchant: "Swiggy",
        category: "food_dining",
        city: "Chennai",
        state: "Tamil Nadu",
        hour: 19,
        txn_during_night: 0,
        amt: 550,
        fraud_probability: 12,
        prediction: 0,
      },

      {
        trans_num: "TXN005",
        merchant: "Netflix",
        category: "entertainment",
        city: "Delhi",
        state: "Delhi",
        hour: 21,
        txn_during_night: 0,
        amt: 799,
        fraud_probability: 18,
        prediction: 0,
      },
    ];

    setSummary(mockSummary);
    setTransactions(mockTransactions);

    alert("Mock analysis completed successfully.");

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
        <div className="feature-card">
          <FileText className="text-green-500 mb-2" />

          <p className="text-sm text-gray-500">
            Format
          </p>

          <h3 className="font-bold">
            CSV
          </h3>
        </div>

        <div className="feature-card">
          <Database className="text-green-500 mb-2" />

          <p className="text-sm text-gray-500">
            Processing
          </p>

          <h3 className="font-bold">
            Real-Time
          </h3>
        </div>

        <div className="feature-card">
          <ShieldCheck className="text-green-500 mb-2" />

          <p className="text-sm text-gray-500">
            Accuracy
          </p>

          <h3 className="font-bold text-green-500">
            99.7%
          </h3>
        </div>

        <div className="feature-card">
          <UploadCloud className="text-green-500 mb-2" />

          <p className="text-sm text-gray-500">
            Max Size
          </p>

          <h3 className="font-bold">
            50 MB
          </h3>
        </div>
      </div>

      {/* UPLOAD BOX */}

      <div
        className="
          feature-card
          text-center
          border-2
          border-dashed
          border-green-500/40
        "
      >
        <UploadCloud
          size={70}
          className="mx-auto mb-5 text-green-500"
        />

        <h2 className="text-2xl font-semibold mb-2">
          Upload CSV Dataset
        </h2>

        <p className="text-gray-500 mb-6">
          Drag & drop your transaction dataset
          or browse from your device
        </p>

        <label
          className="
            inline-block
            cursor-pointer
            btn-primary
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
              bg-green-500/10
              border
              border-green-500/20
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
              ✓ Ready for Analysis
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="
            mt-6
            btn-primary
          "
        >
          Analyze Transactions →
        </button>
      </div>
    </div>
  );
}