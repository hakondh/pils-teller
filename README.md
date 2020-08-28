# pils-teller
Web page that keeps track of consumed beer over time.

The server is built with *express*. It uses *bcrypt* to salt and hash the passwords and creates tokens with *jsonwebtoken (jwt)*.
The client is built with *react*, and talks to the server using *axios*.
The database is created with *mysql*.

## running pils-teller in production
- Clone the project
- Go into the folder pils-teller
- Run `npm i` 
- Run `npm run client-install`
- Create .env file with `touch .env`
- Enter NODE_ENV, PORT, DB_HOST, DB_PASSWORD and TOKEN_SECRET in the .env file you just created
- Build the project by going into client and then run `npm run build`
- When that's done, back to the root folder, and run `sudo node server.js`
