const { spawnSync } = require("node:child_process");

const result = spawnSync("next", ["build", "--webpack"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
  },
});

process.exit(result.status ?? 1);
