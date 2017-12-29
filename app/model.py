import pandas as pd
import os
from sklearn.externals import joblib

MODEL_FOLDER = os.path.join("..", "models")

MIN_AGE = 25
MAX_AGE = 80

MAX_CHOL = 400
MIN_CHOL = 100

to_convert = ["age_bin", "sex", "htn", "fbs", "famhist", "has_smoked", "chol_bin", "years_bin", "cigs_bin"]
features = ['{}_code'.format(t) for t in to_convert]


def create_df(htn, fbs, famhist, sex, age, chol, cigs, years):
    # Has smoked
    has_smoked = 1 if cigs or years else 0

    # Classify AGE
    age_bin = int(max(0, age - MIN_AGE) / 5) if age < MAX_AGE else int(MAX_AGE / 5)

    # Classify CHOL
    chol_bin = int(max(0, chol - MIN_CHOL) / 50) if chol < MAX_CHOL else int(MAX_CHOL / 50)

    # Classify CIGS
    cigs_bin = int(cigs / 20) + 1 if cigs > 0 else 0

    # Classify YEARS
    years_bin = int(years / 10) + 1 if years > 0 else 0

    df = pd.DataFrame(
        columns=["htn", "fbs", "famhist", "sex", "age_bin", "chol_bin", "cigs_bin", "years_bin", "has_smoked"],
        data=[[htn, fbs, famhist, sex, age_bin, chol_bin, cigs_bin, years_bin, has_smoked]])

    for t in to_convert:
        df['{}_code'.format(t)] = df[t].astype(int)

    return df


def predict_prob(df, model="LogisticRegressionCV"):
    clf = joblib.load(os.path.join(MODEL_FOLDER, "{}.pkl".format(model)))
    return clf.predict_proba(df[features])[0]
