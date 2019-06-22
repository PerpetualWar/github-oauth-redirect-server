module.exports = {
  "oauth_client_id": process.env.CLIENT_ID || '',
  "oauth_client_secret": process.env.CLIENT_SECRET || '',
  "oauth_host": "https://github.com",
  "oauth_method": "POST",
  "oauth_path": "/login/oauth/access_token",
  "port": 9999
}