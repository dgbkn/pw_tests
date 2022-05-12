import requests

headers = {
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'client-version': '49',
    'Authorization': 'Bearer undefined',
    # Already added when you pass json=
    # 'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://competishun.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'client-id': '5c8f5d96a248bc40e600bfa4',
    'Client-Type': 'WEB',
    'sec-ch-ua-platform': '"Windows"',
}

json_data = {
    'username': '9413737698',
    'password': 'anu123456',
    'client_id': 'system-admin',
    'client_secret': 'KjPXuAVfC5xbmgreETNMaL7z',
    'grant_type': 'password',
    'organizationId': '5c8f5d96a248bc40e600bfa4',
}

response = requests.post('https://api.penpencil.xyz/v1/oauth/token', headers=headers, json=json_data)


# logout

import requests

headers = {
    'authority': 'api.penpencil.xyz',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi-IN;q=0.7,hi;q=0.6',
    'authorization': 'Bearer f0171b8f86d050c6fd5ef89a34baa0c9aca46789a1ea48b5fbee1c65e4d21242',
    'client-id': '5eb393ee95fab7468a79d189',
    'client-type': 'WEB',
    'client-version': '99',
    'origin': 'https://study.physicswallah.live',
    'randomid': 'c560b7b6-9298-4c1c-a62f-77ca92a18376',
    'referer': 'https://study.physicswallah.live/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
}

json_data = {
    'deviceId': None,
}

response = requests.post('https://api.penpencil.xyz/v1/oauth/logout', headers=headers, json=json_data)

# logout




# OTP SEnT
import requests

headers = {
    'authority': 'api.penpencil.xyz',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi-IN;q=0.7,hi;q=0.6',
    'authorization': 'Bearer f0171b8f86d050c6fd5ef89a34baa0c9aca46789a1ea48b5fbee1c65e4d21242',
    'client-id': '5eb393ee95fab7468a79d189',
    'client-type': 'WEB',
    'client-version': '99',
    # Already added when you pass json=
    # 'content-type': 'application/json',
    'origin': 'https://study.physicswallah.live',
    'randomid': 'c560b7b6-9298-4c1c-a62f-77ca92a18376',
    'referer': 'https://study.physicswallah.live/',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
}

params = {
    'smsType': '0',
}

json_data = {
    'username': '9413737698',
    'countryCode': '+91',
    'organizationId': '5eb393ee95fab7468a79d189',
}

response = requests.post('https://api.penpencil.xyz/v1/users/get-otp', params=params, headers=headers, json=json_data)

# OTP SEnT




# login
import requests

headers = {
    'authority': 'api.penpencil.xyz',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi-IN;q=0.7,hi;q=0.6',
    # 'authorization': 'Bearer f0171b8f86d050c6fd5ef89a34baa0c9aca46789a1ea48b5fbee1c65e4d21242',
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
    'username': '9414137699',
    'otp': '578615',
    'client_id': 'system-admin',
    'client_secret': 'KjPXuAVfC5xbmgreETNMaL7z',
    'grant_type': 'password',
    'organizationId': '5eb393ee95fab7468a79d189',
    'latitude': 0,
    'longitude': 0,
}

response = requests.post('https://api.penpencil.xyz/v1/oauth/token', headers=headers, json=json_data)


# COMPETITIUN SIGNUP PROCSESS
# SignUP
import requests

headers = {
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'client-version': '49',
    # 'Authorization': 'Bearer bcc160be50640b9c9c773a2e9b55ed05c7f4b82690aa2ce07ff0eb06820de511',
    # Already added when you pass json=
    # 'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://competishun.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'client-id': '5c8f5d96a248bc40e600bfa4',
    'Client-Type': 'WEB',
    'sec-ch-ua-platform': '"Windows"',
}

json_data = {
    'mobile': '9414137699',
}

response = requests.post('https://api.penpencil.xyz/v1/users/register/5c8f5d96a248bc40e600bfa4', headers=headers, json=json_data)

# 2
import requests

headers = {
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'client-version': '49',
    'Authorization': 'Bearer bcc160be50640b9c9c773a2e9b55ed05c7f4b82690aa2ce07ff0eb06820de511',
    # Already added when you pass json=
    # 'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://competishun.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'client-id': '5c8f5d96a248bc40e600bfa4',
    'Client-Type': 'WEB',
    'sec-ch-ua-platform': '"Windows"',
}

json_data = {
    'otp': '308691',
}

response = requests.post('https://api.penpencil.xyz/v1/users/627cb8950a11010011fc01b3/verify-otp', headers=headers, json=json_data)


# 3
import requests

headers = {
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'client-version': '49',
    'Authorization': 'Bearer bcc160be50640b9c9c773a2e9b55ed05c7f4b82690aa2ce07ff0eb06820de511',
    # Already added when you pass json=
    # 'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://competishun.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'client-id': '5c8f5d96a248bc40e600bfa4',
    'Client-Type': 'WEB',
    'sec-ch-ua-platform': '"Windows"',
}

json_data = {
    'firstName': 'AS',
    'lastName': 'fgfgfg',
    'email': 'ramramjibkn@gmail.com',
    'password': 'anu123456',
    'otp': '308691',
    'mobile': '9414137699',
}

response = requests.post('https://api.penpencil.xyz/v1/users/627cb8950a11010011fc01b3/register/5c8f5d96a248bc40e600bfa4/set-profile', headers=headers, json=json_data)



# 4

import requests

headers = {
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'client-version': '49',
    'Authorization': 'Bearer ff5a276a306df51bf7d3239794bef0c4483f504c7d28149cf65e156618dd8ec1',
    # Already added when you pass json=
    # 'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://competishun.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'client-id': '5c8f5d96a248bc40e600bfa4',
    'Client-Type': 'WEB',
    'sec-ch-ua-platform': '"Windows"',
}

json_data = {
    'oldPassword': 'anu123456',
    'password': 'anu1234567',
    'confirmPassword': 'anu1234567',
}

response = requests.post('https://api.penpencil.xyz/v1/users/change-password', headers=headers, json=json_data)