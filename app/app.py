from flask import Flask, Response, request, jsonify, stream_with_context
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS

client = MongoClient('mongodb://db:27017/')
db = client.appdb
components = db.components

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return Response(db.collection_names(), status=200, mimetype="application/json")

@app.route("/search")
def search():
    search_param = request.args.get("component")
    json_docs = []
    for doc in components.find({"component_name": search_param}):
        json_doc = json.dumps(doc, default=json_util.default)
        json_docs.append(json_doc)
    return Response(json_docs, status=200, mimetype="application/json")



@app.route("/get")
def get():
    retrieve_param = request.args.get("component")
    result = components.find_one({'_id': ObjectId(retrieve_param)})
    output = {'component_name' : result['component_name'], 'component_status' : result['component_status']}

    return jsonify({'result' : output})



@app.route("/components")
def get_components():
    json_doc = dumps(components.find())
    return Response(json_doc, status=200, mimetype="application/json")

@app.route("/new-component", methods=['POST'])
def create_component_response():
    component_name = request.json['component_name']
    status = request.json['component_status']
    post_id = components.insert_one({'component_name': component_name, 'component_status': status}).inserted_id
    new_component = components.find_one({'_id': post_id })
    output = {'component_name' : new_component['component_name'], 'component_status' : new_component['component_status']}
    return jsonify({'result' : output})

@app.route("/edit", methods=['PUT'])
# @cross_origin()
def update_component_response():
    req_data = request.get_json()
    post_id = request.json['_id']
    updated_component_name = request.json['component_name']
    updated_component_status = request.json['component_status']
    
    updated_component = components.replace_one({'_id': ObjectId(post_id)}, {'component_name': updated_component_name, 'component_status': updated_component_status})
    # updated_component.headers.add('Access-Control-Allow-Origin', '*')
    return Response('', status=200, mimetype="application/json")

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)