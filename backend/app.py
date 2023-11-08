from flask import Flask, request, jsonify
from backend.database import export_data_to_csv_util
from backend.language_model import get_answer_from_model_util

app = Flask(__name__)


@app.route('/export_data_to_csv', methods=['POST'])
def export_data_to_csv():
    result = export_data_to_csv_util()
    return result


@app.route('/get_answer_from_model', methods=['GET'])
def get_answer_from_model():
    prompt = request.args.get('prompt')
    answer = get_answer_from_model_util(prompt)
    result = {"prompt": prompt, "answer": answer}
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
