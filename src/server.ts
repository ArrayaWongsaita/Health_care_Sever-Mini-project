import app from "./app.js";

app.listen(3000, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log("Server is running on http://localhost:3000");
  }
});
