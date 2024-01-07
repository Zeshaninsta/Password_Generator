# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import string
import random
import os

app = Flask(__name__)

CORS(app, resources={r"/generate_password": {"origins": "*"}})

# Enable CORS for your Flask app
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]  # This will enable CORS for the entire application
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",  # Include POST method
    "PUT",
]
CORS_ORIGIN_WHITELIST = "http://localhost:3000"


@app.route("/generate_password", methods=["POST"])
def generate_password():
    data = request.get_json()  # Parse JSON data from the request
    if data is None:
        return jsonify({"error": "Invalid JSON data"}), 400

    # length = data.get('length', 8)  # Get the password length from JSON, default to 12 if not provided
    # userinput = data.get('userinput', )
    # if int(length) > 8 or int(length) == '':
    #     return jsonify({"error":"Invalid Input"})
    # user_input = data.get('user_input', '')

    # Define character set for the password
    # char = string.digits + string.ascii_lowercase + string.ascii_uppercase + userinput

    length = data.get("length", 12)
    userinput = data.get(
        "userinput",
    )
    include_special_chars = data.get("includeSpecialChars", False)
    include_uppercase = data.get("includeUppercase", False)
    include_lowercase = data.get("includeLowercase", False)
    include_numbers = data.get("includeNumbers", False)

    if int(length) > 31 or int(length) == "":
        return jsonify({"error": "Invalid Input"})

    char = ""
    if include_special_chars:
        char += string.punctuation
    if include_uppercase:
        char += string.ascii_uppercase
    if include_lowercase:
        char += string.ascii_lowercase
    if include_numbers:
        char += string.digits
    if userinput:
        char += userinput

    # Generate the password
    password = "".join(random.choice(char) for _ in range(int(length)))

    # stongest password length logic

    return jsonify({"password": password})


if __name__ == "__main__":
    app.run(debug=True)
