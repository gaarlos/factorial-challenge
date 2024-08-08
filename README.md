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
