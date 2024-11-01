const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "<h1>Ini adalah homepage</h1>",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "<h1>Halo! Ini adalah halaman about</h1>",
        })
      );
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(
          JSON.stringify({
            message: `<h1>Halo, ${name}! Ini adalah halaman about</h1>`,
          })
        );
      });
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`,
        })
      );
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: "Halaman tidak ditemukan!",
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
