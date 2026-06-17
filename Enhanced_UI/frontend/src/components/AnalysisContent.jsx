export default function AnalysisContent({ transaction }) {

  if (!transaction) {

    return (

      <div className="feature-card text-center p-12">

        <h2 className="text-3xl font-bold mb-4">

          Transaction Analysis

        </h2>

        <p className="text-gray-500 dark:text-gray-400">

          Select a transaction from the Transactions Table
          to view detailed fraud analysis.

        </p>

      </div>
    );
  }

  /* ==========================================
      FRAUD PROBABILITY
  ========================================== */

  const probability = transaction.fraud_probability

    ? transaction.fraud_probability > 1

      ? transaction.fraud_probability

      : transaction.fraud_probability * 100

    : 0;

  /* ==========================================
      RISK LEVEL
  ========================================== */

  let riskLevel = "Low";

  let riskColor = "text-green-500";

  let meterColor = "#16a34a";

  if (probability >= 85) {

    riskLevel = "High";

    riskColor = "text-red-500";

    meterColor = "#dc2626";

  }

  else if (probability >= 60) {

    riskLevel = "Medium";

    riskColor = "text-yellow-500";

    meterColor = "#eab308";
  }

  /* ==========================================
      PREDICTION
  ========================================== */

  const predictionText =

    transaction.prediction === 1

      ? "Fraudulent Transaction"

      : "Safe Transaction";

  const predictionColor =

    transaction.prediction === 1

      ? "text-red-500"

      : "text-green-500";

  /* ==========================================
      INSIGHTS
  ========================================== */

  const insights = [];

  if (probability >= 85) {

    insights.push(
      "Extremely high fraud probability detected."
    );
  }

  else if (probability >= 60) {

    insights.push(
      "Transaction requires additional verification."
    );
  }

  else {

    insights.push(
      "Transaction behavior appears normal."
    );
  }

  if (transaction.amt) {

    insights.push(
      `Transaction amount: ₹${transaction.amt}.`
    );
  }

  if (transaction.merchant) {

    insights.push(
      `Merchant involved: ${transaction.merchant}.`
    );
  }

  if (transaction.category) {

    insights.push(
      `Merchant category: ${transaction.category}.`
    );
  }

  if (transaction.txn_during_night === 1) {

    insights.push(
      "Transaction occurred during night hours."
    );
  }

  insights.push(
    `Risk classification assigned as ${riskLevel} Risk.`
  );

  return (

    <div>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-black mb-3">

          Transaction Analysis

        </h1>

        <p className="text-gray-500 dark:text-gray-400">

          Detailed AI-powered fraud assessment of the selected transaction.

        </p>

      </div>

      {/* METER + SUMMARY */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* FRAUD METER */}

        <div className="feature-card text-center">

          <h2 className="text-2xl font-bold mb-8">

            Fraud Probability

          </h2>

          <div className="flex justify-center">

            <div
              className="relative w-56 h-56 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(
                  ${meterColor} ${probability * 3.6}deg,
                  #e5e7eb ${probability * 3.6}deg
                )`,
              }}
            >

              <div className="
                w-44
                h-44
                rounded-full
                bg-white
                dark:bg-slate-900
                flex
                items-center
                justify-center
              ">

                <div>

                  <div className="text-5xl font-black">

                    {probability.toFixed(1)}%

                  </div>

                  <div className={riskColor}>

                    {riskLevel} Risk

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RISK SUMMARY */}

        <div className="feature-card">

          <h2 className="text-2xl font-bold mb-6">

            Risk Summary

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-gray-500 text-sm">

                Fraud Probability

              </p>

              <p className="font-bold text-2xl">

                {probability.toFixed(1)}%

              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">

                Risk Level

              </p>

              <p className={`font-bold text-2xl ${riskColor}`}>

                {riskLevel}

              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">

                Prediction

              </p>

              <p className={`font-bold text-2xl ${predictionColor}`}>

                {predictionText}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* TRANSACTION DETAILS */}

      <div className="feature-card mb-10">

        <h2 className="text-2xl font-bold mb-6">

          Transaction Details

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500 text-sm">

              Transaction ID

            </p>

            <p className="font-semibold">

              {transaction.trans_num || "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Merchant

            </p>

            <p className="font-semibold">

              {transaction.merchant || "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Category

            </p>

            <p className="font-semibold">

              {transaction.category || "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Amount

            </p>

            <p className="font-semibold">

              ₹{transaction.amt || "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              City

            </p>

            <p className="font-semibold">

              {transaction.city || "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              State

            </p>

            <p className="font-semibold">

              {transaction.state || "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Transaction Hour

            </p>

            <p className="font-semibold">

              {transaction.hour ?? "N/A"}

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Night Transaction

            </p>

            <p
              className={`font-semibold ${
                transaction.txn_during_night
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >

              {transaction.txn_during_night
                ? "Yes"
                : "No"}

            </p>

          </div>

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="feature-card">

        <h2 className="text-2xl font-bold mb-6">

          AI Insights

        </h2>

        <div className="space-y-4">

          {insights.map((insight, index) => (

            <div

              key={index}

              className={`
                p-4
                rounded-xl
                border-l-4

                ${
                  transaction.prediction === 1
                    ? "bg-red-500/5 border-red-500"
                    : "bg-green-500/5 border-green-500"
                }
              `}
            >

              {insight}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}