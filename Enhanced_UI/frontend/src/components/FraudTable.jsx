export default function FraudTable({

  transactions,

  setSelectedTransaction,

  setActive,

}) {

  if (!transactions || transactions.length === 0) {

    return (

      <div className="feature-card text-center p-12">

        <h2 className="text-3xl font-bold mb-4">

          Transactions Table

        </h2>

        <p className="text-gray-500 dark:text-gray-400">

          No transaction data available.
          Upload and analyze a dataset first.

        </p>

      </div>
    );
  }

  return (

    <div>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-black mb-3">

          Transactions Table

        </h1>

        <p className="text-gray-500 dark:text-gray-400">

          Complete list of analyzed transactions with fraud predictions.

        </p>

      </div>

      {/* TABLE */}

      <div className="feature-card overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead>

            <tr className="
              border-b
              border-gray-200
              dark:border-slate-700
            ">

              <th className="text-left p-5">
                Transaction ID
              </th>

              <th className="text-left p-5">
                Merchant
              </th>

              <th className="text-left p-5">
                Category
              </th>

              <th className="text-left p-5">
                City
              </th>

              <th className="text-left p-5">
                Amount
              </th>

              <th className="text-center p-5">
                Probability
              </th>

              <th className="text-center p-5">
                Prediction
              </th>

              <th className="text-center p-5">
                Analysis
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((txn, index) => {

              const probability = txn.fraud_probability

                ? txn.fraud_probability > 1

                  ? txn.fraud_probability

                  : txn.fraud_probability * 100

                : 0;

              let probabilityClass =
                "bg-green-500/10 text-green-500";

              if (probability >= 80) {

                probabilityClass =
                  "bg-red-500/10 text-red-500";

              } else if (probability >= 40) {

                probabilityClass =
                  "bg-yellow-500/10 text-yellow-500";
              }

              return (

                <tr

                  key={index}

                  className="
                    border-b
                    border-gray-100
                    dark:border-slate-800
                    hover:bg-white/5
                    transition-all
                  "
                >

                  {/* TRANSACTION ID */}

                  <td className="p-5 font-semibold">

                    {

                      txn.trans_num ||

                      txn.transaction_id ||

                      `TXN-${index + 1}`
                    }

                  </td>

                  {/* MERCHANT */}

                  <td className="p-5">

                    {

                      txn.merchant ||

                      txn.merch ||

                      "Unknown"
                    }

                  </td>

                  {/* CATEGORY */}

                  <td className="p-5">

                    {

                      txn.category ||

                      "N/A"
                    }

                  </td>

                  {/* CITY */}

                  <td className="p-5">

                    {

                      txn.city ||

                      "N/A"
                    }

                  </td>

                  {/* AMOUNT */}

                  <td className="p-5 font-medium">

                    ₹{

                      txn.amt ||

                      txn.amount ||

                      "N/A"
                    }

                  </td>

                  {/* PROBABILITY */}

                  <td className="p-5 text-center">

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                        ${probabilityClass}
                      `}
                    >

                      {probability.toFixed(1)}%

                    </span>

                  </td>

                  {/* PREDICTION */}

                  <td className="p-5 text-center">

                    {txn.prediction === 1 ? (

                      <span className="
                        px-4
                        py-2
                        rounded-full
                        bg-red-500/10
                        text-red-500
                        font-semibold
                      ">

                        Fraud

                      </span>

                    ) : (

                      <span className="
                        px-4
                        py-2
                        rounded-full
                        bg-green-500/10
                        text-green-500
                        font-semibold
                      ">

                        Safe

                      </span>

                    )}

                  </td>

                  {/* VIEW */}

                  <td className="p-5 text-center">

                    <button

                      onClick={() => {

                        setSelectedTransaction(txn);

                        setActive("analysis");
                      }}

                      className={`
                        px-5
                        py-2
                        rounded-xl
                        font-semibold
                        text-white
                        transition-all

                        ${
                          txn.prediction === 1

                            ? "bg-red-600 hover:bg-red-700"

                            : "bg-green-600 hover:bg-green-700"
                        }
                      `}
                    >

                      View

                    </button>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="mt-6 text-sm text-gray-500">

        Showing {transactions.length} analyzed transactions.

      </div>

    </div>
  );
}