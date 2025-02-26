<p align="center">
  <a href="https://owu.com.ua/" target="blank"><img src="https://owu.com.ua/wp-content/uploads/2023/12/Blue-Big-Bird-Final-Logo.webp" width="200" alt="Okten Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
This project is backend component. The frontend component is located:
<a href="https://github.com/ostapichev/crm-system-client" target="_blank">crm system client</a>
The CRM system for an IT school is a web application designed to streamline student management,
course enrollment, and administrative processes.
The backend is built using NestJS with TypeScript, docker-compose, redis and MySQL cloud service:
<a href="http://owu.linkpc.net/mysql" target="_blank">http://owu.linkpc.net/mysql</a>

## Installation
1. To run the project on your computer you must install Node JS version 22.XX.XX, NPM version 10.XX.XX, 
   Docker version 27.X.X, Intellij IDEA ultimate edition and Postman for testing the operation endpoints.
2. Clone the repository crm system server to your local machine: 
   git clone: 
```bash 
$ https://github.com/ostapichev/crm-system-server_nestjs
```
3. Insert your data on the <code>local.env</code> file.
4. Install the project dependencies:
```bash
$ npm install
```

## Running the app

1. Start the project:
```bash
$ npm run start:docker:db
```
then
```bash
$ npm run start:local
```
2. When the project is launched for the first time, 
   an admin with superuser rights is created using data from the 
   <code>local.env</code>.
3. Open your web browser and access URL home page:
   <code>http://localhost:[port from local.env]/api/home</code> 
   and swagger documentation 
   <code>http://localhost:[port from local.env]/api/docs</code>

## Details
### User rights and roles

-  Admin rights: Admin (Super user) can create users (managers). 
   Only the super user has access to endpoints for sending an 
   url in any messenger with creating a password and activating the account, 
   resetting the current password and creating a new one, 
   blocking or unblocking the user. The default password 
   for all created users is admin. A blocked or unregistered user 
   will not be able to log in. The super user can create new groups, 
   orders and edit his orders or orders with the “new_order” status. 
   He can also create an Excel file according to the accepted filtering, 
   sorting, and write comments under his order or orders with the “new_order” status. 
   Statistics are available for all orders and users. After writing a comment under 
   the order with the “new_order” status, the order will be accepted 
   and receive the “in_work” status . If you edit an accepted order 
   and give it the “new_order” status, it will be available to other managers.
-  User (manager) rights: The user (manager) on the site creates a new group, 
   order, or can edit his order. He can also create an Excel file according 
   to the accepted filtering and sorting, write comments under an order with the “new_order” 
   status or under his own order. Personal statistics on his orders are available. 
   After writing a comment under the order with the “new_order” status, the order will be 
   accepted and receive the “in_work” status. If you edit an accepted order and give it the “new_order” status, 
   it will be available to other managers.

## Stay in touch

- Author - [Oleh Ostapenko](https://github.com/ostapichev)
- Phone - 38-(093)-721-68-19
- mail - <a>ytoxos@gmail.com</a>
