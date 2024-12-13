# Testing the Deployed Application (Deployed to AWS Lambda with API Gateway using AWS SAM)

- base url: https://gveamcnjmd.execute-api.ap-south-1.amazonaws.com/api/v1
- swagger: https://gveamcnjmd.execute-api.ap-south-1.amazonaws.com/api-docs/

You can use the provided postman collection to test the application. Import both the api collection and provided environment file as well.

in the postman collection nothing needs to be changes other than changing the image in the image upload.


# How to configure and run the application

- Extract the provided zip file.
- install the packages
```bash
npm install
```
- install AWS SAM CLI : https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

- Create users table
```sh
aws dynamodb create-table \
    --table-name tm-users \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```

- Create tasks table
```sh
aws dynamodb create-table \
    --table-name tm-tasks \
    --attribute-definitions AttributeName=id,AttributeType=N \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
    --time-to-live-specification "Enabled=true,AttributeName=ttl"
```
- above commands are just for reference purposes. Running SAM commands below will create them.
- run build command
```bash
npm run build
```
- run deploy command
```bash
npm run deploy
```
- to run tests
```bash
npm run test
```


- For the deployment I have done it as a serverless application in AWS Lambda. Approach can be changed to ECS, EKS, Elastic Beanstalk etc. Based on that slight modifications might be required.
- Deployment was done with AWS SAM CLI integration. I selected it as I found it convenient for me at the time of deployment. Again this approach also can be changed to Cloudformation, AWS CDK or anything else.


# Features that are not implemented but can be implemented

- Pagination for the list APIs (Since we are using dynamodb it is not that optimal to fetch the total number of records and implement pagination based on limit offset. But pagination can be implemented as a lazy loading with the LastEvaluatedKey )
- Authentication is not implemented for the APIs
- even though Pipeline related buildspec.yml file is created I have not created the pipeline physically due to price and resource limitations. Let me know if I need to set this up too.
- For the testing I have used the same db as the application. This is not the correct way. But to keep things simple I have done with that way.