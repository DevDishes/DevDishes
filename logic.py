import sqlite3

DB_NAME = 'recipes.db'

def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                password TEXT,
                first_name TEXT,
                last_name TEXT,
                email TEXT
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS recipes (
                title TEXT,
                content TEXT
            )
        ''')
        conn.commit()

def check_login(username, password):
    with sqlite3.connect(DB_NAME) as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        return cur.fetchone() is not None

def add_user(username, password, first_name, last_name, email):
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute(
            "INSERT INTO users (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)",
            (username, password, first_name, last_name, email)
        )
        conn.commit()

def get_recipes():
    with sqlite3.connect(DB_NAME) as conn:
        cur = conn.cursor()
        cur.execute("SELECT title, content FROM recipes")
        return cur.fetchall()

def add_recipe(title, content):
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute(
            "INSERT INTO recipes (title, content) VALUES (?, ?)",
            (title, content)
        )
        conn.commit()
