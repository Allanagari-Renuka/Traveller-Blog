from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import uuid
import logging

app = Flask(__name__)
users = []
CORS(app)

logging.basicConfig(level=logging.DEBUG)

# In-memory data store for posts
posts = []

# Sample data for destinations
destinations = [
    {
        "id": "paris",
        "name": "Paris, France",
        "description": "The city of lights, love, and iconic landmarks.",
        "image": "https://placehold.co/600x400.png",
        "tags": ["Europe", "City Break", "Culture", "Romance"]
    },
    {
        "id": "bali",
        "name": "Bali, Indonesia",
        "description": "An island paradise known for its volcanic mountains and coral reefs.",
        "image": "https://placehold.co/600x400.png",
        "tags": ["Asia", "Beach", "Nature", "Spirituality", "Surfing"]
    }
]

# Sample data for experiences
experiences = [
    {
        "id": "adventure-travel",
        "name": "Adventure Travel",
        "description": "Thrilling escapades from mountain treks to jungle expeditions.",
        "image": "https://placehold.co/600x400.png",
        "tags": ["Hiking", "Trekking", "Extreme Sports", "Exploration"]
    },
    {
        "id": "culinary-journeys",
        "name": "Culinary Journeys",
        "description": "Explore the world one bite at a time.",
        "image": "https://placehold.co/600x400.png",
        "tags": ["Foodie", "Local Cuisine", "Cooking", "Street Food"]
    }
]

@app.route('/posts', methods=['GET'])
def get_posts():
    app.logger.debug(f"Fetching all posts, current count: {len(posts)}")
    return jsonify(posts), 200

@app.route('/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    app.logger.debug(f"Fetching post with id: {post_id}")
    post = next((p for p in posts if p['id'] == post_id), None)
    if post is None:
        app.logger.warning(f"Post with id {post_id} not found")
        abort(404)
    return jsonify(post), 200

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    app.logger.debug(f"Received data for new post: {data}")
    if not data or 'title' not in data or 'content' not in data:
        app.logger.error("Invalid post data received")
        abort(400)
    new_post = {
        'id': str(uuid.uuid4()),
        'title': data['title'],
        'excerpt': data.get('excerpt', ''),
        'content': data['content'],
        'published': data.get('published', True),
        'author_id': data.get('author_id', ''),
        'country': data.get('country', ''),
        'destination': data.get('destination', ''),
        'created_at': data.get('created_at', ''),
    }
    posts.append(new_post)
    app.logger.debug(f"Post created with id: {new_post['id']}")
    return jsonify(new_post), 201

@app.route('/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    app.logger.debug(f"Updating post with id: {post_id}")
    post = next((p for p in posts if p['id'] == post_id), None)
    if post is None:
        app.logger.warning(f"Post with id {post_id} not found for update")
        abort(404)
    data = request.get_json()
    app.logger.debug(f"Update data: {data}")
    post.update({
        'title': data.get('title', post['title']),
        'excerpt': data.get('excerpt', post.get('excerpt', '')),
        'content': data.get('content', post['content']),
        'published': data.get('published', post.get('published', True)),
        'author_id': data.get('author_id', post.get('author_id', '')),
        'country': data.get('country', post.get('country', '')),
        'destination': data.get('destination', post.get('destination', '')),
        'created_at': data.get('created_at', post.get('created_at', '')),
    })
    app.logger.debug(f"Post with id {post_id} updated")
    return jsonify(post), 200

@app.route('/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    global posts
    app.logger.debug(f"Deleting post with id: {post_id}")
    posts = [p for p in posts if p['id'] != post_id]
    app.logger.debug(f"Post with id {post_id} deleted")
    return '', 204

@app.route('/destinations', methods=['GET'])
def get_destinations():
    app.logger.debug(f"Fetching all destinations, count: {len(destinations)}")
    return jsonify(destinations), 200

@app.route('/experiences', methods=['GET'])
def get_experiences():
    app.logger.debug(f"Fetching all experiences, count: {len(experiences)}")
    return jsonify(experiences), 200

# @app.route('/auth/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')
#     app.logger.debug(f"Login attempt for user: {username}")
#     # Mock authentication logic
#     if username == 'testuser' and password == 'password':
#         return jsonify({"message": "Login successful", "token": "fake-jwt-token"}), 200
#     else:
#         return jsonify({"message": "Invalid credentials"}), 401

# @app.route('/auth/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')
#     app.logger.debug(f"Register attempt for user: {username}")
#     # Mock registration logic
#     if username and password:
#         return jsonify({"message": "Registration successful"}), 201
#     else:
#         return jsonify({"message": "Missing username or password"}), 400

# @app.route('/', methods=['GET'])
# def home():
#     return "Backend API is running", 200

# ...existing code...


@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    app.logger.debug(f"Register attempt for user: {username}")
    # Check if user already exists
    if any(u['username'] == username for u in users):
        return jsonify({"message": "User already registered"}), 400
    if username and password:
        user = {"username": username, "password": password}
        users.append(user)
        return jsonify({"message": "Registration successful", "user": user}), 201
    else:
        return jsonify({"message": "Missing username or password"}), 400

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    app.logger.debug(f"Login attempt for user: {username}")
    # Check user credentials
    user = next((u for u in users if u['username'] == username and u['password'] == password), None)
    if user:
        return jsonify({"message": "Login successful", "token": "fake-jwt-token", "user": user}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users), 200

@app.route('/', methods=['GET'])
def home():
    return "Backend API is running", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
