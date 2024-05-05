# Shop Page

This is the main shop page for our web application. It's built using EJS, a simple templating language that lets you generate HTML markup with plain JavaScript.

## Features

- **Bootstrap**: The page uses Bootstrap for styling. This includes the Bootstrap CSS, JS, and Icons libraries.
- **Custom Stylesheet**: A custom stylesheet (`styles.css`) is also linked for additional styles.
- **Header**: The header of the page is included using EJS's `include` function.
- **Recently Arrived Plants Section**: This section displays a list of recently arrived plants. Each plant is displayed in a Bootstrap card with an image, title, price, and an "Add to cart" button.

## Structure

The structure of the page is as follows:

- The `head` section includes links to the Bootstrap and custom stylesheets, and the Bootstrap JS library.
- The `body` section includes the header and the main content of the page.
- The main content is wrapped in a `div` with the classes `container` and `mt-5` (a Bootstrap class for top margin).
- Inside the main content `div`, there's an `h2` heading and two `div`s with the class `row` (a Bootstrap class for a grid row). Each `row` contains one or more `div`s with the classes `col-sm-6` and `col-md-6` (Bootstrap classes for grid columns), and each column contains a Bootstrap card for a plant.
- Each card includes an `img` for the plant image, a `div` with the class `card-body` for the content of the card, and inside the `card-body` there's an `h4` for the plant title, a `p` for the price, and an `a` with the class `btn btn-primary` for the "Add to cart" button.