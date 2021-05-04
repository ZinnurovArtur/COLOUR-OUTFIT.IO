import os
import uuid
from Outfit_selection import *
from flask import Flask, request, render_template, send_file

api = Flask(__name__)


@api.route('/')
def index():
    return render_template('index.html')

# generate  the page with data
@api.route('/outfit-upload', methods=['POST'])
def outfit_upload():
    data = request.form

    image_file = request.files['outfit']
    filename = os.path.join('uploads', str(uuid.uuid1()) + '.' + image_file.filename.split('.')[-1])
    image_file.save(filename)

    # get the input of saturation bar
    print("Saturation is: " + request.form['saturation'])
    run(filename, int(request.form['saturation']))

    # output the rendered image
    returned_image = filename
    returned_image = "out2.png"

    return send_file(returned_image, mimetype='image/png')


if __name__ == '__main__':
    api.run()
