import requests
from aiohttp import web
from jwt import JWT, jwk_from_dict
from util import load_yaml, rndstr, url_encode

AUTH_ENDPOINT = "https://id.twitch.tv/oauth2/authorize"
TOKEN_ENDPOINT = "https://id.twitch.tv/oauth2/token"

config = load_yaml("config.yaml")
jwt_instance = JWT()
jwt_key = jwk_from_dict(
    requests.get("https://id.twitch.tv/oauth2/keys").json()["keys"][0]
)

session = {}


async def login(request):
    session["state"] = rndstr()
    session["nonce"] = rndstr()
    args = {
        "client_id": config["client_id"],
        "response_type": "code",
        "scope": "openid",
        "nonce": session["nonce"],
        "redirect_uri": config["api_url"] + "/callback",
        "state": session["state"],
    }
    raise web.HTTPFound(AUTH_ENDPOINT + url_encode(args))


async def login_callback(request):
    code = request.query["code"]
    state = request.query["state"]
    assert state == session["state"]
    args = {
        "client_id": config["client_id"],
        "client_secret": config["client_secret"],
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": config["api_url"] + "/callback",
    }
    token_request_url = TOKEN_ENDPOINT + url_encode(args)
    result = requests.post(token_request_url)
    token = result.json()["id_token"]
    print(result.json())
    jwt_content = jwt_instance.decode(token, jwt_key, do_time_check=True)
    for key, value in jwt_content.items():
        print(key, value)
    return web.Response(body=f"Hello {jwt_content['preferred_username']}")


app = web.Application()
app.add_routes(
    [
        web.get("/login", login),
        web.get("/callback", login_callback),
    ]
)

if __name__ == "__main__":
    web.run_app(app, port=80)
