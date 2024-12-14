import requests
import jwt

email = "john@example.com"
password = "password123"

login_data = {"email": email, "password": password}

session = requests.Session()

login = session.post("http://localhost:3500/login", json=login_data)
if login.status_code == 200:
    print("Login Succeeded")
    token = session.cookies.get("token")
    if token:
        decoded = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded.get("userInfo", {}).get("userId")

        reservationData = {"customer_id": user_id,
                           "restaurant_id": 2,
                           "table_id": 2,
                           "date": "2024-12-13",
                           "time": "18:30:00"
        }
        response = session.post("http://localhost:3500/reserv", json=reservationData)
        if response.status_code == 201:
            print("POST Response:", response.json())
        else:
            print("POST Failed:", response.status_code, response.text)
else:
    print("Login Failed", login.status_code, login.text)