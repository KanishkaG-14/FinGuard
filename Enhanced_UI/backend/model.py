import pandas as pd
import numpy as np

pd.set_option('display.max_columns', None)

df = pd.read_csv("fraudTrain.csv")

print(df.shape)
df.head()
print(df.columns.tolist())
print(df['is_fraud'].value_counts())

print(
    df['is_fraud'].value_counts(normalize=True)*100
)

df.isnull().sum()

df_small = df.sample(
    n=100000,
    random_state=42
)

df_small.shape

df_small.to_csv(
    "fraud_small.csv",
    index=False
)

import pandas as pd

df = pd.read_csv("fraud_small.csv")

df['trans_date_trans_time'] = pd.to_datetime(
    df['trans_date_trans_time']
)

df['hour'] = df['trans_date_trans_time'].dt.hour

df['day_of_week'] = (
    df['trans_date_trans_time']
      .dt.dayofweek
)

df['is_weekend'] = (
    df['day_of_week'] >= 5
).astype(int)

df['is_night'] = (
    (df['hour'] < 6) |
    (df['hour'] > 22)
).astype(int)

from math import radians
from math import sin
from math import cos
from math import sqrt
from math import atan2
def haversine(
        lat1,
        lon1,
        lat2,
        lon2):

    R = 6371

    dlat = radians(lat2-lat1)
    dlon = radians(lon2-lon1)

    a = (
        sin(dlat/2)**2 +
        cos(radians(lat1)) *
        cos(radians(lat2)) *
        sin(dlon/2)**2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1-a)
    )

    return R*c

df['distance'] = df.apply(
    lambda row:
    haversine(
        row['lat'],
        row['long'],
        row['merch_lat'],
        row['merch_long']
    ),
    axis=1
)

df['txn_count_customer'] = (
    df.groupby('cc_num')
      ['amt']
      .transform('count')
)

df['avg_customer_amt'] = (
    df.groupby('cc_num')
      ['amt']
      .transform('mean')
)

df.to_csv(
    "fraud_features.csv",
    index=False
)

df.head()
df.columns

import pandas as pd
import torch
from torch_geometric.data import HeteroData

df = pd.read_csv("fraud_features.csv")

customer_map = {
    v:i
    for i,v in enumerate(df['cc_num'].unique())
}

df['customer_id'] = df['cc_num'].map(customer_map)

merchant_map = {
    v:i
    for i,v in enumerate(df['merchant'].unique())
}

df['merchant_id'] = df['merchant'].map(merchant_map)
import joblib

joblib.dump(customer_map, "customer_map.pkl")
joblib.dump(merchant_map, "merchant_map.pkl")

print("Maps saved successfully")

df['transaction_id'] = range(len(df))

data = HeteroData()

customer_features = (
    df.groupby('customer_id')
      [['avg_customer_amt',
        'txn_count_customer']]
      .first()
)

data['customer'].x = torch.tensor(
    customer_features.values,
    dtype=torch.float
)

merchant_features = (
    df.groupby('merchant_id')
      [['amt']]
      .mean()
)

data['merchant'].x = torch.tensor(
    merchant_features.values,
    dtype=torch.float
)

txn_features = df[
    [
        'amt',
        'hour',
        'is_night',
        'distance'
    ]
]

data['transaction'].x = torch.tensor(
    txn_features.values,
    dtype=torch.float
)

customer_txn_edge = torch.tensor(
[
    df['customer_id'].values,
    df['transaction_id'].values
],
dtype=torch.long
)

data[
'customer',
'makes_transaction',
'transaction'
].edge_index = customer_txn_edge

txn_merchant_edge = torch.tensor(
[
    df['transaction_id'].values,
    df['merchant_id'].values
],
dtype=torch.long
)

data[
'transaction',
'pays_merchant',
'merchant'
].edge_index = txn_merchant_edge

data['transaction', 'made_by', 'customer'].edge_index = torch.stack([
    customer_txn_edge[1],
    customer_txn_edge[0]
])

data['merchant', 'receives_from', 'transaction'].edge_index = torch.stack([
    txn_merchant_edge[1],
    txn_merchant_edge[0]
])

print(data.metadata())

data['transaction'].y = torch.tensor(
    df['is_fraud'].values,
    dtype=torch.float
)

print(data)

import torch
import torch.nn.functional as F

from torch_geometric.nn import HGTConv
num_txns = data['transaction'].num_nodes

perm = torch.randperm(num_txns)

train_size = int(0.8 * num_txns)

train_idx = perm[:train_size]
test_idx = perm[train_size:]

train_mask = torch.zeros(num_txns, dtype=torch.bool)
test_mask = torch.zeros(num_txns, dtype=torch.bool)

train_mask[train_idx] = True
test_mask[test_idx] = True

data['transaction'].train_mask = train_mask
data['transaction'].test_mask = test_mask

class FraudHGT(torch.nn.Module):

    def __init__(self, hidden_channels=128):
        super().__init__()

        self.customer_lin = torch.nn.Linear(2, hidden_channels)
        self.merchant_lin = torch.nn.Linear(1, hidden_channels)
        self.transaction_lin = torch.nn.Linear(4, hidden_channels)

        self.hgt1 = HGTConv(
            hidden_channels,
            hidden_channels,
            data.metadata(),
            heads=4
        )

        self.hgt2 = HGTConv(
            hidden_channels,
            hidden_channels,
            data.metadata(),
            heads=4
        )

        self.classifier = torch.nn.Linear(
            hidden_channels,
            1
        )

    def forward(self, data):

        x_dict = {
            'customer': self.customer_lin(data['customer'].x),
            'merchant': self.merchant_lin(data['merchant'].x),
            'transaction': self.transaction_lin(data['transaction'].x)
        }

        x_dict = self.hgt1(
            x_dict,
            data.edge_index_dict
        )

        x_dict = {
            k: F.relu(v)
            for k,v in x_dict.items()
        }

        x_dict = self.hgt2(
            x_dict,
            data.edge_index_dict
        )

        x_dict = {
            k: F.relu(v)
            for k,v in x_dict.items()
        }

        return self.classifier(
            x_dict['transaction']
        ).squeeze()

model = FraudHGT()

print(model)

y = data['transaction'].y

num_pos = (y == 1).sum()
num_neg = (y == 0).sum()

print(num_neg)
print(num_pos)

pos_weight = torch.tensor(
    [num_neg / num_pos],
    dtype=torch.float
)

from torchvision.ops import sigmoid_focal_loss
# loss_fn= sigmoid_focal_loss(
#     train_logits,
#     train_labels.float(),
#     alpha=0.75,
#     gamma=2.0,
#     reduction="mean"
# )

optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001
)

print(data.metadata())

print(data['customer'].x.shape)
print(data['merchant'].x.shape)
print(data['transaction'].x.shape)

x_dict = {
    'customer': model.customer_lin(data['customer'].x),
    'merchant': model.merchant_lin(data['merchant'].x),
    'transaction': model.transaction_lin(data['transaction'].x)
}

print(x_dict.keys())

for epoch in range(200):

    model.train()

    optimizer.zero_grad()

    logits = model(data)

    train_logits = logits[
        data['transaction'].train_mask
    ]

    train_labels = data['transaction'].y[
        data['transaction'].train_mask
    ]

    loss = sigmoid_focal_loss(
        train_logits,
        train_labels.float(),
        alpha=0.8,
        gamma=2,
        reduction="mean"
    )

    loss.backward()
    optimizer.step()

    print(f"Epoch {epoch+1} Loss {loss.item():.4f}")

model.eval()

with torch.no_grad():

    logits = model(data)

    probs = torch.sigmoid(logits)

    test_probs = probs[
        data['transaction'].test_mask
    ]

    test_labels = data['transaction'].y[
        data['transaction'].test_mask
    ]

print(test_probs[:20])

preds = (test_probs > 0.8).int()

from sklearn.metrics import classification_report

print(
    classification_report(
        test_labels.cpu(),
        preds.cpu(),
        zero_division=0
    )
)

from sklearn.metrics import roc_auc_score, recall_score

# ROC-AUC uses probabilities
auc = roc_auc_score(
    test_labels.cpu(),
    test_probs.cpu()
)

# Convert probabilities to binary predictions
test_preds = (test_probs > 0.8).int()

# Recall uses class labels
recall = recall_score(
    test_labels.cpu(),
    test_preds.cpu()
)

print("Recall:", recall)
print("ROC-AUC:", auc)

print("Total Test Samples:", len(preds))
print("Predicted Fraud:", preds.sum().item())
print("Actual Fraud:", int(test_labels.sum().item()))

# for t in [0.5, 0.6, 0.7, 0.8, 0.9]:

#     preds = (test_probs > t).int()

#     print("\nThreshold:", t)

#     print(
#         classification_report(
#             test_labels.cpu(),
#             preds.cpu(),
#             zero_division=0
#         )
#     )

[
 'amt',
 'hour',
 'is_night',
 'distance'
]

normal_df = df[
    df['is_fraud'] == 0
]

X_normal = normal_df[
    ['amt',
     'hour',
     'is_night',
     'distance']
].values

from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

X_normal = scaler.fit_transform(
    X_normal
)
import joblib

joblib.dump(scaler, "scaler.pkl")

print("Scaler saved successfully")

import torch

X_normal = torch.tensor(
    X_normal,
    dtype=torch.float
)

class AutoEncoder(torch.nn.Module):

    def __init__(self):

        super().__init__()

        self.encoder = torch.nn.Sequential(

            torch.nn.Linear(4,32),
            torch.nn.ReLU(),

            torch.nn.Linear(32,16),
            torch.nn.ReLU(),

            torch.nn.Linear(16,8)
        )

        self.decoder = torch.nn.Sequential(

            torch.nn.Linear(8,16),
            torch.nn.ReLU(),

            torch.nn.Linear(16,32),
            torch.nn.ReLU(),

            torch.nn.Linear(32,4)
        )

    def forward(self,x):

        z = self.encoder(x)

        out = self.decoder(z)

        return out

ae = AutoEncoder()

optimizer = torch.optim.Adam(
    ae.parameters(),
    lr=0.001
)

loss_fn = torch.nn.MSELoss()

for epoch in range(20):

    optimizer.zero_grad()

    recon = ae(X_normal)

    loss = loss_fn(
        recon,
        X_normal
    )

    loss.backward()

    optimizer.step()

    print(
        epoch,
        loss.item()
    )

X_all = df[
    [
        'amt',
        'hour',
        'is_night',
        'distance'
    ]
].values

X_all = scaler.transform(X_all)

X_all = torch.tensor(
    X_all,
    dtype=torch.float
)

ae.eval()

with torch.no_grad():

    recon = ae(X_all)

    errors = torch.mean(
        (recon - X_all) ** 2,
        dim=1
    )
print(errors[:20])

df['anomaly_score'] = (
    errors.numpy()
)

print(
    df.groupby('is_fraud')
      ['anomaly_score']
      .mean()
)

df.groupby('is_fraud')['anomaly_score'].mean()

anomaly_norm = (
    errors - errors.min()
) / (
    errors.max() - errors.min()
)

model.eval()

with torch.no_grad():

    logits = model(data)

    hgt_probs = torch.sigmoid(logits)

final_score = (
    0.7 * hgt_probs
    +
    0.3* anomaly_norm
)

# from sklearn.metrics import classification_report

# for t in [0.5,0.6,0.7,0.8]:

#     preds = (final_score > t).int()

#     print("\nThreshold:",t)

#     print(
#         classification_report(
#             data['transaction'].y.cpu(),
#             preds.cpu(),
#             zero_division=0
#         )
#     )

# for t in [0.7,0.8]:
#     preds = (final_score > t).int()

#     print("\nThreshold:",t)

#     print(
#         classification_report(
#             data['transaction'].y.cpu(),
#             preds.cpu(),
#             zero_division=0
#         )
#     )

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

def evaluate_model(y_true, y_pred, y_prob, name):

    print(f"\n{name}")
    print("-" * 40)

    print("Accuracy :", accuracy_score(y_true, y_pred))
    print("Precision:", precision_score(y_true, y_pred))
    print("Recall   :", recall_score(y_true, y_pred))
    print("F1 Score :", f1_score(y_true, y_pred))
    print("ROC AUC  :", roc_auc_score(y_true, y_prob))


from sklearn.metrics import precision_score, recall_score, f1_score
import numpy as np
best_f1 = 0
best_t = 0

for t in np.arange(0.05, 0.95, 0.01):

    preds = (final_score > t).int()

    p = precision_score(
        data['transaction'].y.cpu(),
        preds.cpu(),
        zero_division=0
    )

    r = recall_score(
        data['transaction'].y.cpu(),
        preds.cpu(),
        zero_division=0
    )

    f1 = f1_score(
        data['transaction'].y.cpu(),
        preds.cpu(),
        zero_division=0
    )

    if f1 > best_f1:
        best_f1 = f1
        best_t = t

print("Best Threshold:", best_t)
print("Best F1:", best_f1)
hgt_pred = (hgt_probs > best_t).int()

evaluate_model(
    data['transaction'].y.cpu(),
    hgt_pred.cpu(),
    hgt_probs.cpu(),
    "HGT Only"
)

hybrid_pred = (final_score >best_t).int()

evaluate_model(
    data['transaction'].y.cpu(),
    hybrid_pred.cpu(),
    final_score.cpu(),
    "Hybrid Model"
)


from sklearn.metrics import confusion_matrix

print("HGT")

print(
    confusion_matrix(
        data['transaction'].y.cpu(),
        hgt_pred.cpu()
    )
)

print("\nHybrid")

print(
    confusion_matrix(
        data['transaction'].y.cpu(),
        hybrid_pred.cpu()
    )
)

cm_hgt = confusion_matrix(
    data['transaction'].y.cpu(),
    hgt_pred.cpu()
)

cm_hybrid = confusion_matrix(
    data['transaction'].y.cpu(),
    hybrid_pred.cpu()
)

fp_hgt = cm_hgt[0][1]
fp_hybrid = cm_hybrid[0][1]

reduction = (
    (fp_hgt - fp_hybrid)
    / fp_hgt
) * 100

print(
    "False Positive Reduction:",
    reduction,
    "%"
)

prec_hgt = precision_score(
    data['transaction'].y.cpu(),
    hgt_pred.cpu()
)

prec_hybrid = precision_score(
    data['transaction'].y.cpu(),
    hybrid_pred.cpu()
)

improvement = (
    (prec_hybrid - prec_hgt)
    / prec_hgt
) * 100

print(
    "Precision Improvement:",
    improvement,
    "%"
)

idx = 2389
sample = df.loc[idx]

print(sample[['is_fraud']])

score = final_score[idx].item()

prediction = "FRAUD" if score > 0.5 else "SAFE"

print("Prediction :", prediction)
print("Hybrid Score:", score)
print("Actual Label:", sample['is_fraud'])

torch.save(model.state_dict(),"hgt_model1.pth")
torch.save(ae.state_dict(),"autoencoder1.pth")

print(df.columns.tolist())