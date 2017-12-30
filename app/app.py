from flask import Flask, current_app
from flask import jsonify

from . import model

app = Flask(__name__)


# htn = 1
# fbs = 1
# famhist = 1
# sex = 0
# age = 54
# chol = 200
# cigs = 10
# years = 30
@app.route('/<int:htn>/<int:fbs>/<int:famhist>/<int:sex>/<int:age>/<int:chol>/<int:cigs>/<int:years>')
def get_probabilities(htn, fbs, famhist, sex, age, chol, cigs, years):
    df = model.create_df(htn, fbs, famhist, sex, age, chol, cigs, years)
    prob = model.predict_prob(df)
    return jsonify(list(prob))


@app.route('/')
def home():
    return current_app.send_static_file('index.html')
