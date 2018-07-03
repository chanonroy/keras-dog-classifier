import os
import base64
import numpy as np
import io
import json
from PIL import Image

import keras
from keras import backend as K
from keras.models import Sequential, load_model
from keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
from flask import Flask, request, jsonify

app = Flask(__name__)

MODEL_PATH = './models/'
IMG_SIZE = 300

def get_model():
    global model
    model = load_model(MODEL_PATH + 'inception-300.h5')
    model._make_predict_function()
    print('Model Loaded')

def load_dog_name_map():
    with open('dog_map.json') as f:
        mapping = json.load(f)
        print('Dog name map loaded')
        return mapping

def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Write photo to disk, TODO: need to read from memory while using load_img generator
    file_name = 'dog' + '.' + image.format
    image.save(file_name)
    img = load_img(file_name, target_size=target_size)
    os.remove(file_name)

    x = img_to_array(img)
    x = x.reshape((1,) + x.shape)
    x = x/255

    return x

get_model()
DOG_NAME_MAP = load_dog_name_map()

@app.route("/predict", methods=["POST"])
def predict():
    message = request.get_json(force=True)
    encoded = message['image'].split(',')[1]
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocess_image(image, target_size=(IMG_SIZE, IMG_SIZE))

    prediction_array = model.predict(processed_image).tolist()[0]

    # Find top three predictions from prediction list
    predictions = []
    index_array = np.argpartition(prediction_array, -3)[-3:].tolist()

    for index in index_array[::-1]:
        predictions.append({
            'name': DOG_NAME_MAP[str(index)],
            'confidence': prediction_array[index]
        })

    response = {
        'prediction': predictions
    }

    return jsonify(response)
