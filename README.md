## The Challenge

**Your challenge is to build a Frontend + Backend application that allows you to post and visualize metrics in a usable way.**

### Requirements

- Each metric should have, at least: a timestamp, a name and a value.
- The metrics should be persisted in a database.
- The page should allow users to post new metrics.
- The page should contain a timeline in which the metrics are displayed.
- The page should also display averages per minute/hour/day.
- Implement a feature that fits (even if loosely) in the context of the challenge and allows you to showcase your skills and impress us.

## Tech stack

I decided to go with TypeScript as language and to use NestJS for the API and React for the frontend client. The information will be stored in a SQLite database. It will be prefilled with some initial metrics.

## To run the application

Open a terminal and navigate to `api` folder, install dependencies and start the server

```bash
cd api
npm install
npm run start
```

Open a terminal and navigate to `client` folder, install dependencies and run the project

```bash
cd api
npm install
npm run dev
```

## How it works

When the app loads, no metrics are available. You can create one using the "Add metric" button. Then you can add values manually using the "Add entry" button or populate them automatically using the "Populate metric" button (it takes some time).

The app shows the selected metric in a line chart, showing the average values for each point in the X Axis. You can check "Last hour", "Last 24 hours" and "Last week". Each one will request the needed data and show the chart and the total average.
