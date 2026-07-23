Markdown# Task API - Database Edition

A RESTful API built with Node.js and Express that manages a daily to-do list. In this iteration (Week 3), the volatile in-memory storage has been replaced with a persistent SQLite database.

## Architecture & Storage

* **Why SQLite was chosen:** For this assignment, we utilized Node 22's built-in `node:sqlite` module. SQLite is lightweight, requires no separate background server to run, and bypassing `better-sqlite3` meant we did not need to install heavy C++ build tools (like Visual Studio Build Tools) to compile the database engine.
* **Where the database file is stored:** The data is stored locally in a single file named `tasks.db` located at the root of the project directory. (Note: This file is ignored via `.gitignore` and is not pushed to the repository).

## Getting Started

Follow these steps to run the API on your local machine. The database and tables will be generated automatically on the first run.

### Prerequisites
* [Node.js](https://nodejs.org/) (v22.5.0 or higher required for native SQLite support).

### Installation & Run Command
Run the following commands in your terminal to start the server:

```bash
# Install dependencies
npm install express swagger-ui-express

# Start the server
node index.js
The server will start on http://localhost:3000.Interactive DocumentationYou can view and interact with the full API documentation directly in your browser using Swagger UI.Once the server is running, visit:👉 http://localhost:3000/docsExample SQL QueryAs part of the database exploration, here is an example of a raw SQL query executed against the database using DB Browser for SQLite:Query: Mark all tasks as completed.SQLUPDATE tasks SET done = 1;

Database Viewer Screenshot(Below is a look at the raw database tables using the SQLite Viewer extension)Endpoints SummaryCRUD OperationHTTP MethodEndpointDescriptionRead (All)GET/tasksRetrieves an array of all tasks from the DB.Read (Single)GET/tasks/:idRetrieves a specific task by its ID.CreatePOST/tasksInserts a new task into the database.UpdatePUT/tasks/:idUpdates an existing task's title or done status.DeleteDELETE/tasks/:idRemoves a task from the database.Author: Syed Ahmad Shah


# Screenshots

<img src="./Screenshots/Screenshot-1.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-2.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-3.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-4.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-5.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-6.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-7.png" alt="Swagger UI Screenshot" width="500" height="auto">
<img src="./Screenshots/Screenshot-8.png" alt="Swagger UI Screenshot" width="500" height="auto">