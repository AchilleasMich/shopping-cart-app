# Shopping Cart App

[![Run Tests](https://github.com/AchilleasMich/shopping-cart-app/actions/workflows/test.yml/badge.svg)](https://github.com/AchilleasMich/shopping-cart-app/actions/workflows/test.yml)

This is a simple shopping cart application built

## Features

- Add, update, and remove items from the cart.
- View total price and item count in real-time.

## How to Run

### Clone the repository
   ```bash
   git clone https://github.com/your-username/shopping-cart-app.git
   cd shopping-cart-app
   ```

### Development server

#### Run the backend server

   ```bash
   docker-compose -f docker-compose-dev.yml up -d
   ```

#### Install frontend dependencies:

   ```bash
   cd /frontend
   npm install
   ```

#### Start the frontend development server:
   
   ```bash
   npm run dev
   ```

#### Alternativly
   
   ```bash
   ./start_dev.sh
   ```
   
   The service will be available on localhost:5173

### Production build

 ```bash
 docker-compose up -d --build
 ```   
The service will be available on localhost:8081
