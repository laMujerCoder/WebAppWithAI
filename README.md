# Recipe Collection Web Application

## Project Overview

The Recipe Collection Web Application is a full-stack web application that allows users to store, organize, view, categorize, and edit recipes.

The goal of this project was to gain experience connecting a frontend website to a C# backend and an external database service. The application uses HTML, CSS, and JavaScript for the user interface, ASP.NET Core with C# for the backend API, and Back4App for persistent data storage.

## Features

The application currently supports:

- Viewing saved recipes
- Adding new recipes
- Editing existing recipes
- Organizing recipes by category
- Filtering recipes by category
- Storing recipe information in an external database
- Retrieving saved recipes when the application is loaded
- Responsive webpage styling for desktop and smaller screens

Recipe categories include:

- Breakfast
- Lunch
- Dinner
- Dessert
- Snack
- Drinks
- Other

## Technologies Used

### Frontend

The frontend was created using:

- HTML
- CSS
- JavaScript

HTML provides the structure of the website, CSS is used for the visual design and responsive layout, and JavaScript handles user interaction and communication with the C# API.

### Backend

The backend was developed using:

- C#
- ASP.NET Core Web API

ASP.NET Core acts as the middle layer between the website and the database.

For example, when a user creates a recipe, the data follows this general path:

Website → JavaScript → ASP.NET Core API → Back4App → Database

When recipes need to be displayed, the process works in the opposite direction:

Database → Back4App → ASP.NET Core API → JavaScript → Website

The API currently uses HTTP operations such as:

- `GET /api/Recipes` - Retrieves recipes
- `POST /api/Recipes` - Creates a new recipe
- `PUT /api/Recipes/{id}` - Updates an existing recipe

## Database and Backend Services

This project uses **Back4App** as an external backend/database service.

Back4App provides persistent cloud data storage. This means recipes are not stored only inside the browser or temporarily in the C# application. Recipe data is sent to Back4App and can be retrieved again after the application has been restarted.

Each recipe contains information such as:

- Name
- Category
- Ingredients
- Instructions

Back4App also assigns each stored recipe a unique `objectId`. The application uses this ID when a specific recipe needs to be edited.

The C# `Back4AppService` class is responsible for communicating with the Back4App REST API. The `RecipesController` provides API endpoints that the JavaScript frontend can access.

This separation prevents the frontend from needing to communicate directly with the database.

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
    ├── wwwroot/
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── recipes.js
    │   └── index.html
    │
    ├── Program.cs
    ├── appsettings.json
    └── README.md

## How the Application Works

When the application starts, JavaScript sends a request to the ASP.NET Core API to retrieve recipes.

The `RecipesController` receives the request and uses `Back4AppService` to communicate with Back4App.

Back4App returns the stored recipe data as JSON. The data is returned to the browser, where JavaScript creates recipe cards and displays them on the webpage.

When a user submits a new recipe, JavaScript creates a JSON representation of the recipe and sends a POST request to the C# API. The backend then sends the information to Back4App for permanent storage.

Editing works similarly, except the application sends a PUT request containing the unique Back4App `objectId` of the recipe being changed.

## Use of Artificial Intelligence

ChatGPT by OpenAI was used as a development and learning assistant during this project.

I used ChatGPT to help:

- Understand ASP.NET Core project structure
- Learn how controllers, models, and services interact in C#
- Develop and troubleshoot REST API requests
- Understand how to connect an ASP.NET Core application to Back4App
- Develop portions of the HTML, CSS, and JavaScript frontend
- Understand JavaScript `fetch()` requests
- Implement recipe creation and editing
- Troubleshoot errors during development
- Explain unfamiliar programming concepts and code
- Assist with documentation and organization of the project

AI-generated suggestions were reviewed, tested, and modified while developing the application. ChatGPT was used as a development aid rather than as the application's runtime backend or database.

## External Services

### Back4App

Back4App is used for cloud-based data storage and database management. The application communicates with Back4App through its REST API.

Back4App:
https://www.back4app.com/

### OpenAI ChatGPT

ChatGPT was used as an AI-assisted development and learning tool.

OpenAI:
https://openai.com/

## Security

Back4App credentials should not be exposed in frontend JavaScript or committed to a public GitHub repository.

Sensitive API credentials should be stored using secure configuration methods such as ASP.NET Core User Secrets or environment variables.

## Running the Project

To run the project locally:

1. Clone the repository.
2. Open the solution in Visual Studio.
3. Configure the required Back4App credentials.
4. Build the ASP.NET Core project.
5. Run the project through Visual Studio.
6. Open the localhost address displayed by ASP.NET Core.
7. The application will retrieve recipe information from Back4App and display it on the webpage.

## Future Improvements

Possible future improvements include:

- User registration
- User login/logout
- Associating recipes with individual accounts
- Deleting recipes
- Searching recipes
- Recipe images
- Additional categories
- Improved validation and error handling
- Improved database security and access control

## Author

Ellie Garcia

Engineering Design 2 | EGN 4952C

Florida Atlantic University
