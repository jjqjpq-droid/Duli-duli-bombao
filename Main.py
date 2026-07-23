import requests
import json

messages = []

print("AI Chat Started")
print("Type exit to quit\n")

while True:

    user = input("You: ")

    if user.lower() == "exit":
        break

    messages.append({
        "role": "user",
        "content": user
    })

    payload = {
        "messages": messages,
        "model": "dolphinserver:24B",
        "template": "code-advanced"
    }

    print("\nAI: ", end="", flush=True)

    response_text = ""

    r = requests.post(
        "https://chat.dphn.ai/api/chat",
        json=payload,
        stream=True
    )

    for line in r.iter_lines():

        if not line:
            continue

        line = line.decode("utf-8")

        if not line.startswith("data: "):
            continue

        data = line[6:]

        if data == "[DONE]":
            break

        try:
            obj = json.loads(data)

            delta = obj["choices"][0]["delta"]

            if "content" in delta:
                token = delta["content"]

                print(token, end="", flush=True)

                response_text += token

        except:
            pass

    print("\n")

    messages.append({
        "role": "assistant",
        "content": response_text
    })
    
    
