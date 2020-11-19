# Real Estate Hub

About the app: it is a real-estate hub, providing insights such as home-price trend in the United States.

## A Bootstrapped App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I decided Not to update my repo from 2018 (via webpack). Instead, I started a new repo via create-react-app. Because the effort to update the legacy codes is too high, including the following:

- The npm modules can no longer be installed properly with my current version of node (v14, VS previously at v8).
- Even with node at v8 (before my update), the module csvtojson stopped working due to some conflit. The failing of a key module is a major blocker.

## Technologies for the Full Stack

### Front end: React

### Server: Express

### Database: MongoDB.

I made the decision to use MongoDB, because this NoSQL DB is quite native to Javascript (.js). On the flip side, MySQL DB (.sql, not .js) has too many security constraints (e.g. command line issue, when importing a CSV file)

## Development

- Install dependencies: `npm start`
- Run the app: `npm start`; then open [http://localhost:3000](http://localhost:3000) to view it in the browser. Also, any lint errors will be shown in the console.
