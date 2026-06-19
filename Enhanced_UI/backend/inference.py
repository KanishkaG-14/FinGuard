import pandas as pd
import numpy as np
import torch
import joblib

from math import radians
from math import sin
from math import cos
from math import sqrt
from math import atan2

from torch_geometric.data import HeteroData

from models_def import FraudHGT
from models_def import AutoEncoder

# ==========================================
# LOAD ARTIFACTS
# ==========================================

print("Loading models...")

hgt_model = FraudHGT()

hgt_model.load_state_dict(
    torch.load(
        "hgt_model1.pth",
        map_location="cpu"
    )
)

hgt_model.eval()

ae_model = AutoEncoder()

ae_model.load_state_dict(
    torch.load(
        "autoencoder1.pth",
        map_location="cpu"
    )
)

ae_model.eval()

scaler = joblib.load("scaler.pkl")

customer_map = joblib.load(
    "customer_map.pkl"
)

merchant_map = joblib.load(
    "merchant_map.pkl"
)

print("Models Loaded Successfully")

def haversine(
    lat1,
    lon1,
    lat2,
    lon2
):

    R = 6371

    dlat = radians(lat2-lat1)
    dlon = radians(lon2-lon1)

    a = (
        sin(dlat/2)**2
        +
        cos(radians(lat1))
        *
        cos(radians(lat2))
        *
        sin(dlon/2)**2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1-a)
    )

    return R * c


def create_features(df):

    df["trans_date_trans_time"] = pd.to_datetime(
    df["trans_date_trans_time"],
    format="mixed",
    dayfirst=True
    )

    df["hour"] = (
        df["trans_date_trans_time"]
        .dt.hour
    )

    df["day_of_week"] = (
        df["trans_date_trans_time"]
        .dt.dayofweek
    )

    df["is_weekend"] = (
        df["day_of_week"] >= 5
    ).astype(int)

    df["is_night"] = (
        (df["hour"] < 6)
        |
        (df["hour"] > 22)
    ).astype(int)

    df["distance"] = df.apply(
        lambda row:
        haversine(
            row["lat"],
            row["long"],
            row["merch_lat"],
            row["merch_long"]
        ),
        axis=1
    )

    df["txn_count_customer"] = (
        df.groupby("cc_num")
        ["amt"]
        .transform("count")
    )

    df["avg_customer_amt"] = (
        df.groupby("cc_num")
        ["amt"]
        .transform("mean")
    )

    return df
def build_graph(df):

    data = HeteroData()

    df["customer_id"] = range(len(df))

    df["merchant_id"] = range(len(df))

    df["transaction_id"] = range(len(df))

    customer_features = df[
        [
            "avg_customer_amt",
            "txn_count_customer"
        ]
    ]

    merchant_features = df[
        ["amt"]
    ]

    txn_features = df[
        [
            "amt",
            "hour",
            "is_night",
            "distance"
        ]
    ]

    data["customer"].x = torch.tensor(
        customer_features.values,
        dtype=torch.float
    )

    data["merchant"].x = torch.tensor(
        merchant_features.values,
        dtype=torch.float
    )

    data["transaction"].x = torch.tensor(
        txn_features.values,
        dtype=torch.float
    )

    customer_txn_edge = torch.tensor(
        [
            df["customer_id"].values,
            df["transaction_id"].values
        ],
        dtype=torch.long
    )

    txn_merchant_edge = torch.tensor(
        [
            df["transaction_id"].values,
            df["merchant_id"].values
        ],
        dtype=torch.long
    )

    data[
        "customer",
        "makes_transaction",
        "transaction"
    ].edge_index = customer_txn_edge

    data[
        "transaction",
        "pays_merchant",
        "merchant"
    ].edge_index = txn_merchant_edge

    data[
        "transaction",
        "made_by",
        "customer"
    ].edge_index = torch.stack(
        [
            customer_txn_edge[1],
            customer_txn_edge[0]
        ]
    )

    data[
        "merchant",
        "receives_from",
        "transaction"
    ].edge_index = torch.stack(
        [
            txn_merchant_edge[1],
            txn_merchant_edge[0]
        ]
    )

    return data
def predict_transactions(df):

    # ==========================================
    # FEATURE ENGINEERING
    # ==========================================

    df = create_features(df)

    # ==========================================
    # GRAPH
    # ==========================================

    data = build_graph(df)

    # ==========================================
    # HGT PREDICTION
    # ==========================================

    with torch.no_grad():

        logits = hgt_model(data)

        hgt_probs = torch.sigmoid(
            logits
        )

    # ==========================================
    # AUTOENCODER FEATURES
    # ==========================================

    X = df[
        [
            "amt",
            "hour",
            "is_night",
            "distance"
        ]
    ].values

    X_scaled = scaler.transform(X)

    X_tensor = torch.tensor(
        X_scaled,
        dtype=torch.float
    )

    # ==========================================
    # ANOMALY SCORE
    # ==========================================

    with torch.no_grad():

        recon = ae_model(X_tensor)

        errors = torch.mean(
            (recon - X_tensor) ** 2,
            dim=1
        )

    anomaly_norm = (

        errors - errors.min()

    ) / (

        errors.max() - errors.min() + 1e-8
    )

    # ==========================================
    # HYBRID SCORE
    # ==========================================

    final_score = (

        0.7 * hgt_probs

        +

        0.3 * anomaly_norm
    )

    # ==========================================
    # THRESHOLD
    # ==========================================

    threshold = 0.50

    predictions = (

        final_score > threshold

    ).int()

    # ==========================================
    # SAVE RESULTS
    # ==========================================

    df["fraud_probability"] = (

        final_score.numpy()
    )

    df["prediction"] = (

        predictions.numpy()
    )

    return df