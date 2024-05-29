import requests
from getpass import getpass
from http import HTTPMethod, HTTPStatus
password = getpass("What is your password? \n")
username = input("What is your username? \n")
res = requests.post("http://127.0.0.1:8000/api/v1/auth/", json={"username":username, "password": password})
# if res.status_code==200:
print(res.json())

headers = {
    "Authorization": f"Token {res.json()['token']}"
}

data_response = requests.get("http://127.0.0.1:8000/api/v1/inc/?page=1", headers=headers)
print(data_response.json())
calculateTotalIncome = data_response.json()["results"]
print(calculateTotalIncome)
total=0
for item in calculateTotalIncome:
    amount = float(item["amount"])
    total +=amount
print(f'Total Income= {total}')
