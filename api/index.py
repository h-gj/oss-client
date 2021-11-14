from uuid import uuid4

from flask import Flask, jsonify, request
from flask_cors import CORS

from api.oss_helper import list_files, sign_file, upload_to_oss

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"*": {"origins": "*"}})

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)


@app.route("/", methods=['POST', 'GET'])
@limiter.limit("1 per minute", methods=['POST'])
def hello_world():
    if request.method == 'POST':
        f = request.files['file']
        filename = f.filename
        if filename in ('image.png', 'image.jpg', 'image.jpeg'):
            ext = filename.split('.')[-1]
            filename = str(uuid4()).replace('-', '') + '.' + ext
        upload_to_oss(filename, f)
        return jsonify({"success": True})

    files = list_files()
    return jsonify({'files': files})


@app.route("/sign", methods=['POST'])
def sign_object():
    fn = request.json.get('filename')
    signed_file_url = sign_file(fn)
    return signed_file_url
