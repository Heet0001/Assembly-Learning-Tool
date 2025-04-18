from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# JDoodle credentials
CLIENT_ID = "1d7103e938bce4f2c3e74c172e7f5f1c"
CLIENT_SECRET = "b7369eb7da1e03b6fdcc96c77556170b921f24c7718732e58eb8259cfc28bce5"

@app.route('/execute', methods=['POST'])
def execute():
    data = request.get_json()
    payload = {
        "clientId": CLIENT_ID,
        "clientSecret": CLIENT_SECRET,
        "script": data.get("script", ""),
        "stdin": data.get("stdin", ""),
        "language": "nasm",
        "versionIndex": "0"
    }

    try:
        response = requests.post("https://api.jdoodle.com/v1/execute", json=payload)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-pdf/<id>', methods=['GET'])
def generate_pdf(id):
    try:
        # Your PDF generation logic here
        # For now returning a mock response
        return jsonify({"pdfUrl": f"/pdfs/tutorial_{id}.pdf"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)