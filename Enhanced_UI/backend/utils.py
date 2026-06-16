import pandas as pd
import numpy as np

def preprocess(df):

    df['trans_date_trans_time'] = pd.to_datetime(
        df['trans_date_trans_time']
    )

    df['hour'] = (
        df['trans_date_trans_time']
        .dt.hour
    )

    df['day'] = (
        df['trans_date_trans_time']
        .dt.dayofweek
    )

    df['txn_during_night'] = (
        ((df['hour'] <= 5) |
         (df['hour'] >= 23))
    ).astype(int)

    return df