import secrets

API_KEY = secrets.token_hex(16)  # Generates a random 32-character hex string
print(f"Your API Key: {API_KEY}")
