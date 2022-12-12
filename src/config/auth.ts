

export default {
  secret_token: process.env.JWT_SECRET_KEY as string,
  expires_in_token: "15m",
  secret_refresh_token: process.env.REFRESH_JWT_SECRET_KEY as string
}