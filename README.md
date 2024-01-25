# Foodly - College Food Ordering App

Welcome to Foodly, a web application that allows students of our college to conveniently order food from nearby restaurants. This README provides instructions on setting up and running the app locally.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

1. Open two terminals, one in the root directory and the other in the `./server` directory.

2. In the first terminal (root directory), run the following command to install dependencies:

   ```bash
   npm install
   ```

3. In the second terminal (`./server` directory), run the following command to install server dependencies:

   ```bash
   cd server
   npm install
   ```

4. After installing dependencies, in the first terminal (root directory), run the following command to start the development server:

   ```bash
   npm run dev
   ```

5. In the second terminal (`./server` directory), run the following command to start the server:

   ```bash
   npm run start
   ```

6. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## Features

### Implemented Features:

#### Student Side:

- **User Authentication:**

  - Register and log in to your account.
  - View and update your profile.

- **Browse Restaurants:**

  - Explore a list of nearby restaurants.
  - View restaurant details, including their menu.

#### Restaurant Side:

- **Restaurant Authentication:**

  - Log in to your restaurant account.
  - Update restaurant information.

- **Menu Management:**

  - Add, update, or remove items from the restaurant menu.

### Features Yet to be Implemented:

As Foodly is currently in the prototype stage, some features are yet to be implemented. We plan to enhance the app with the following features in future updates:

- **Cart and Checkout:**

  - Allow students to review their selected items in the cart.
  - Implement a checkout process for placing orders.

- **Enhanced Restaurant Order Management:**
  - Provide a comprehensive view of order details for restaurants.
  - Allow restaurants to update order status to reflect progress (e.g., pending, on the way).
