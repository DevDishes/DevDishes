from flask import Flask, render_template, request, redirect, session
import logic  # זה הקובץ שיצרנו

app = Flask(__name__)
app.secret_key = 'supersecret'

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form['username']
        pwd = request.form['password']
        if logic.check_login(user, pwd):
            session['user'] = user
            return redirect('/dashboard')
        return "Login failed"
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        first = request.form['first_name']
        last = request.form['last_name']
        email = request.form['email']
        user = request.form['username']
        pwd = request.form['password']
        try:
            logic.add_user(user, pwd, first, last, email)
            return redirect('/')
        except:
            return "Username already exists"
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect('/')
    recipes = logic.get_recipes()
    return render_template('dashboard.html', recipes=recipes)

@app.route('/add', methods=['GET', 'POST'])
def add():
    if 'user' not in session:
        return redirect('/')
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        logic.add_recipe(title, content)
        return redirect('/dashboard')
    return render_template('add_recipe.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    logic.init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
