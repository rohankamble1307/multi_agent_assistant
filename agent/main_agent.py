from agents.ai_agent import handle_ai
from agents.task_agent import handle_task

def route_request(user_input):
    user_input = user_input.lower()

    if "task" in user_input:
        return handle_task(user_input)

    return handle_ai(user_input)