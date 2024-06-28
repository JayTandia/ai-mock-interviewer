/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:txdCuSkIO8Y6@ep-frosty-mode-a5e5t660.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };
  