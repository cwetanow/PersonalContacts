## Getting Started
Use these instructions to get the project up and running.

### Prerequisites
You will need the following tools:

* Visual Studio Code or Visual Studio 
* .NET 6
* Node.js
* Docker

### Setup
Follow these steps to start the database (from the root folder)
```
docker pull postgres
docker run --name contacts-database -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=VerySecretPassword -p 5432:5432 -d postgres
```

To update the database (from the root folder)
```
cd server
dotnet tool install --global dotnet-ef
dotnet ef database update --startup-project Api/Api.csproj --project Persistence/Persistence.csproj
```

To run the backend server (from the root folder)
```
cd server
dotnet restore
dotnet build
dotnet run --project Api/Api.csproj
```

To run the frontend (from the root folder)
```
cd client
npm install
npm start
```

Launch [http://localhost:4200/](http://localhost:4200/) in your browser to view the Web UI

Launch [https://localhost:7203/swagger](https://localhost:7203/swagger) in your browser to view the API Swagger interface

## Technologies
* .NET 6
* Entity Framework Core 6
* Angular 15