BACKEND

The app was tightly coupled initailly with business logic, routing and data handling all joined together, posing serious risk to scalability and made debugging and writing tests including feature expansion in the future difficult as the code base grows.

I solved this by refactoring the backend into a clear Three-layered architecture creating an abtraction for each layter follwoing MVC pattern DRY and SOLID principles

- Controller layer: handles request, collects query parameters and assign business logic to the service layer

- service layer: comprises all the core business logic including filtering, pagination abstracted from the request/response handling

-Models/ Utility layer: deals with data access in any situation, like read and write from the file.

this separation of concern helped me achieved a

- loosely coupled and modular codebase
  -improve tesability by keeping the logic isolated
  -laying a foundation for future app scaling

further more, i implemented offset-based pagination with server-side search (q parameter) to optimize performance when dealing with large dataset

FRONTEND

The initial frontend implementation rendered the entire dataset to the UI, causing performance bottleneck, especially with large lists. I resolved this, by

-virtualizing list rendering with react-window inorder to avoid hundreds or even thousands of DOM nodes all at once, also implemented virtual scrolling using same approach, where visible portion is rendered to the list at any given time, reducing rendering overhead and improvment of the UI's responsiveness

-pagination and infinite scrolling was added using limit and offset query parameters to fetch items icrementally. As the user scrolls to the bottom more of the items are loaded seamlessly imporving data loading efficiently without overwhelming the client and server side

-Some minimal styling was implemented to improve the styling a bit to enhance usability and visual hierarchy, making the app more intuitive and user friendly

- memory leak was prevented by safely cancelling all asynchronous operations when the component unmounts. This prevents state updating on unmounted component, in active fetches. This changes will make the fronend highly performat, userfriendly and scalable
