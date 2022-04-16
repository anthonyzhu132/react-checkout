# How-To: Getting Started

### Backend

Start backend server with:

```sh
cd ./server
yarn && yarn start
```

Server should be running at `http://localhost:8000` and product endpoint (GET) is located at `http://localhost:8000/products`

### Frontend

Start frontend server with:

```sh
cd ./frontend
yarn && yarn start
```

## Features

In this test, please use redux for state management and your preferred side effect library (redux-thunk, redux-saga, redux-observable) if needed! We strongly recommend you follow _functional programming_ practices when it comes to how you write your code, as a result we prefer you don't use redux-toolkit since the code written resembles mutable patterns.

UI should have the following features:

1. **Products should show selectable options based on each `Product` data.**

   Inherently, selectable options are dynamic and each product can have different ones.
   You should be able to select any combination of provided selectable options, but only be able to add to cart a _valid_ product variant. `SelectionOption` is not known ahead of time and is derived from each product.

   A valid variant is one where:

   - it's parent `Product` is not discontinued
   - it's quantity is greater than 0
   - is not discontinued

2. **Products should show OOS label if**

   - all variants are invalid
   - product is discontinued

3. **Fully functional cart**

   - You should be able to add to cart _valid_ variants
   - You should be able to change the quantity in the cart.
   - You should be able to remove items from cart.

## Utiziling App
![Entire App](https://github.com/anthonyzhu132/react-checkout/blob/366c33fa0ffa64c1f9b3bd78423b8bffb3830d1c/frontend/docs/entire-app-screenshot.png)
![Cart Screenshot](https://github.com/anthonyzhu132/react-checkout/blob/366c33fa0ffa64c1f9b3bd78423b8bffb3830d1c/frontend/docs/cart-screenshot.png)
![Dialog Screenshot](https://github.com/anthonyzhu132/react-checkout/blob/366c33fa0ffa64c1f9b3bd78423b8bffb3830d1c/frontend/docs/dialog-screenshot.png)
![State Screenshot](https://github.com/anthonyzhu132/react-checkout/blob/366c33fa0ffa64c1f9b3bd78423b8bffb3830d1c/frontend/docs/entire-app-screenshot.png)
![State Screenshot](https://github.com/anthonyzhu132/react-checkout/blob/366c33fa0ffa64c1f9b3bd78423b8bffb3830d1c/frontend/docs/redux-state-screenshot.png)
![App Gif](https://github.com/anthonyzhu132/react-checkout/blob/366c33fa0ffa64c1f9b3bd78423b8bffb3830d1c/frontend/docs/app.gif)