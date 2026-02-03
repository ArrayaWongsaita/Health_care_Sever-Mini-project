import { createApp } from "./app.js";
import { env } from "./shareds/config/env.config.js";

const PORT = env.PORT;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown (production MUST HAVE)
const shutdown = () => {
  console.log("🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
