from Database.db import cursor, conn

def handle_task(user_input):
    user_input = user_input.lower()

    if "add task" in user_input:
        task = user_input.replace("add task", "").strip()

        cursor.execute("INSERT INTO tasks (task) VALUES (?)", (task,))
        conn.commit()

        return f"✅ Task added: {task}"

    elif "show task" in user_input:
        cursor.execute("SELECT * FROM tasks")
        tasks = cursor.fetchall()

        if not tasks:
            return "⚠ No tasks found"

        return tasks

    return "❌ Task command not understood"