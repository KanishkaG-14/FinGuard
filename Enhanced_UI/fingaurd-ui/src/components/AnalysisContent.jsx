export default function AnalysisContent({ transaction }) {

  if (!transaction) {

    return (

      <div className="feature-card text-center p-12">

        <h2 className="text-3xl font-bold mb-4">

          Transaction Analysis

        </h2>

        <p className="text-gray-500 dark:text-gray-400">

          Select a fraudulent transaction from the Fraud Table
          to view detailed analysis.

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
      AI INSIGHTS
  ========================================== */

  const insights = [];

  if (probability >= 85) {

    insights.push(

      "Transaction exhibits strong fraudulent characteristics."
    );
  }

  if (

    transaction.amt ||

    transaction.amount
  ) {

    insights.push(

      `Transaction amount detected: ₹${
        transaction.amt ||

        transaction.amount
      }.`
    );
  }

  if (

    transaction.merchant ||

    transaction.merch
  ) {

    insights.push(

      `Merchant involved: ${
        transaction.merchant ||

        transaction.merch
      }.`
    );
  }

  insights.push(

    `Risk classification assigned as ${riskLevel} risk.`
  );

  return (

    <div>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-black mb-3">

          Transaction Analysis

        </h1>

        <p className="text-gray-500 dark:text-gray-400">

          Detailed explanation of the selected fraudulent transaction.

        </p>

      </div>

      {/* METER + RISK */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* FRAUD METER */}

        <div className="feature-card text-center">

          <h2 className="text-2xl font-bold mb-8">

            Fraud Probability

          </h2>

          <div className="flex justify-center">

            <div
              className="relative w-52 h-52 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(
                  ${meterColor} ${probability * 3.6}deg,
                  #e5e7eb ${probability * 3.6}deg
                )`,
              }}
            >

              <div className="
                w-40
                h-40
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

              <p className="font-bold text-2xl text-red-500">

                Fraudulent Transaction

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

              {

                transaction.trans_num ||

                transaction.transaction_id ||

                "N/A"
              }

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Merchant

            </p>

            <p className="font-semibold">

              {

                transaction.merchant ||

                transaction.merch ||

                "N/A"
              }

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Amount

            </p>

            <p className="font-semibold">

              ₹{

                transaction.amt ||

                transaction.amount ||

                "N/A"
              }

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              Category

            </p>

            <p className="font-semibold">

              {

                transaction.category ||

                "N/A"
              }

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              City

            </p>

            <p className="font-semibold">

              {

                transaction.city ||

                "N/A"
              }

            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">

              State

            </p>

            <p className="font-semibold">

              {

                transaction.state ||

                "N/A"
              }

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

              className="
                p-4
                rounded-xl
                bg-red-500/5
                border-l-4
                border-red-500
              "
            >

              {insight}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}