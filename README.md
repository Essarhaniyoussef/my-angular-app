# MyAngularApp

This project is an **Offline Invoice App** built with **Angular** and **IndexedDB**. It allows admins to manage products (CRUD) and users to browse products, add them to a cart, and generate invoice PDFs—all offline.

---

## 📝 Features

* **User Authentication**

  * Signup & Login
  * Role-based access (Admin / User)

* **Product Management (Admin only)**

  * Add, Edit, Delete products
  * View all products

* **Shopping & Invoicing (User)**

  * Select product quantity
  * Add products to cart
  * Generate invoice PDFs with user name and invoice details

* **Offline-First**

  * Data stored in **IndexedDB**
  * Fully functional offline

* **Responsive and Styled UI**

  * Professional, clean design
  * Green theme (#28a745) consistent across buttons

---

## 🛠️ Technologies Used

* **Angular 21+ (Standalone Components)**
* **TypeScript & HTML / CSS**
* **IndexedDB (Dexie.js)**
* **jsPDF + jsPDF-AutoTable** for invoice PDF generation
* **Angular Forms (ngModel)**

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/Essarhaniyoussef/my-angular-app.git
cd my-angular-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
ng serve
```

4. Open in browser:

```
http://localhost:4200
```

The app will automatically reload when source files are modified.

---

## 🔐 Admin vs User

* **Admin**

  * Can perform **CRUD** operations on products
  * Can see all product details

* **User**

  * Can **browse products**
  * Can **add products to cart** and generate invoices
  * Cannot modify product data

---

## 💡 Notes

* The application is **offline-first**. All data is stored in **IndexedDB**.
* Invoice PDFs include the **user's name**, product list, quantities, totals, and grand total.
* Role-based access ensures admins have full control while users have limited access.

---

## Development Server

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application reloads automatically on source changes.

---

## Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

For a complete list of schematics:

```bash
ng generate --help
```

---

## Building

Build the project for production:

```bash
ng build
```

Build artifacts are stored in the `dist/` directory and optimized for performance.

---

## Running Unit Tests

To execute unit tests using [Vitest](https://vitest.dev/):

```bash
ng test
```

---

## Running End-to-End Tests

To execute e2e tests:

```bash
ng e2e
```

Angular CLI does not come with a default e2e framework; choose one suitable for your needs.

---

## Additional Resources

Additional Resources

For more information on Angular CLI, visit the Angular CLI Overview and Command Reference.
