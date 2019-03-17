from flask import Flask, Response
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test_database
collection = db.test_collection
posts = db.posts
# post_id = posts.insert_one(post).inserted_id


app = Flask(__name__)


@app.route("/")
def hello():
    return Response("Hi from your Flask app running in your Docker container!")

@app.route("/user")
def hello():
    return Response("Hi from your Flask app running in your Docker container!")

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)