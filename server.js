import serverlessExpress  from "@codegenie/serverless-express";
import app from "./src/app.js";
// For local testing
if (process.env.AWS_SAM_LOCAL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// For Lambda
export const handler = serverlessExpress({ app });

