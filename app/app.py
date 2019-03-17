from flask import Flask, Response, request, jsonify, stream_with_context
from pymongo import MongoClient
import json

client = MongoClient('mongodb://db:27017/')
db = client.test_database
collection = db.test_collection
posts = db.posts

app = Flask(__name__)

@app.route("/")
def hello():
    return Response(db.collection_names())

@app.route("/new-user", methods=['POST'])
def user_response():
    req_data = request.get_json()
    name = request.json['name']
    email = request.json['email']
    post_id = posts.insert_one({'name': name, 'email': email}).inserted_id
    new_post = posts.find_one({'_id': post_id })
    output = {'name' : new_post['name'], 'email' : new_post['email']}
    return jsonify({'result' : output})

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)