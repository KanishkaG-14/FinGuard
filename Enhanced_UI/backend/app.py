from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import torch
import numpy as np

from model import FraudGNN
from utils import preprocess

# =====================================================
# FASTAPI
# =====================================================

app = FastAPI()

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =====================================================
# LOAD MODEL
# =====================================================

feature_len = 12

model = FraudGNN(feature_len)

model.load_state_dict(

    torch.load(
        "best_fraud_gnn.pth",
        map_location="cpu"
    )
)

model.eval()

print("\n✅ GNN Model Loaded Successfully\n")

# =====================================================
# ROOT
# =====================================================

@app.get("/")

def home():

    return {

        "message":
        "Fraud Detection API Running"
    }

# =====================================================
# PREDICT API
# =====================================================

@app.post("/predict")

async def predict(

    file: UploadFile = File(...)

):

    try:

        # =================================================
        # READ CSV
        # =================================================

        df = pd.read_csv(file.file)

        print("\n✅ CSV Uploaded")

        print("Rows:", len(df))

        # =================================================
        # FIX CARD NUMBER TYPE
        # =================================================

        if "cc_num" in df.columns:

            df["cc_num"] = (

                df["cc_num"]

                .astype(str)
            )

        # =================================================
        # PREPROCESS
        # =================================================

        df = preprocess(df)

        # =================================================
        # REQUIRED FEATURES
        # =================================================

        features = [

            'amt',

            'lat',
            'long',

            'merch_lat',
            'merch_long'
        ]

        # =================================================
        # HANDLE MISSING COLUMNS
        # =================================================

        for col in features:

            if col not in df.columns:

                df[col] = 0

        # =================================================
        # FEATURE MATRIX
        # =================================================

        X = df[features].copy()

        # =================================================
        # NORMALIZATION
        # =================================================

        X = (

            X - X.mean()

        ) / (

            X.std() + 1e-9
        )

        # =================================================
        # TO TENSOR
        # =================================================

        X_tensor = torch.tensor(

            X.values,

            dtype=torch.float
        )

        # =================================================
        # FRAUD SCORING
        # =================================================

        with torch.no_grad():

            # =============================================
            # AMOUNT RISK
            # =============================================

            amt_score = torch.sigmoid(

                X_tensor[:, 0] * 1.5
            )

            # =============================================
            # DISTANCE
            # =============================================

            distance = torch.sqrt(

                (X_tensor[:, 1] - X_tensor[:, 3]) ** 2 +

                (X_tensor[:, 2] - X_tensor[:, 4]) ** 2
            )

            # =============================================
            # DISTANCE RISK
            # =============================================

            distance_score = torch.sigmoid(

                distance * 0.8
            )

            # =============================================
            # FINAL PROBABILITY
            # =============================================

            probs = (

                0.75 * amt_score +

                0.25 * distance_score

            ).numpy()

        # =================================================
        # THRESHOLD
        # =================================================

        threshold = 0.72

        predictions = (

            probs > threshold

        ).astype(int)

        # =================================================
        # SAVE RESULTS
        # =================================================

        df['fraud_probability'] = probs

        df['prediction'] = predictions

        # =================================================
        # SUMMARY
        # =================================================

        fraud_count = int(

            predictions.sum()
        )

        normal_count = (

            len(df) - fraud_count
        )

        print("\n========== RESULTS ==========")

        print("Total :", len(df))

        print("Fraud :", fraud_count)

        print("Normal:", normal_count)

        print("=============================\n")

        # =================================================
        # RESPONSE
        # =================================================

        return {

            "summary": {

                "total_transactions":

                    int(len(df)),

                "fraud_transactions":

                    fraud_count,

                "normal_transactions":

                    normal_count
            },

           fraud_df = df[df["prediction"] == 1]

return {

    "summary": {

        "total_transactions":
            int(len(df)),

        "fraud_transactions":
            fraud_count,

        "normal_transactions":
            normal_count
    },

    "transactions":

        fraud_df.to_dict(

            orient="records"
        )
}
        }

    except Exception as e:

        print("\n❌ ERROR:\n", e)

        return {

            "error": str(e)
        }