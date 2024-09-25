import { Competitions } from "./models/competitions.js";
import { Users } from "./models/users.js"
import { sequelize } from "./config.js";

async function runSync() {
    await sequelize.sync();
}

await runSync()