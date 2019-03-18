from flask import Flask, Response, request, jsonify, stream_with_context
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS

client = MongoClient('mongodb://db:27017/')
db = client.test_database
collection = db.test_collection
users = db.users

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return Response(db.collection_names(), status=200, mimetype="application/json")

@app.route("/search")
def search():
    search_param = request.args.get("user")
    json_docs = []
    for doc in users.find({"name": search_param}):
        json_doc = json.dumps(doc, default=json_util.default)
        json_docs.append(json_doc)
    return Response(json_docs, status=200, mimetype="application/json")

@app.route("/users")
def get_users():
    json_doc = dumps(users.find())
    return Response(json_doc)

@app.route("/new-user", methods=['POST'])
def user_response():
    req_data = request.get_json()
    name = request.json['name']
    email = request.json['email']
    post_id = users.insert_one({'name': name, 'email': email}).inserted_id
    new_user = users.find_one({'_id': post_id })
    output = {'name' : new_user['name'], 'email' : new_user['email']}
    return jsonify({'result' : output})

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)