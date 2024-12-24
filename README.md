# Node.js and PostgreSQL Docker Setup

This repository contains a simple setup to run a Node.js application and PostgreSQL database using Docker. It leverages `docker-compose` for easy service orchestration.

---

## **Prerequisites**

1. Install [Docker](https://www.docker.com/).
2. Install [Docker Compose](https://docs.docker.com/compose/install/).

---

## **Project Structure**

```plaintext
.
├── backend/
│   ├── App/
│   ├── Dockerfile             # Dockerfile for Node.js service
│   ├── .env                   # Environment variables for Node.js and PostgreSQL
│   ├── config/
│   │   └── init.sql           # SQL initialization script for PostgreSQL
│   │   └── sqlClient.js
│   ├── docker-compose.yml     # Docker Compose file for the project
│   ├── controller/            # Controller folder for Authentication, Order, and Product
│   │   └── authController.js 
│   │   └── orderController.js
│   │   └── prodController.js
│   ├── middleware/            # jwt logic
│   │   └── auth.js 
│   ├── routes/
│   │   └── authRoutes.js
│   │   └── route.js 
```

---

## **Setup**

### 1. Clone the repository
```bash
git clone https://github.com/zahidi14/Simple-selling-management-backend
cd Simple-selling-management-backend
```


### 2. Build and Start the Services
Run the following command to build and start the containers:
```bash
docker compose up --build
```

To run in detached mode:
```bash
docker compose up -d
```

---

## **Services**

### Node.js
- **Container Name**: `node_app`
- **Port**: `5000` (mapped to `localhost:5000`)
- **Depends On**: PostgreSQL
- **Build Context**: Current directory (`./`)

### PostgreSQL
- **Container Name**: `postgresql`
- **Image**: `postgres:15`
- **Port**: `5432` (mapped to `localhost:5432`)
- **Volumes**:
  - `postgres_data`: For persistent database storage.
  - `./config/init.sql`: SQL script for initializing the database.
- **Healthcheck**: Validates readiness using `pg_isready`.

---

## **Stopping the Services**

To stop the containers:
```bash
docker compose down
```

This will also remove the containers but retain the database volume (`postgres_data`).

To stop and remove all containers, networks, and volumes:
```bash
docker compose down --volumes
```

---

## **Connecting to the Database**

- **Host**: `localhost`
- **Port**: `5432`
- **Username**: As specified in `.env` (`POSTGRES_USER`).
- **Password**: As specified in `.env` (`POSTGRES_PASSWORD`).
- **Database**: As specified in `.env` (`POSTGRES_DB`).

You can use tools like `psql` or graphical clients such as [pgAdmin](https://www.pgadmin.org/) to connect.

---

## **Debugging**

### View Logs
To view logs for all services:
```bash
docker compose logs
```

For a specific service (e.g., `node_app`):
```bash
docker compose logs node
```

### Access Containers
To access the shell of a running container:
```bash
docker exec -it postgresql bash
```

---

## **Contributing**

Feel free to contribute by:
- Opening issues for bugs or feature requests.
- Submitting pull requests with enhancements or fixes.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
