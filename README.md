lazy loading needs to be done

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
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```

Features that are not implemented but can be implemented

- Pagination for the list APIs (Since we are using dynamodb it is not that optimal to fetch the total number of records and implement pagination based on limit offset. But pagination can be implemented as a lazy loading with the LastEvaluatedKey )
- Authentication is not implemented for the APIs
- 