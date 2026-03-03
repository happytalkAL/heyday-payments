import { execSync } from "child_process";
import { unlinkSync, existsSync } from "fs";
import { resolve } from "path";

const projectDir = resolve(import.meta.dirname, "..");
const lockfilePath = resolve(projectDir, "pnpm-lock.yaml");

// Delete the existing lockfile
if (existsSync(lockfilePath)) {
  unlinkSync(lockfilePath);
  console.log("Deleted pnpm-lock.yaml");
} else {
  console.log("No pnpm-lock.yaml found");
}

// Regenerate lockfile
try {
  execSync("pnpm install --no-frozen-lockfile", {
    cwd: projectDir,
    stdio: "inherit",
  });
  console.log("Successfully regenerated pnpm-lock.yaml");
} catch (error) {
  console.error("Failed to regenerate lockfile:", error.message);
  process.exit(1);
}
