
# # login
# import requests

# headers = {
#     'authority': 'api.penpencil.xyz',
#     'accept': 'application/json, text/plain, */*',
#     'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi-IN;q=0.7,hi;q=0.6',
#     # 'authorization': 'Bearer f0171b8f86d050c6fd5ef89a34baa0c9aca46789a1ea48b5fbee1c65e4d21242',
#     'client-id': '5eb393ee95fab7468a79d189',
#     'client-type': 'WEB',
#     'client-version': '99',
#     # Already added when you pass json=
#     # 'content-type': 'application/json',
#     'origin': 'https://study.physicswallah.live',
#     'randomid': 'c560b7b6-9298-4c1c-a62f-77ca92a18376',
#     'referer': 'https://study.physicswallah.live/',
#     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
# }

# json_data = {
#     'username': '9413737698',
#     # 'otp': '578615',
#     'password': 'anu123456',
#     'client_id': 'system-admin',
#     'client_secret': 'KjPXuAVfC5xbmgreETNMaL7z',
#     'grant_type': 'password',
#     'organizationId': '5eb393ee95fab7468a79d189',
#     'latitude': 0,
#     'longitude': 0,
# }

# response = requests.post('https://api.penpencil.xyz/v1/oauth/token', headers=headers, json=json_data)

# print(response.text)


# import requests

# headers = {
#     'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
#     'sec-ch-ua-mobile': '?0',
#     'client-version': '99',
#     'Authorization': 'Bearer f0171b8f86d050c6fd5ef89a34baa0c9aca46789a1ea48b5fbee1c65e4d21242',
#     'randomid': 'c560b7b6-9298-4c1c-a62f-77ca92a18376',

#     # Already added when you pass json=
#     # 'Content-Type': 'application/json',
#     'Accept': 'application/json, text/plain, */*',
#     'Referer': 'https://study.physicswallah.live',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
#     'client-id': '5eb393ee95fab7468a79d189',
#     'Client-Type': 'WEB',
#     'sec-ch-ua-platform': '"Windows"',
# }

# json_data = {
#     'oldPassword': '5fd24b556115990011042b17',
#     'password': 'anu1234567',
#     'confirmPassword': 'anu1234567',
# }

# response = requests.post('https://api.penpencil.xyz/v1/users/change-password', headers=headers, json=json_data)
# print(response.text)




# import requests

# headers = {
#     'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
#     'sec-ch-ua-mobile': '?0',
#     'client-version': '99',
#     'Authorization': 'Bearer f0171b8f86d050c6fd5ef89a34baa0c9aca46789a1ea48b5fbee1c65e4d21242',
#     # Already added when you pass json=
#     # 'Content-Type': 'application/json',
#     'Accept': 'application/json, text/plain, */*',
#     'Referer': 'https://study.physicswallah.live',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
#     'client-id': '5eb393ee95fab7468a79d189',
#     'Client-Type': 'WEB',
#     'sec-ch-ua-platform': '"Windows"',
# }

# json_data = {
#     'firstName': 'AS',
#     'lastName': 'fgfgfg',
#     'email': 'ramramjibkn@gmail.com',
#     'password': 'anu123456',
#     'otp': '578615',
#     'mobile': '9414137699',
# }

# response = requests.post('https://api.penpencil.xyz/v1/users/5fd24b556115990011042b17/register/5eb393ee95fab7468a79d189/set-profile', headers=headers, json=json_data)

# print(response.text)



import requests

headers = {
    'authority': 'api.penpencil.xyz',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi-IN;q=0.7,hi;q=0.6',
    'authorization': 'Bearer bcc160be50640b9c9c773a2e9b55ed05c7f4b82690aa2ce07ff0eb06820de511',
    'client-id': '5eb393ee95fab7468a79d189',
    'client-type': 'WEB',
    'client-version': '99',
    # Already added when you pass json=
    # 'content-type': 'application/json',
    'origin': 'https://study.physicswallah.live',
    'randomid': 'c560b7b6-9298-4c1c-a62f-77ca92a18376',
    'referer': 'https://study.physicswallah.live/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
}

json_data = {
    'firstName': 'hjk',
    'lastName': 'ghjgj',
    'email': 'anandhjkoyal@gmail.com',
    'gender': 'Male',
    'parentDetails': {
        'fatherNumber': '45454545545',
    },
    'address': {
        'city': 'Bikaner',
        'state': 'Bihar',
    },
    'isProfileCompleted': True,
}

response = requests.put('https://api.penpencil.xyz/v1/users', headers=headers, json=json_data)

print(response.text)
