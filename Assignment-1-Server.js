const { error } = require("console");
const http = require("http");
const { stringify } = require("querystring");
const { json } = require("stream/consumers");

// Create the server
const server = http.createServer((request, response) => {
	response.writeHead(200, { "content-type": "application/json" });

	if (request.url === "/") {
		//endpoint numeber 1
		response.end(JSON.stringify({ message: "hellow i am first end port" }));

		//endpoint number 2
	} else if (request.url === "/about") {
		response.end(JSON.stringify({ message: "hello i am end point 2" }));

		//error hehehehe!!
	} else {
		response.end(JSON, stringify({ error: "Error port not found" }));
	}
});

// the port start listening
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
