from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd

from inference import predict_transactions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message": "FinGuard API Running"
    }

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    try:

        df = pd.read_csv(file.file)

        result_df = predict_transactions(df)

        fraud_count = int(
            result_df["prediction"].sum()
        )

        normal_count = (
            len(result_df) - fraud_count
        )

        summary = {

            "total_transactions":
                int(len(result_df)),

            "fraud_transactions":
                fraud_count,

            "normal_transactions":
                normal_count,

            "night_transactions":
                int(
                    result_df["is_night"].sum()
                ),

            "high_risk_transactions":
                int(
                    (
                        result_df[
                            "fraud_probability"
                        ] > 0.85
                    ).sum()
                ),

            "average_amount":
                round(
                    float(
                        result_df["amt"].mean()
                    ),
                    2
                ),

            "average_anomaly_score":
                round(
                    float(
                        result_df[
                            "fraud_probability"
                        ].mean()
                    ),
                    4
                )
        }
        # =================================================
        # COLUMNS FOR FRONTEND
        # =================================================

        display_cols = [

            "trans_num",
            "merchant",
            "category",
            "city",
            "state",
            "amt",
            "hour",
            "is_night",
            "fraud_probability",
            "prediction"
        ]

        # keep only useful columns

        result_df = df[display_cols]

        return {

    "summary": summary,

    "transactions":

        result_df.to_dict(
            orient="records"
        )
}

    except Exception as e:

        print("\nERROR\n", e)

        return {
            "error": str(e)
        }