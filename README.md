# NTPOS - Microservices-based Point of Sale System

## Project Overview
This repository contains the source code for a **Point of Sale (POS) system** developed using a **Microservices Architecture**. The system consists of multiple services that work together to manage sales, inventory, orders, payments, and user authentication.
#### LINK DOCUMENT: https://drive.google.com/file/d/1IvQ5EC8E5ygKcWMda0t6Nc-wERDg7O1k/view

## Source Code Structure
The project consists of multiple components:

### **Frontend Applications**
1. **ntpos_admin_mobile** - Mobile application (React Native) for store owners and employees to manage sales.
2. **ntpos_web** - Web-based management system (React.js) for store owners and employees.
3. **user_app** - Mobile application (React Native) for customers to place orders and reserve tables.

### **Backend Microservices** (`ntpos-microservices`)
| Module              | Description |
|---------------------|-------------|
| **api-gateway**     | Manages API routing and load balancing. |
| **auth-service**    | Handles authentication (login, registration, and user management). |
| **chat-service**    | Manages real-time messaging between users and support agents. |
| **config-server**   | Centralized configuration management for all services. |
| **discovery-server**| Eureka server for service discovery. |
| **inventory-service** | Manages stock, supplier information, and inventory tracking. |
| **notification-service** | Handles system-wide notifications. |
| **order-service**   | Manages order placement, reservations, and order tracking. |
| **payment-service** | Processes transactions and payments. |
| **product-service** | Manages product listings, categories, and images. |
| **user-service**    | Integrates with Keycloak for user management and authentication APIs. |

## **System Architecture**
The system is designed following **Microservices Architecture**, divided into ten main components:

### **1. User Interfaces (UI Layer)**
- **React Native mobile app** for store owners.
- **React.js web-based admin panel** for store management.
- **React Native mobile app** for customers to place orders and reserve tables.

### **2. Communication Layer**
- **GraphQL & REST API** for frontend-to-backend communication (GraphQL as the primary API, REST for specific cases).
- **gRPC** for efficient service-to-service communication using HTTP/2.

### **3. gRPC Communication**
- Used exclusively for backend-to-backend data exchange due to its speed and efficiency.

### **4. Management Services**
- **Eureka Server** for service discovery and registration.
- **Config Server** for centralized service configuration.
- **API Gateway** for request routing, load balancing, and security enforcement.

### **5. Security Layer**
- **Keycloak** provides OAuth 2.0-based authentication and user role management.

### **6. Core Business Services**
| Service | Functionality |
|---------|--------------|
| **payment-service** | Manages transactions for orders, refunds, and supplier payments. |
| **product-service** | Handles product catalog management. |
| **order-service** | Manages order processing, returns, and table reservations. |
| **user-service** | Handles user management and role-based access. |
| **inventory-service** | Tracks stock levels and supplier data. |

### **7. Supporting Services**
| Service | Functionality |
|---------|--------------|
| **notification-service** | Sends system notifications and alerts. |
| **auth-service** | Provides user authentication and authorization APIs. |
| **chat-service** | Enables real-time customer support messaging. |
| **resource-service** | Manages file storage for images and documents. |

### **8. Database & Persistence Layer**
- **JDBI** for database connection management.
- **MySQL** as the primary relational database.

### **9. Event-Driven Architecture**
- **Kafka & Zookeeper** handle event-driven messaging and asynchronous task processing.

### **10. Monitoring & Logging**
| Technology | Purpose |
|------------|---------|
| **Zipkin** | Distributed tracing of service requests. |
| **Prometheus** | Service health monitoring and alerting. |
| **Grafana** | Visualization of monitoring data from Prometheus. |

## **Technologies Used**
- **Frontend:** React Native, React.js
- **Backend:** Spring Boot (Java), Microservices
- **Databases:** MySQL
- **Security:** Keycloak, OAuth 2.0
- **Message Queue:** Apache Kafka, Zookeeper
- **Logging & Monitoring:** Zipkin, Prometheus, Grafana
- **Configuration Management:** Eureka, Config Server
- **API Communication:** GraphQL, REST, gRPC

## **Setup & Deployment**
### **Prerequisites**
- Java 17
- Node.js 16+
- Docker & Docker Compose
- PostgreSQL / MySQL
- Keycloak authentication server

### **Installation Steps**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo.git
   cd ntpos-microservices
   ```
2. **Start Services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```
3. **Run Backend Services Manually:**
   ```bash
   mvn clean install
   mvn spring-boot:run -pl api-gateway
   ```
4. **Start Frontend Applications:**
   ```bash
   cd ntpos_web && npm start
   cd ntpos_admin_mobile && npx react-native run-android
   ```