# Minimalist JSON Backend Server

A lightweight, native Node.js backend server built with zero external dependencies. This project serves as a practical demonstration of the web's request-response loop using plain JavaScript.

## Features
* **Built with Vanilla Node.js:** Uses the native `http` module instead of heavy frameworks.
* **Two JSON Endpoints:** 
  * `/` - Returns a welcome message.
  * `/about` - Returns a success confirmation message.
* **Robust Error Handling:** Automatically catches invalid URL paths and responds with a proper JSON `404 - Path not found` error.

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Running the Server
1. Clone this repository to your local machine.
2. Open your terminal in the project directory.
3. Run the server using the following command:


## How to Test

### Method 1: Web Browser

```
    Open your browser and navigate to:

    http://localhost:3000/ (Endpoint 1)

    http://localhost:3000/about (Endpoint 2)
```

### Method 2: Command Line (curl)

```
    Open a new terminal window and run:

    curl http://localhost:3000/

    curl http://localhost:3000/about
```