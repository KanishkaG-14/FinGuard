import torch
import torch.nn.functional as F
from torch_geometric.nn import HGTConv

# =====================================================
# HGT METADATA
# =====================================================

METADATA = (
    ['customer', 'merchant', 'transaction'],
    [
        ('customer', 'makes_transaction', 'transaction'),
        ('transaction', 'pays_merchant', 'merchant'),
        ('transaction', 'made_by', 'customer'),
        ('merchant', 'receives_from', 'transaction')
    ]
)

# =====================================================
# FRAUD HGT MODEL
# =====================================================

class FraudHGT(torch.nn.Module):

    def __init__(self, hidden_channels=128):

        super().__init__()

        self.customer_lin = torch.nn.Linear(
            2,
            hidden_channels
        )

        self.merchant_lin = torch.nn.Linear(
            1,
            hidden_channels
        )

        self.transaction_lin = torch.nn.Linear(
            4,
            hidden_channels
        )

        self.hgt1 = HGTConv(
            hidden_channels,
            hidden_channels,
            METADATA,
            heads=4
        )

        self.hgt2 = HGTConv(
            hidden_channels,
            hidden_channels,
            METADATA,
            heads=4
        )

        self.classifier = torch.nn.Linear(
            hidden_channels,
            1
        )

    def forward(self, data):

        x_dict = {

            'customer':
                self.customer_lin(
                    data['customer'].x
                ),

            'merchant':
                self.merchant_lin(
                    data['merchant'].x
                ),

            'transaction':
                self.transaction_lin(
                    data['transaction'].x
                )
        }

        x_dict = self.hgt1(
            x_dict,
            data.edge_index_dict
        )

        x_dict = {
            k: F.relu(v)
            for k, v in x_dict.items()
        }

        x_dict = self.hgt2(
            x_dict,
            data.edge_index_dict
        )

        x_dict = {
            k: F.relu(v)
            for k, v in x_dict.items()
        }

        return self.classifier(
            x_dict['transaction']
        ).squeeze()

# =====================================================
# AUTOENCODER
# =====================================================

class AutoEncoder(torch.nn.Module):

    def __init__(self):

        super().__init__()

        self.encoder = torch.nn.Sequential(

            torch.nn.Linear(4, 32),
            torch.nn.ReLU(),

            torch.nn.Linear(32, 16),
            torch.nn.ReLU(),

            torch.nn.Linear(16, 8)
        )

        self.decoder = torch.nn.Sequential(

            torch.nn.Linear(8, 16),
            torch.nn.ReLU(),

            torch.nn.Linear(16, 32),
            torch.nn.ReLU(),

            torch.nn.Linear(32, 4)
        )

    def forward(self, x):

        z = self.encoder(x)

        out = self.decoder(z)

        return out