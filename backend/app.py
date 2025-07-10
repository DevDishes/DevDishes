from flask import Flask, request, jsonify
import sqlite3
import os

app = Flask(__name__)
DB_PATH = os.environ.get('DB_PATH', 'recipes.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL
    )''')
    conn.commit()
    conn.close()

@app.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    name = data.get('name')
    ingredients = data.get('ingredients')
    instructions = data.get('instructions')
    if not all([name, ingredients, instructions]):
        return jsonify({'error': 'Missing fields'}), 400
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)',
              (name, ingredients, instructions))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Recipe added successfully'}), 201

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000) 