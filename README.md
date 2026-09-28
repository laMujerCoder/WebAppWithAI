# Recipe Collection Web Application using AI

## Project Overview

The Recipe Collection Web Application is a full-stack web application designed to allow users to create, view, edit, categorize, and organize recipes.

This project was created to practice the development of a complete web application while also exploring how AI can be used as a tool throughout the software development process. This included frontend development, backend API development, database communication, cloud deployment, secure management of API credentials, and the use of AI for code development, troubleshooting, and learning new technologies.
The application was originally developed locally using an ASP.NET Core C# backend. Back4App is used for persistent database storage, and the final web application is deployed using Netlify.

---

## Features

The application currently allows users to:

- View saved recipes
- Add new recipes
- Edit existing recipes
- Assign recipes to categories
- Filter recipes by category
- Store recipes permanently in a cloud database
- Retrieve recipes whenever the application is loaded
- Access the application through a publicly deployed website

Recipe categories include:

- Breakfast
- Lunch
- Dinner
- Dessert
- Snack
- Drinks
- Other

---

## Technologies Used

### Frontend

The frontend of the application was created using:

- HTML
- CSS
- JavaScript

HTML provides the structure of the website, CSS controls the design and responsive layout, and JavaScript handles user interaction and communication with the backend.

### Local Backend

The application was originally developed using:

- C#
- ASP.NET Core Web API

During local development, ASP.NET Core provides API endpoints for managing recipes.

The local application follows this general structure:

    Browser
       ↓
    HTML / CSS / JavaScript
       ↓
    ASP.NET Core API
       ↓
    Back4App
       ↓
    Database

The C# backend is separated into models, controllers, and services.

`Recipe.cs` defines the structure of a recipe.

`RecipesController.cs` provides the API endpoints used by the frontend.

`Back4AppService.cs` handles communication between the ASP.NET Core application and Back4App.

---

## Recipe API

During local development, the ASP.NET Core API supports operations including:

    GET /api/Recipes

Retrieves recipes stored in Back4App.

    POST /api/Recipes

Creates and stores a new recipe.

    PUT /api/Recipes/{id}

Updates an existing recipe using its Back4App object ID.

These operations allow the frontend and backend to remain separate while still communicating with each other.

---

## Database and Back4App

Back4App is used as the cloud database service for this application.

Recipe information stored in Back4App includes:

- Recipe name
- Category
- Ingredients
- Instructions

Back4App also creates a unique `objectId` for every recipe. This ID is used when a specific recipe needs to be edited.

Because the data is stored in Back4App rather than only in the browser, recipes remain available after the application or computer is restarted.

---

## Netlify Deployment

Netlify is used to deploy the final website and make the application publicly accessible.

The original development version uses an ASP.NET Core C# backend. The deployed Netlify version therefore includes a Netlify Function that performs the server-side communication required by the website.

The following files were added for deployment:

    netlify.toml

This configuration file tells Netlify where the public website and serverless functions are located.

    netlify/functions/recipes.mjs

This serverless function handles recipe requests between the deployed JavaScript frontend and Back4App.

The deployed application follows this structure:

    Netlify Website
          ↓
    JavaScript Frontend
          ↓
    Netlify Function
          ↓
    Back4App REST API
          ↓
    Back4App Database

The Netlify Function supports the GET, POST, and PUT operations required to retrieve, create, and edit recipes.

---

## Project Structure

The project is organized approximately as follows:

    WebAppWithAI/
    │
    ├── Controllers/
    │   └── RecipesController.cs
    │
    ├── Models/
    │   └── Recipe.cs
    │
    ├── Services/
    │   └── Back4AppService.cs
    │
    ├── netlify/
    │   └── functions/
    │       └── recipes.mjs
    │
    ├── wwwroot/
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── recipes.js
    │   └── index.html
    │
    ├── appsettings.json
    ├── netlify.toml
    ├── Program.cs
    └── README.md

---

## Security and API Credentials

API credentials are not stored directly in the public source code.

During local development, ASP.NET Core User Secrets are used to store the Back4App Application ID and REST API key outside of the Git repository.

For the deployed application, the credentials are stored using Netlify environment variables.

The Netlify Function accesses these values through environment variables such as:

    BACK4APP_APPLICATION_ID
    BACK4APP_REST_API_KEY

This allows the application to communicate with Back4App without placing the actual credential values inside the JavaScript files or public GitHub repository.

---

## Use of Artificial Intelligence

ChatGPT by OpenAI was used as a development and learning assistant throughout this project.

ChatGPT was used to assist with:

- Understanding ASP.NET Core project structure
- Understanding controllers, models, and services in C#
- Developing and troubleshooting REST API requests
- Connecting the ASP.NET Core backend to Back4App
- Developing portions of the HTML, CSS, and JavaScript frontend
- Understanding JavaScript `fetch()` requests
- Implementing recipe creation and editing
- Implementing recipe categories and filtering
- Troubleshooting errors during development
- Understanding API credential security
- Configuring ASP.NET Core User Secrets
- Preparing the application for Netlify deployment
- Creating the Netlify serverless function
- Assisting with project documentation

AI-generated suggestions and code were reviewed, tested, modified, and integrated into the project during development.

ChatGPT is not used as part of the running application. It was used as a development tool to assist with learning, coding, troubleshooting, and documentation.

---

## External Services

### Back4App

Back4App provides the cloud database used to permanently store recipe information.

### Netlify

Netlify hosts the publicly deployed frontend and runs the serverless function used to communicate with Back4App.

### OpenAI ChatGPT

ChatGPT was used as an AI-assisted development and learning tool.

---

## Running the Application Locally

To run the ASP.NET Core version locally:

1. Clone the GitHub repository.
2. Open the solution in Visual Studio.
3. Configure the required Back4App credentials using ASP.NET Core User Secrets.
4. Build and run the application.
5. Open the localhost address generated by Visual Studio.

API credentials are intentionally excluded from the GitHub repository and must be configured separately.

---

## Author
Ellie Garcia

Engineering Design 2

Florida Atlantic University
