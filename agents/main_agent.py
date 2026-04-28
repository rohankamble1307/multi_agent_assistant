from agents.task_agent import handle_task
from agents.ai_agent import handle_ai   
from agents.ai_agent import handle_ai
def route_request(user_input):
    user_input_lower = user_input.lower()

    # 🟢 ADD TASK
    if "add task" in user_input_lower or "create task" in user_input_lower:
        return handle_task(user_input_lower)

    # 🟢 SHOW TASK
    elif "show task" in user_input_lower or "list task" in user_input_lower:
        return handle_task(user_input_lower)

    # 🟢 DELETE TASK 
    elif "delete task" in user_input_lower:
        return handle_task(user_input_lower)

    # 🔵 AI fallback
    return handle_ai(user_input)
