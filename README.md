
React Redux Product Fetching App

This is a React application that utilizes Redux for state management to fetch and display products from a public API. The app includes features like category filtering, infinite scrolling, and search functionality.
Features

    Category Selection: Users can filter products based on categories.
    Infinite Scrolling: Automatically fetches more products as the user scrolls down.
    Search Functionality: Users can search for products by name.
    Responsive Design: The app is designed to be user-friendly on various screen sizes.

Technologies Used

    React: JavaScript library for building user interfaces.
    Redux Toolkit: Simplifies state management in React applications.
    Axios: Promise-based HTTP client for making requests.
    Lodash: Utility library for JavaScript, used here for debouncing scroll events.

Installation
Prerequisites

Ensure you have the following installed:

    Node.js (v14 or later)
    npm (Node Package Manager)
API Endpoints

    Categories: GET https://dummyjson.com/products/categories
    Products: GET https://dummyjson.com/products
