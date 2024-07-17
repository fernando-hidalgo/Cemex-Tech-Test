# CEMEX Angular Tech Test
## Initial Setup
- First, run the command npm i in the folder where the package.json is located to install the dependencies.
- The project includes a mocked backend using JSON Server, which can be started with npx json-server mock.json and accessed at http://localhost:3000/.
- Finally, start the Angular project by running ng serve.

## Documentation
### Summary

The test consists of creating an order management table, with the ability to list and filter orders (Status, Production Line, Start/End Date, and Order Number).
### Backend (Mock)

As previously mentioned, the backend is provided through a .json file that acts as a database. Using the json-server library, a mock backend is created with the minimum endpoints to interact with this database.
Models

To interact with the backend, a model has been created with the attributes specific to this database object:

- Order

### Components and Views

Component management has been done by hosting a component called order-history in the main view of the project (app.component), which contains the complete logic and design of the table and filters.

Filtering allows the user to use the filters in any order, combining their capabilities to achieve a more precise search. For cases like the Product Line filter, the suggested options vary based on those currently present in the table.
### Services

Interaction with the backend has been handled by creating a service for each of the views, with the necessary endpoints to supply the frontend with data.

Each endpoint refers to a constants file to determine the specific route, facilitating project maintenance and scalability, and similarly, the host where the backend is located, preparing it for future deployment.

### CSS

For styling, SCSS (Syntactically Awesome Style Sheets) has been used due to its additional capabilities compared to conventional CSS, such as class nesting.

To facilitate this nesting, a parent-child class naming convention is used, for example:

- Parent div -> class="card"
- Child div -> class="card__content"

The design for desktop closely follows the mobile view, making it responsive across multiple devices.
### Testing

For testing, the Karma Jasmine tool, the default option in Angular, has been used, developing tests for the new views, components, and services interacting with the backend.
