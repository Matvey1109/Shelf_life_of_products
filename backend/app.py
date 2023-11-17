from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.database import export_data_to_csv_util
from backend.language_model import get_answer_from_model_util

app = Flask(__name__)
cors = CORS(app)


@app.route('/export_data_to_csv', methods=['POST'])
def export_data_to_csv():
    result = export_data_to_csv_util()
    return result


@app.route('/get_answer_from_model', methods=['POST'])
def get_answer_from_model():
    # url: http://127.0.0.1:5000/get_answer_from_model
    # body params: {
    #   "product": "Гречка",
    #   "param": "Условие",
    #   "condition_param": "Комнатная температура",
    #   "vacuum": true
    # }
    data = request.get_json()
    product = data['product']
    param = data['param']
    vacuum = data['vacuum']
    condition_param = data.get('condition_param')
    temperature_param = data.get('temperature_param')

    answer = get_answer_from_model_util(product, param, vacuum, condition_param, temperature_param)
    return str(answer)


if __name__ == "__main__":
    app.run(debug=True)
