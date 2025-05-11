# Shopping Cart App

[![Run Tests](https://github.com/AchilleasMich/shopping-cart-app/actions/workflows/test.yml/badge.svg)](https://github.com/AchilleasMich/shopping-cart-app/actions/workflows/test.yml)

This is a simple shopping cart application built

## Features

- Add, update, and remove items from the cart.
- View total price and item count in real-time.

## Assumptions and Known Limitations
- All price calculations are performed in cents to avoid floating point arithmetic. When required (percentage discounts) a ceil function was used to avoid undercharging
- Navigation from `/orders` to `/` using the back button does not reset the cart (known issue)
- Inconsistent approach to handling requests: GET uses a custom hook (useFetch), while POST/PUT use standalone functions
- No persistent storage is implemented. Intentional decision to simplify testing by refreshing the page
- No e2e tests
- Error handling is minimal and mediocre
- Data returned when applying a coupon seem to be wrong. More time to investigate was required
- No healthcheks to docker-compose files. Could not extent api image to add curl or other tools for health checking
- No dedicated 404 page
- No Add/Remove buttons inside the cart


## How to Run

### Clone the repository

```bash
git clone https://github.com/your-username/shopping-cart-app.git
cd shopping-cart-app
```


### Production build

```bash
docker-compose up -d
```

The service will be available on **localhost:8081**

In case port 8081 is already used in your system, please change it by exporting the following enviromental variable `export SHOPPING_CART_PORT=<your port of choice>`


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

The service will be available on **localhost:5173**

In case port 5173 is already used in your system, please change it by exporting the following enviromental variable `export VITE_DEV_PORT=<your port of choice>`


### Unit tests
```bash
cd /frontend
npm run test
```
