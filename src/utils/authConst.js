/* /src/utils/authConst.js */

const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL
const REACT_APP_IDENTITY_CLIENT_ID = process.env.REACT_APP_IDENTITY_CLIENT_ID
const REACT_APP_AUTH_URL="https://id.twitch.tv/oauth2"


export const IDENTITY_CONFIG = {
  authority: REACT_APP_AUTH_URL,
  client_id: REACT_APP_IDENTITY_CLIENT_ID,
  redirect_uri: REACT_APP_PUBLIC_URL + "/signin-oidc",
  silent_redirect_uri: REACT_APP_PUBLIC_URL + "/signin-oidc",
  post_logout_redirect_uri: REACT_APP_PUBLIC_URL,
  response_type: "id_token token",
  automaticSilentRenew: false,
  loadUserInfo: true,
  scope: "openid"
};

export const METADATA_OIDC = {
  issuer: REACT_APP_AUTH_URL,
  jwks_uri: REACT_APP_AUTH_URL + "/keys",
  authorization_endpoint: REACT_APP_AUTH_URL + "/authorize",
  token_endpoint: REACT_APP_AUTH_URL + "/token",
  userinfo_endpoint: REACT_APP_AUTH_URL + "/userinfo",
  end_session_endpoint: REACT_APP_AUTH_URL + "/endsession",
  check_session_iframe: REACT_APP_AUTH_URL + "/checksession",
  revocation_endpoint: REACT_APP_AUTH_URL + "/revoke",
  introspection_endpoint: REACT_APP_AUTH_URL + "/introspect"
};
