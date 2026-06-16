export default function FraudTable({

  transactions,

  setSelectedTransaction,

  setActive,

}) {

  if (!transactions || transactions.length === 0) {

    return (

      <div className="feature-card text-center p-12">

        <h2 className="text-3xl font-bold mb-4">

          Fraud Table

        </h2>

        <p className="text-gray-500 dark:text-gray-400">

          No fraudulent transactions available.
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

          Fraud Table

        </h1>

        <p className="text-gray-500 dark:text-gray-400">

          Transactions identified as suspicious by FinGuard.

        </p>

      </div>

      {/* TABLE */}

      <div className="
        feature-card
        overflow-x-auto
      ">

        <table className="w-full">

          <thead>

            <tr className="
              border-b
              border-gray-200
              dark:border-slate-700
            ">

              <th className="text-left p-4">

                Transaction ID

              </th>

              <th className="text-left p-4">

                Merchant

              </th>

              <th className="text-left p-4">

                Amount

              </th>

              <th className="text-left p-4">

                Fraud Probability

              </th>

              <th className="text-left p-4">

                Status

              </th>

              <th className="text-center p-4">

                Analysis

              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((txn, index) => (

              <tr

                key={index}

                className="
                  border-b
                  border-gray-100
                  dark:border-slate-800
                  hover:bg-red-500/5
                  transition
                "
              >

                {/* TRANSACTION ID */}

                <td className="p-4 font-medium">

                  {txn.trans_num ||

                    txn.transaction_id ||

                    `TXN-${index + 1}`}

                </td>

                {/* MERCHANT */}

                <td className="p-4">

                  {txn.merchant ||

                    txn.merch ||

                    "Unknown"}

                </td>

                {/* AMOUNT */}

                <td className="p-4">

                  ₹{

                    txn.amt ||

                    txn.amount ||

                    "N/A"
                  }

                </td>

                {/* FRAUD PROBABILITY */}

                <td className="p-4">

                  <span className="
                    px-3
                    py-1
                    rounded-full
                    bg-red-500/10
                    text-red-500
                    font-semibold
                  ">

                    {

                      txn.fraud_probability

                        ? `${(

                            txn.fraud_probability > 1

                              ? txn.fraud_probability

                              : txn.fraud_probability * 100

                          ).toFixed(1)}%`

                        : "N/A"
                    }

                  </span>

                </td>

                {/* STATUS */}

                <td className="p-4">

                  <span className="
                    px-3
                    py-1
                    rounded-full
                    bg-red-500/10
                    text-red-500
                    font-semibold
                  ">

                    Fraud

                  </span>

                </td>

                {/* VIEW ANALYSIS */}

                <td className="p-4 text-center">

                  <button

                    onClick={() => {

                      setSelectedTransaction(txn);

                      setActive("analysis");
                    }}

                    className="btn-danger"
                  >

                    View

                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="mt-6 text-sm text-gray-500">

        Showing {transactions.length} fraudulent transactions.

      </div>

    </div>
  );
}