# ED4ALL Backend

## Overview

ED4ALL is a data-driven project designed to support local administrations in making strategic decisions about public education investments. The project focuses on analyzing various socio-economic factors such as average income, average education level, and the availability of education centers in different areas.

The goal is to identify areas that are underserved and could benefit from increased investment in educational infrastructure. By providing a clear picture of the current state of educational resources and correlating this with socio-economic data, we aim to help administrations prioritize their investments to areas where they are needed the most.

## Features

- Data Analysis: Analyze various socio-economic factors to identify areas in need of educational investment.
- Visualization: Provide visual representations of data to aid in understanding and decision-making.

## Technologies Used

- Node.js: For the backend server.
- MongoDB: For storing and retrieving data.
- Mongoose: For data modeling and managing relationships between data.
- Express: For handling HTTP requests and routing.

## Usage

This project exposes several API endpoints that you can use to interact with the data.

### District Routes

- `GET /districts`: This endpoint returns all districts. It doesn't require any parameters.
- `GET /districts/:districtId`: This endpoint returns a specific district by its ID. You need to replace `:districtId` with the ID of the district you want to retrieve.
- `GET /districts/:districtId/centers`: This endpoint returns all centers in a specific district. You need to replace `:districtId` with the ID of the district whose centers you want to retrieve.
- `PUT /districts/:districtId`: This endpoint updates a specific district by its ID. You need to replace `:districtId` with the ID of the district you want to update. You also need to send the new data in the request body in JSON format.

### Center Routes

- `GET /centers`: This endpoint returns all centers. It doesn't require any parameters.
- `GET /centers/:id`: This endpoint returns a specific center by its ID. You need to replace `:id` with the ID of the center you want to retrieve.
- `PUT /centers/:id`: This endpoint updates a specific center by its ID. You need to replace `:id` with the ID of the center you want to update. You also need to send the new data in the request body in JSON format.
- `POST /centers`: This endpoint creates a new center. You need to send the new data in the request body in JSON format.

All endpoints return data in JSON format. If an endpoint cannot find the requested data, it will return a 404 status code with the message '404 - Not Found'.

For example, to get all centers, you would send a GET request to `/centers`. To get a center with an ID of 1, you would send a GET request to `/centers/1`.
