import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSTANCE_FILE = path.join(__dirname, "serverInstance.json");

// Cache the server instance ID in memory (same for the lifetime of the server process)
let cachedInstanceId = null;

// Get or create server instance ID (cached for this process)
export function getServerInstanceId() {
  if (cachedInstanceId) {
    return cachedInstanceId;
  }
  
  // Generate new ID for this server process
  cachedInstanceId = crypto.randomUUID();
  console.log(`Server instance ID: ${cachedInstanceId}`);
  
  return cachedInstanceId;
}

// Reset server instance ID (useful for testing or manual logout)
export function resetServerInstanceId() {
  cachedInstanceId = crypto.randomUUID();
  console.log(`Server instance ID reset: ${cachedInstanceId}`);
  return cachedInstanceId;
}

export default { getServerInstanceId, resetServerInstanceId };
