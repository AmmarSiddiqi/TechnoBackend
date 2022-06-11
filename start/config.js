const { MONGODB_URL, PORT, ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

if (!MONGODB_URL || !PORT || !ACCESS_TOKEN || !REFRESH_TOKEN) {
  console.log("Environment Variables are not set");
  process.exit(1);
}
