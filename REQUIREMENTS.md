# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index route : '/products' [GET]
- Show route : '/products/:id' [GET]
- Create route [token required] : '/products' [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) : '/products/by-category' [POST]

#### Users
- Index route [token required] : '/users' [GET]
- Show route [token required] : '/users/:id' [GET]
- Create route N[token required] : '/users' [POST]

#### Orders
- Index route [token required] : '/orders' [GET]
- Show route [token required] : '/orders/:id' [GET]
- Create route [token required] : '/orders' [POST]
- `Current Order by user` route (args: user id)[token required] : '/orders/current-by-user/:userid' [GET]
- [OPTIONAL] `Completed Orders by user` route (args: user id)[token required] : '/orders/complete-by-user/:userid' [GET]
- [OPTIONAL] `Add product to a specific order` route (args: order_id)[token required] : '/orders/:id/products' [POST]
- [OPTIONAL] `Get orders by order_id foreign key` route (args: order_id)[token required] : '/orders/by_order_id/:id' [GET]

#### Tokens
- For user:
```
{
    "firstName": "Ibrahim",
    "lastName": "Ahmed",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiSWJyYWhpbSIsImxhc3RfbmFtZSI6IkFobWVkIiwicGFzc3dvcmQiOiIkMmIkMTAkak5LYktoL2d5TmFPbTNSWlAuRkVzTzlqUk95Q253N3FES1dwZ3lLRmYzTC9TUDJpRWNYcXEifSwiaWF0IjoxNjQ3MzgwNjQyfQ.3KMRCco-baH66coKIMau2LsKGMcWajDBf0tONHOS550"
}
```
- For user:
```
{
    "firstName": "Mohanad",
    "lastName": "Ahmed",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiTW9oYW5hZCIsImxhc3RfbmFtZSI6IkFobWVkIiwicGFzc3dvcmQiOiIkMmIkMTAkOTNibVNodFNUN3o5ZkdFUG8vN05pLkZyNWVkZWQ5bC9nWjZIdzZzNkgyOUhkcDFyb3RZek8ifSwiaWF0IjoxNjQ3MzgxMDA1fQ.OkhwA-sx3Z8bdppBhqZAWeQ61SUdZHOIdCFLsi0gtno"
}
```
- For user:
```
{
    "firstName": "Diyaa",
    "lastName": "Ahmed",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiRGl5YWEiLCJsYXN0X25hbWUiOiJBaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJDVnM2dxcTRsOGRHOElyNy5CbkVWS3VsbnNtYnlVU3lhSkZSUEdRMVR5TG5LSGIvVnF0L242In0sImlhdCI6MTY0NzM4MTEzN30.jM23fFSLQxpk7uMG_ZftN9bRUdGk8BKJG5t-xWLsOaQ"
}
```

## Data Shapes
#### Product
-  id : SERIAL PRIMARY KEYY
- name : VARCHAR
- price : INTEGER
- [OPTIONAL] category : TEXT

#### User
- id : SERIAL PRIMARY KEYY
- firstName : VARCHAR
- lastName : VARCHAR
- password : TEXT

#### Orders
- id : SERIAL PRIMARY KEYY
- id of each product in the order => ( id in the products table `foreign key` ) : INTEGER
- quantity of each product in the order : INTEGER
- user_id => ( id existed in the users table `foreign key` ) : INTEGER
- status of order (active or complete) : TEXT

#### Order_Products
- id : SERIAL PRIMARY KEYY
- order_id => ( id in the orders table `foreign key` ) : INTEGER
- product_id of each product in the order => ( id in the products table `foreign key` ) : INTEGER
- quantity of each product in the order : INTEGER
