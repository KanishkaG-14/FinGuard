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

          Overview of fraud detection results obtained from the uploaded dataset.

        </p>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

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

        {/* RATE */}

        <div className="feature-card">

          <p className="text-gray-500 text-sm mb-2">

            Fraud Rate

          </p>

          <h2 className="text-4xl font-black">

            {fraudRate}%

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

    </div>
  );
}