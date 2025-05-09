


Database creation and configuration

mysql -u root -p

CREATE DATABASE solfintdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
SHOW DATABASES;
CREATE USER 'solfintuser'@'localhost' IDENTIFIED BY 'S0lf1nt@123';
GRANT ALL PRIVILEGES ON solfintdb.* TO 'solfintuser'@'localhost';
FLUSH PRIVILEGES;


npm install sequelize mysql2
npm install --save-dev sequelize-cli
npx sequelize-cli init

chek database npm run check:db

Users
npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name create-roles
npx sequelize-cli migration:generate --name create-clients
npx sequelize-cli migration:generate --name create-user-roles



npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
npx sequelize-cli model:generate --name Role --attributes name:string,description:string
npx sequelize-cli model:generate --name Client --attributes name:string,parentClientId:integer
npx sequelize-cli model:generate --name UserRole --attributes userId:integer,roleId:integer,clientId:integer

Seeders.

npx sequelize-cli seed:generate --name demo-super-admin
root@production:/var/www/loing# npx sequelize-cli db:seed --seed seeders/20250405212535-demo-client.js
npx sequelize-cli db:seed --seed seeders/20250405213000-super-admin.js

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all


+----+------------+-------------------+----------+---------------------+---------------------+----------+
| id | username   | email             | password | createdAt           | updatedAt           | clientId |
+----+------------+-------------------+----------+---------------------+---------------------+----------+
|  1 | superadmin | admin@solfint.com | 12345678 | 2025-04-05 21:13:04 | 2025-04-05 21:13:04 |        1 |
+----+------------+-------------------+----------+---------------------+---------------------+----------+
1 row in set (0.00 sec)