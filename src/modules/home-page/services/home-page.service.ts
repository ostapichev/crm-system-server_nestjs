import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class HomePageService {
  public getHomePage(res: Response): void {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
         <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
         <link rel="icon" 
               href="https://owu.com.ua/wp-content/uploads/2023/12/Blue-Big-Bird-Final-Logo.webp" 
               type="image/webp"
         >
         <title>Well come to API</title>   
      </head>
      <body class="container mt-5 bg-body-secondary">
      <div class="card border-success text-center mb-3" style="max-width: 100%;">
         <div class="card-header bg-transparent border-success">
            <h1 class="mb-4">Well come to API crm system</h1>
            <img src="https://ru.osvita.ua/doc/images/guide/367/36709/36709_tmp2-36709_m.jpg" alt="okten_school" />
         </div>
         <ul class="list-group w-50 mt-3 mx-auto">
            <li class="list-group-item">
               <a href="/api/docs" class="btn btn-primary w-100" target="_blank">
                  API docs
               </a>
            </li>
            <li class="list-group-item">
               <a href="https://owu.com.ua" class="btn btn-success w-100" target="_blank">
                  OktenWeb University
               </a>
            </li>
         </ul>
         <div class="card-body text-secondary">
            <h5 class="card-title">This project is backend component. The frontend component is located: 
               <a href="https://github.com/ostapichev/crm-system-client" target="_blank">crm system client</a>
            </h5>
            <p class="card-text">
               The CRM system for an IT school is a web application designed to streamline student management, 
               course enrollment, and administrative processes.
            </p>
            <p>
               The backend is built using NestJS with TypeScript, docker-compose, redis and MySQL cloud service: 
               <a href="http://owu.linkpc.net/mysql" target="_blank">http://owu.linkpc.net/mysql</a>
            </p>
            <div class="row">
               <p class="h4 mt-3">Launch of the project</p>
               <ol class="list-group list-group-numbered ps-3 pe-3">
                  <li class="list-group-item list-group-item-info text-start">
                    To run the project on your computer you must install Node JS version 22.XX.XX, 
                    NPM version 10.XX.XX, Docker version 27.X.X, Intellij IDEA ultimate edition 
                    and Postman for testing the operation endpoints. 
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                        Clone the repository 
                     <a href="https://github.com/ostapichev/crm-system-server_nestjs">crm system server</a> 
                        to your local machine:
                     <code>git clone https://github.com/ostapichev/crm-system-server_nestjs</code>
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      Insert your data on the <code>local.env</code> file.
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      Install the project dependencies: <code>npm install</code>
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      Start the project: <code>npm run start:docker:db</code> then <code>npm run start:local</code>  
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      When the project is launched for the first time, 
                      an admin with superuser rights is created using data from the <code>local.env</code>.
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      Open your web browser and access URL home page: 
                      <code>http://localhost:[port from local.env]/api/home</code>
                      and swagger documentation 
                      <code>http://localhost:[port from local.env]/api/docs</code>   
                  </li>
               </ol>
               <p class="h4 mt-5">Details</p>
               <p class="h5 text-start">User rights and roles</p>
               <ul class="list-group pe-0">
                  <li class="list-group-item list-group-item-info text-start">
                      - Admin rights:
                      Admin (Super user) can create users (managers). Only the super user has access to endpoints for
                      sending an url in any messenger with creating a password and activating the account, 
                      resetting the current password and creating a new one, blocking or unblocking the user. 
                      The default password for all created users is <code>admin</code>. 
                      A blocked or unregistered user will not be able 
                      to log in. The super user can create new groups, 
                      orders and edit his orders or orders with the 
                      “new_order” status. He can also create an Excel file according to the 
                      accepted filtering, sorting, and write comments under his order or orders with the “new_order” 
                      status. Statistics are available for all orders and users. 
                      After writing a comment under the order with the “new_order” status, 
                      the order will be accepted and receive the “in_work” status . 
                      If you edit an accepted order and give 
                      it the “new_order” status, it will be available to other managers.  
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      - User (manager) rights:
                      The user (manager) on the site creates a new group, order, or can edit his order. 
                      He can also create an Excel file according to the accepted filtering and sorting, 
                      write comments under an order with the 
                      “new_order” status or under his own order. Personal statistics on his orders are available. 
                      After writing a comment under the order with the “new_order” status, 
                      the order will be accepted and receive the “in_work” status. 
                      If you edit an accepted order and give it the “new_order” status, 
                      it will be available to other managers.
                  </li>
               </ul>
               <p class="h5 text-start mt-3">Tokens</p>
               <ul class="list-group mb-3 pe-0">
                  <li class="list-group-item list-group-item-info text-start">
                      Access token after login is valid for 10 minutes.
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      Refresh token is valid for 20 minutes.
                  </li>
                  <li class="list-group-item list-group-item-info text-start">
                      Activate token is valid for 30 minutes.
                  </li>
               </ul>
               <div class="card-footer bg-body-tertiary border-success">
                  <p class="h4 text-start mt-3">Contacts</p>
                  <ul class="list-group">
                     <li class="list-group-item text-start">
                        <i class="bi bi-person-fill"></i>&nbsp;
                           Oleh Ostapenko
                     </li>
                     <li class="list-group-item text-start">
                        <i class="bi bi-telephone-fill"></i>&nbsp;
                           38-(093)-721-68-19
                     </li>
                     <li class="list-group-item text-start">
                        <i class="bi bi-envelope-at-fill"></i>&nbsp;
                           ytoxos@gmail.com
                     </li>
                     <li class="list-group-item text-start">
                        <i class="bi bi-github"></i>&nbsp;
                           <a href="https://github.com/ostapichev" target="_blank">https://github.com/ostapichev</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
      </body>
      </html>
    `);
  }
}
