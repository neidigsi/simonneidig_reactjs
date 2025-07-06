# ReactJs Frontend of Personal Website

This repository contains the frontend for the website [https://simon-neidig.eu](https://simon-neidig.eu), built with React, React Redux, React Router, Tailwind CSS, and Vite.

## Goals

The primary goal of this project is to deliver a modern, user-friendly, and maintainable web application for [simon-neidig.eu](https://simon-neidig.eu). The following objectives guide the development and architecture of the frontend:

- Modern and appealing user interface
- Responsive design for all devices
- Support for multiple languages (currently German, English, and French)
- Dark mode support
- Easy customization and extensibility
- Clean and developer-friendly documentation, with detailed READMEs throughout the codebase
- Maintainability and code quality
- Integration with backend services

These goals collectively ensure that the application not only meets current needs but is also well-prepared for future enhancements and scaling.

This README provides an entry point and overview for developers working with this repository.

## Getting Started

To run the application locally, follow these steps:

1. **Install Node.js and npm**  
   Make sure you have the latest versions of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) installed.

2. **Install dependencies**  
   Open your terminal, navigate to the root directory of this repository, and run:
   ```
   npm install
   ```

3. **Start the development server**  
   Launch the application in development mode with:
   ```
   npm run dev
   ```

4. **Access the application**  
   Open your browser and go to [http://localhost:5173](http://localhost:5173).

## Concepts

A variety of architectural and design concepts have been considered in the implementation of this web application. The following sections provide an overview of the most important aspects.

### Code Structure

The codebase is organized for clarity and scalability. For a detailed overview of the folder structure and architectural decisions, see [./app/README.md](./app/README.md).

### State Management

Global state management is handled using Redux Toolkit and React Redux. This enables efficient and predictable state updates across the application.  
For details on the state structure and usage, see [./app/store/README.md](./app/store/README.md).

### Multi Language Support

As a freelancer with roots in Germany and based in France, supporting multiple markets is essential. The application currently supports German, English, and French.  
For implementation details, see [./app/assets/locales/README.md](./app/assets/locales/README.md).

### Styling

Styling is managed using [Tailwind CSS](https://tailwindcss.com/), which provides utility-first classes for rapid UI development.  
The application supports both light and dark modes and uses custom CSS for additional styling needs.  
For more information, see [./app/assets/css/README.md](./app/assets/css/README.md).

### Networking

The frontend communicates with the backend service at [https://github.com/neidigsi/simonneidig_fastapi](https://github.com/neidigsi/simonneidig_fastapi).  
For details on API integration and networking logic, see [./app/networking/README.md](./app/networking/README.md).

### Icons

To ensure a consistent and modern look throughout the application, all icons are sourced from the [Heroicons](https://heroicons.com) icon pack. This approach guarantees visual consistency and makes it easy to add or update icons as needed.

The application uses the [@heroicons/react](https://www.npmjs.com/package/@heroicons/react) library to provide SVG icons as React components. To simplify icon usage and allow dynamic icon selection (e.g., based on backend configuration), a custom `Icon` component is implemented. This component enables importing and rendering icons by their string name.

Example usage:

```typescript
import Icon from "@/components/general/icon";

<Icon icon="FlagIcon" />
```

You can find all available icon names on the [Heroicons website](https://heroicons.com). To add a new icon, simply use its name as a string in the `icon` prop of the `Icon` component.

---

For further details, please refer to the specific README files in each subdirectory.