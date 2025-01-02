# Social Graph App

A Social Graph backend based on Neo4j graph database & Java Spring

## Features
- Create users, posts
- Allow users to follow other users, like their posts

## Installation
Step 1: Clone the project using the following command:
git clone https://github.com/SurgeousJP/SocialGraphApp.git

Step 2: Install Maven and build the application using the terminal with command:
maven clean install

Step 3: Run the built JAR file from the terminal in the project directory using the command:
java -jar target/spring-boot-neo4j-0.0.1-SNAPSHOT.jar
The expected output upon successful execution is as follows:
![image](https://github.com/user-attachments/assets/5c45ca89-ae71-4b37-abd5-9ffc35df2fff)

Step 4: Install Postman or use cURL commands to test the available routes (Postman is recommended for easier route exploration). The Postman file is provided in the team's GitHub repository.
![image](https://github.com/user-attachments/assets/9116f29e-e6d7-47d2-b997-c730225119e5)

Step 5: Use Postman to execute the routes and test the application's functionality. This allows you to verify that the routes are working as intended and explore the application's features interactively.
![image](https://github.com/user-attachments/assets/a32c460f-7428-4918-8313-dfe75dd563e4)

## Note
Please note that upon the first time run the data is empty (due to the database is local), please create your own data for testing using the APIs
