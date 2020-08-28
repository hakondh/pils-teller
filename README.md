# pils-teller
Web page that keeps track of consumed beer over time.

The server is built with *express*. It uses *bcrypt* to salt and hash the passwords and creates tokens with *jsonwebtoken (jwt)*.
The client is built with *react*, and talks to the server using *axios*.
The database is created with *mysql*.

## running pils-teller (development and production)
**NB: You need to set up a local database, or get access to one, to run the project**
- Clone the project: `git clone https://github.com/hakondh/pils-teller.git`
- Enter the root folder: `cd pils-teller`
- Install dependencies: `npm i`
- Install client dependencies: `npm run client-install`
- Create .env file: `touch .env`
- Open the .env file: `nano .env`
- Set the appropriate values for NODE_ENV, PORT, DB_HOST, DB_PASSWORD and TOKEN_SECRET, then save and exit
- Go into client: `cd client`
- Open package.json: `nano package.json`
- From here on, things will differ depending on whether you are going to run the project in development or production
### for development
- Set the appropriate value for the proxy, this will probably be http://localhost:<your chosen server port>, then save and exit
- Go back to the root folder: `cd ..`
- Run development server: `npm run dev`
### for production 
- Set the appropriate value for the proxy, this will probably be https://pilsteller.no, then save and exit
- Create the minified bundle: `npm run build`
- Go back to the root folder: `cd ..`
- Run the server: `sudo node server.js`

Done!
