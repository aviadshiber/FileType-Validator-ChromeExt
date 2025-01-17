import io
import os
from flask import Flask
from flask import request
import filetype
import logging
import yaml

app = Flask(__name__)


def unsafe():
    return 'unsafe'


def safe():
    return 'safe'


@app.route('/analyze', methods=["POST"])
def analyze_content():
    bytes_stream = io.BytesIO(request.data[:512])
    kind = filetype.guess(bytes_stream)
    if kind is None:
        return unsafe()
    with open('configuration.yaml') as config:
        data = yaml.load(config, Loader=yaml.FullLoader)
        policy = data['policy']

    if policy is not None:
        for item in policy.get("block", None):
            if item == kind.mime:
                return unsafe()
        print('File extension: %s' % kind.extension)
        print('File MIME type: %s' % kind.mime)
        return safe()
    else:
        logging.error('Error with loading policy from configuration.yaml')

@app.route('/', methods=["GET"])
def root():
    return 'ok!'

@app.route('/loop', methods=["POST"])
def loop():
    data = request.data
    return data


if __name__ == "__main__":
    port = os.environ.get('PORT')
    if port is None:
        port = 80
    print('using port ', port)
    app.run(port=port,host='0.0.0.0')
