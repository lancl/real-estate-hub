# Real Estate Hub

About the app: it is a real-estate hub, providing insights such as home-price trend in the United States.

## 1. Front End

Note that front end's folder name is 'src' (instead of 'client'). This is due to create-react-app's constraint.

### Bootstrapped with create-react-app

This project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app).

I decided Not to update my repo from 2018 (via webpack). Instead, I started a new repo via create-react-app. This is due to the high efforts to update the legacy codes (e.g. node's v8 VS v14).

### Auto-Suggestion for Search Bar

Based on this npm package, [react-autosuggest](https://www.npmjs.com/package/react-autosuggest). The advantages of providing auto-suggestion feature include less effort to type the full name of each city.

### Google Maps

Note that this API service is no longer free (it was back in 2018).

### Line Charts

Based on these 2 npm packages, chart.js and react-chartjs-2. The advantages of using these packages include beautiful data visualization for large set of data points (i.e. monthly price data, for 20+ years).

Note that [Google Charts](https://www.w3schools.com/howto/howto_google_charts.asp) is an alternative way to plot charts.

## 2. Back End

### 2(a). Server: Express

### 2(b). Database: MongoDB

I made the decision to use MongoDB, because this NoSQL DB is quite native to Javascript (.js). On the flip side, MySQL DB (.sql, not .js) has too many security constraints (e.g. command line issue, when importing a CSV file)

## 3. Data Source

A challenge for building this app is finding free and good-quality API (for data). Zillow is the only free source for real-estate data. Therefore, I decided to use Zillow.

### API VS CSV file:

Originally, I tried to use [Zillow's API](https://www.zillow.com/howto/api/APIOverview.htm). Unfortunately, region-level data is not available (only property-level data is available). Therefore, I switched to downloading a big CSV file from Zillow's site.

### Data Conversion: CSV to JSON

For some reason, [module csvtojson](https://www.npmjs.com/package/csvtojson) did not work with my 2018's repo. On the other hand, it did work when I tested this module on its own (created a folder with only: this module, a simple CSV file, and a simple test JS file). Therefore, I decided to update everyting (incl. create-react-app, node version), for this key module to work.

### Data Processing

The region-level data needs to be processed (e.g. re-shaped/cleaned), before loading it to the database. For details, refer to the file /database-mongo/processData.js.

## 4. Development

- Install dependencies: `npm start`
- Run the app: `npm start`; then open [http://localhost:3000](http://localhost:3000) to view it in the browser. Also, any lint errors will be shown in the console.
