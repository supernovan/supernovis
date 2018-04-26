# Supernovis.club

Source code for Supernovis.club, it's currently running on a Raspberry Pi

## Getting Started

git clone this resp, if you really want a copy of this basic website.

### Prerequisites

Node v 8.0.0 or greater, Mongodb v3.2.14, will probably work for other versions but I'm not sure.

### Installing

Go to the directory with the terminal, run npm install.

Also create a directory in your root directory (same directory as app.js) called config and create 2 files inside, env.js and secret.js.

secret.js
```
var secret = "persona5isagoodgame"

module.exports = secret
```
env.js
```
env = "dev";

module.exports = env;
```

## Run the server

```
node app.js
```
or 
```
npm start
```
should run the server

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
