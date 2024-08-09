const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
export const connectionStr = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.arrjqz9.mongodb.net/restoDB`