from flask import Flask, Response, request, jsonify, stream_with_context
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS

client = MongoClient('mongodb://db:27017/')
db = client.appdb
applications = db.applications

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return Response(db.collection_names(), status=200, mimetype="application/json")

@app.route("/search")
def search():
    search_param = request.args.get("application")
    json_docs = []
    for doc in applications.find({"application_name": search_param}):
        json_doc = json.dumps(doc, default=json_util.default)
        json_docs.append(json_doc)
    return Response(json_docs, status=200, mimetype="application/json")



@app.route("/get")
def get():
    retrieve_param = request.args.get("application")
    result = applications.find_one({'_id': ObjectId(retrieve_param)})
    output = {'application_name' : result['application_name'], 'application_status' : result['application_status']}

    return jsonify({'result' : output})

@app.route("/applications")
def get_applications():
    json_doc = dumps(applications.find())
    return Response(json_doc, status=200, mimetype="application/json")

@app.route("/new-application", methods=['POST'])
def create_application():
    application_name = request.json['application_name']
    status = request.json['application_status']
    post_id = applications.insert_one({'application_name': application_name, 'application_status': status}).inserted_id
    new_application = applications.find_one({'_id': post_id })
    output = {'application_name' : new_application['application_name'], 'application_status' : new_application['application_status']}
    return jsonify({'result' : output})

@app.route("/edit", methods=['PUT'])
# @cross_origin()
def update_application():
    req_data = request.get_json()
    post_id = request.json['_id']
    updated_application_name = request.json['application_name']
    updated_application_status = request.json['application_status']
    
    updated_application = applications.replace_one({'_id': ObjectId(post_id)}, {'application_name': updated_application_name, 'application_status': updated_application_status})
    # updated_application.headers.add('Access-Control-Allow-Origin', '*')
    return Response(update_application)

@app.route("/delete", methods=['DELETE'])
def delete_application():
    doc_id = request.args.get("application")
    deleted_document = applications.delete_one({'_id': ObjectId(doc_id)})
    return Response(deleted_document)

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)