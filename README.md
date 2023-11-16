# ED4ALL Backend

## Overview

ED4ALL is a data-driven project designed to support local administrations in making strategic decisions about public education investments. The project focuses on analyzing various socio-economic factors such as average income, average education level, and the availability of education centers in different areas.

The goal is to identify areas that are underserved and could benefit from increased investment in educational infrastructure. By providing a clear picture of the current state of educational resources and correlating this with socio-economic data, we aim to help administrations prioritize their investments in areas where they are needed the most.

## Features

- Data Analysis: Analyze various socio-economic factors to identify areas in need of educational investment.
- Visualization: Provide visual representations of data to aid in understanding and decision-making.

## Technologies Used

- Node.js: For the backend server.
- MongoDB: For storing and retrieving data.
- Mongoose: For data modelling and managing relationships between data.
- Express: For handling HTTP requests and routing.

## Usage

This project exposes several API endpoints that you can use to interact with the data.

### District Routes

- `GET /districts`: This endpoint returns all districts. It doesn't require any parameters.
- `GET /districts/:districtId`: This endpoint returns a specific district by its ID. You need to replace `:districtId` with the ID of the district you want to retrieve.
- `GET /districts/:districtId/centers`: This endpoint returns all centers in a specific district. You need to replace `:districtId` with the ID of the district whose centers you want to retrieve.

### Center Routes

- `GET /centers`: This endpoint returns all centers. It doesn't require any parameters.
- `GET /centers/:id`: This endpoint returns a specific center by its ID. You need to replace `:id` with the ID of the center you want to retrieve.

All endpoints return data in JSON format. If an endpoint cannot find the requested data, it will return a 404 status code with the message '404 - Not Found'.

For example, to get all centers, you would send a GET request to `/centers`. To get a center with an ID of 1, you would send a GET request to `/centers/1`.

# ED4ALL DATA

To implement a tool that enables end users to modify specific parameters and assess the inclusivity and quality of education per district,
we have to define a metric which evaluates that inclusivity and quality for each of the districts of Barcelona. Since we have a dataset containing educational and occupational
information of people living in Barcelona, we will define the educational and occupational index of a district as the average of the individual educational and occupational
indexes of each of the people living in that district. We define the individual educational and occupational index as follows:

educational_ocupational_index = min(10, 10 + (5/3)*income - 10*(-e^(-0.25*delay) + 1))

where:
+ **level_of_education**: ordinal categorical variable. It can take values from 1 to 5
+ **income**: ordinal categorical variable. It can take values from 1 to 5
+ **delay**: is the number of years of delay the user has with respect to what would be expected if no years were retaken (including post-obligatory studies)
+ **delay penalizer term**: - 10*(-e^(-0.25*delay) + 1)


This formula has been built following some assumptions:
- Inclusivity and quality of education can be described by the academic performance and the job quality after the studies (we know the job quality is not only based on income, but
it is the only job-related attribute we had. Extensions of the formula could be done with more attributes, such as job satisfaction).
- As a general rule, well-paid jobs are obtained by people with a good level of education
- Pension earnings will be proportional to your previous earnings
- All districts follow the same age distribution (in order to perform comparisons). It can be asserted on the official pages of the 
"Ajuntament de Barcelona", that the average age per district is almost the same for the 10 districts of the city. 
Source: https://ajuntament.barcelona.cat/estadistica/castella/Estadistiques_per_temes/Poblacio_i_demografia/Demografia/Canvis_domicili/a2021/t19.htm. Therefore we will assume districts 
ages follow similar distributions.
- The sampling of the interviews (in the wage gap dataset) has been conducted randomly (no bias introduced in the sampling process) 

## Observations:
- 1 is the lowest rating, and 10 is the highest, we could use min-max scaling to normalize the values
- the expression (-e^(-0.25*delay) + 1) converges to 1 as delay tends to infinity
- the 0.25 on the exponent of the penalizer term has been chosen in order to converge to 1 in a way that when the delay is greater than 10 (approximately), the penalizer term
does not increase significantly anymore. This term could vary depending on the interpretation.
- a person who has not finished his studies but has an average income (=3), will have a rating of 5.
- a person who has not finished his studies and has no income, will have a rating of 1 (income goes from 1 to 5)

## Potential usages:
- This metric could be used as a labelling method for the data in order to perform Supervised Learning techniques on it. Ideally, we would like to apply a regression 
based on parameters such as educational centres, academic offers, or digitalization attributes (WIFI connectivity, mobile devices, ...). This idea could be implemented
(and would be if we had enough time) with a visual tool that would allow the end user to change the parameters chosen. Furthermore, with the proper field information (which
we do not have), we could also estimate the costs of applying the necessary measurements to modify the parameters.

## Technologies Used
- Python: For the data analysis.
- Jupyter Notes: For the regression-model implementation.
- Pandas & Matplotlib: For data visualization.
