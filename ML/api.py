from flask import Flask, jsonify, request
import base64

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    file_name = data['file_name']
    base64_data = data['data']
    print('File name:', file_name)
    print('Base64 data:', base64_data)
    return jsonify({'finalscore': 0.9, 'matches': 10})


if __name__ == '__main__':
    app.run(debug=False)