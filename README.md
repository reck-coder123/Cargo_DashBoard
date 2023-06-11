# MERN Web Dashboard
This is a web dashboard built using the MERN (MongoDB, Express, React, Node.js) stack. The dashboard facilitates communication between two types of users: Manufacturers and Transporters.

## Getting Started
To run the server, follow these steps:

Install dependencies by running the command: npm install.
Create a .env file based on the provided envexample.txt file. Fill in the necessary configuration details for your environment.
Start the server by running the command: npm start.

To run the client (React front-end) of the dashboard, follow these steps:

Install dependencies by running the command: npm install.
Start the client by running the command: npm start.
The client will connect to the backend server and launch the dashboard in your browser.
## Features
User Registration: The user has an option to choose either as 
Manufacturer or Transporter during registration..
User Authentication: Users can log in securely using their credentials.
User Roles: The system differentiates between Manufacturers and Transporters, providing role-specific features.
Dashboard: Manufacturers can place order by providing orderId, To, from, Address details to transporter and Transporter can reply
based on orderId and price details.

## Technologies Used
MongoDB: A NoSQL database used to store user information and messages.
Express.js: A Node.js web application framework used for building the server-side API.
React: A JavaScript library used for building the user interface and front-end components.
Node.js: A JavaScript runtime environment used for running the server-side code.

## Directory Structure
/server: Contains the server-side code, including the Express.js API and database models.
/client: Contains the client-side code, including the React components and front-end assets.

