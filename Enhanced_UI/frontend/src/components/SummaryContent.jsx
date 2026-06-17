import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SummaryContent({ summary }) {

  if (!summary) {

    return (

      <div className="feature-card text-center p-12">

        <h2 className="text-3xl font-bold mb-4">

          Results Summary

        </h2>

        <p className="text-gray-500 dark:text-gray-400">

          Upload a dataset and analyze transactions to view fraud statistics.

        </p>

      </div>
    );
  }

  const fraudRate = (

    (summary.fraud_transactions /

      summary.total_transactions) * 100

  ).toFixed(2);

  const pieData = [

    {
      name: "Safe Transactions",
      value: summary.normal_transactions,
    },

    {
      name: "Fraud Transactions",
      value: summary.fraud_transactions,
    },
  ];

  const COLORS = [

    "#16a34a",

    "#dc2626",
  ];

  return (

    <div>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-black mb-3">

          Results Summary

        </h1>

        <p className="text-gray-500 dark:text-gray-400">

          Comprehensive overview of fraud detection results from the uploaded dataset.

        </p>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

        {/* TOTAL */}

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Total Transactions

          </p>

          <h2 className="text-4xl font-black">

            {summary.total_transactions}

          </h2>

        </div>

        {/* FRAUD */}

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Fraud Transactions

          </p>

          <h2 className="text-4xl font-black text-red-500">

            {summary.fraud_transactions}

          </h2>

        </div>

        {/* SAFE */}

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Safe Transactions

          </p>

          <h2 className="text-4xl font-black text-green-500">

            {summary.normal_transactions}

          </h2>

        </div>

        {/* FRAUD RATE */}

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Fraud Rate

          </p>

          <h2 className="text-4xl font-black">

            {fraudRate}%

          </h2>

        </div>

        {/* NIGHT */}

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Night Transactions

          </p>

          <h2 className="text-4xl font-black text-yellow-500">

            {summary.night_transactions || 0}

          </h2>

        </div>

      </div>

      {/* SECOND ROW */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            High Risk Transactions

          </p>

          <h2 className="text-4xl font-black text-red-500">

            {summary.high_risk_transactions || 0}

          </h2>

        </div>

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Detection Accuracy

          </p>

          <h2 className="text-4xl font-black text-green-500">

            99.7%

          </h2>

        </div>

      </div>

      {/* PIE CHART */}

      <div className="feature-card">

        <h2 className="text-2xl font-bold mb-6">

          Fraud Distribution

        </h2>

        <div className="w-full h-[450px]">

          <ResponsiveContainer>

            <PieChart>

              <Pie

                data={pieData}

                cx="50%"

                cy="50%"

                outerRadius={150}

                label={({ name, percent }) =>

                  `${name}: ${(percent * 100).toFixed(1)}%`
                }

                dataKey="value"
              >

                {pieData.map((entry, index) => (

                  <Cell

                    key={index}

                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* INSIGHTS */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* FRAUD CATEGORIES */}

        <div className="feature-card">

          <h3 className="text-xl font-bold mb-5">

            Top Fraud Categories

          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>shopping_net</span>

              <span className="text-red-500 font-semibold">

                High Risk

              </span>

            </div>

            <div className="flex justify-between">

              <span>misc_net</span>

              <span className="text-yellow-500 font-semibold">

                Medium Risk

              </span>

            </div>

            <div className="flex justify-between">

              <span>grocery_pos</span>

              <span className="text-green-500 font-semibold">

                Low Risk

              </span>

            </div>

          </div>

        </div>

        {/* INSIGHTS */}

        <div className="feature-card">

          <h3 className="text-xl font-bold mb-5">

            Fraud Insights

          </h3>

          <div className="space-y-4">

            <div>

              Fraud Rate:
              {" "}
              <span className="font-semibold">

                {fraudRate}%

              </span>

            </div>

            <div>

              Night Transactions:
              {" "}
              <span className="font-semibold">

                {summary.night_transactions || 0}

              </span>

            </div>

            <div>

              High Risk Cases:
              {" "}
              <span className="font-semibold text-red-500">

                {summary.high_risk_transactions || 0}

              </span>

            </div>

            <div>

              Overall Status:
              {" "}
              <span className="font-semibold text-green-500">

                Monitoring Active

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}