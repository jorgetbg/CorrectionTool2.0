var config={
    uri: process.env.NODE_ENV == "development" ? "http://localhost:3333" : '/api'
}

export default config;