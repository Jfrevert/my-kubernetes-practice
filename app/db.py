from pymongo import MongoClient

client = MongoClient()
client = MongoClient('mongodb://db:27017/')

db = client.test_database

post = {"author": "Mike",
         "text": "My first blog post!",
         "tags": ["mongodb", "python", "pymongo"],
         "date": "10/10"}

posts = db.posts
post_id = posts.insert_one(post).inserted_id
post_id
print(post_id)