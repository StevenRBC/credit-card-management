# Credit Card Management Frontend

This project is the **frontend application** for managing customers and their associated credit cards. It is built with **Angular** and styled with **Bootstrap** for responsive design. The frontend integrates seamlessly with the [Credit Card Management API](https://github.com/StevenRBC/credit-card-api).

---

## Features
- **Customer Management**: Add, view, edit, and delete customers.
- **Credit Card Management**: Add, view, edit, and delete credit cards.
- **Dynamic Forms**: Forms for creating and updating data.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Angular CLI** (v15 or higher) - Install using:
  ```bash
  npm install -g @angular/cli
  ```
- **Docker** (optional for containerized deployment)

---

## Project Structure
```plaintext
credit-card-management-frontend/
├── src/
│   ├── app/               # Main Angular application
│   │   ├── features/      # Feature modules
│   │   ├── core/          # Services, models, and utilities
│   │   └── shared/        # Shared components and modules
│   ├── assets/            # Static files and icons
│   └── index.html         # Main entry point
├── angular.json           # Angular project configuration
├── Dockerfile             # Dockerfile for production deployment
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

---

## Running the Project

### 1. Clone the Repository
```bash
git clone <repository-url>
cd credit-card-management-frontend
```

### 2. Install Dependencies
Install all project dependencies using:
```bash
npm install
```

### 3. Run the Application Locally
Start the Angular development server with:
```bash
ng serve
```
The application will be accessible at **`http://localhost:4200`**.

Ensure the backend API is running at **`http://localhost:8080`**. 

---

## Integration with Backend
The frontend interacts with the backend REST API. Make sure the backend is up and running at the specified API URL.

**Backend Repository**: [Credit Card Management API](https://github.com/StevenRBC/credit-card-api)

---

## Key Pages
1. **Customer List**: View all customers and their credit cards.
2. **Customer Form**: Create or edit customer details.
3. **Customer Details**: View customer information and manage credit cards.
4. **Credit Card Management**: Add, update, or delete credit cards.

---

## Author
**Steven Rodriguez**

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- **Angular** for frontend development.
- **Bootstrap** for responsive design.
- **Docker** for containerization.

---

## Notes
For any questions or issues, feel free to open an issue in the repository.

