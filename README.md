# Invoice App

Invoice App is a versatile web application designed to simplify invoice management. It offers an array of features, including responsive design, form validation, draft invoice saving, light/dark mode, and more.

## Table of Contents

- [Overview](#overview)
  - [Try It Out](#try-it-out)
- [Features](#features)
  - [1. Responsive Layout](#1-responsive-layout)
  - [2. Interactive Elements](#2-interactive-elements)
  - [3. Invoice Management](#3-invoice-management)
  - [4. Draft Invoices](#4-draft-invoices)
  - [5. Invoice Filtering](#5-invoice-filtering)
  - [6. Light and Dark Mode](#6-light-and-dark-mode)
  - [7. Persistent Data](#7-persistent-data)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)
- [Acknowledgments](#acknowledgments)

## Overview

### Try It Out

Experience the Invoice App without any installation hassle. Access it [here](https://aa-invoice-app.netlify.app).

## Features

1. **Responsive Layout**:
   - Enjoy an optimal user interface that adapts to various screen sizes.

2. **Interactive Elements**:
   - Explore interactive elements with responsive hover states for enhanced usability.

3. **Invoice Management**:
   - Seamlessly create, read, update, and delete invoices for efficient organization.

4. **Draft Invoices**:
   - Save draft invoices and mark pending invoices as paid, ensuring you never lose valuable data.

5. **Invoice Filtering**:
   - Effortlessly filter invoices by their status (draft, pending, or paid) for quick access to the information you need.

6. **Light and Dark Mode**:
   - Toggle between light and dark mode to suit your visual preferences and reduce eye strain during extended usage.

7. **Persistent Data**:
   - Keep your data intact even after refreshing the browser, thanks to the power of `localStorage` (if not building a full-stack app).

## Technologies Used

- **Vue.js**: A progressive JavaScript framework for building dynamic user interfaces.
  - Version: ^3.3.4

- **Vue Router**: A routing library for Vue.js applications, facilitating seamless navigation.
  - Version: ^4.2.4

- **Vite**: A fast and efficient development server and build tool for Vue.js apps.
  - Version: ^4.4.9

- **TypeScript**: A statically typed JavaScript superset for improved code quality and maintainability.
  - Version: ~5.1.6

- **Lodash**: A versatile JavaScript utility library for data manipulation.
  - Version: ^4.17.21

- **Playwright**: A Node.js library for automating browsers, enabling comprehensive end-to-end testing.
  - Version: ^1.37.0

- **JSDOM**: A JavaScript implementation of the Document Object Model (DOM), essential for Node.js-based testing.
  - Version: ^22.1.0

- **Prettier**: An opinionated code formatter ensuring code consistency and readability.
  - Version: ^3.0.3

- **ESLint**: A static code analysis tool for identifying and fixing JavaScript code issues.
  - Version: ^8.46.0

- **Stylelint**: A linter for enforcing CSS and Sass style guidelines.
  - Version: ^15.10.3

- **Vue Test Utils**: A utility library for efficient Vue.js component testing.
  - Version: ^2.4.1

- **LocalStorage**: A client-side storage mechanism that ensures data persistence within the app.

- **PostCSS**: A powerful CSS preprocessor that enhances stylesheet processing.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Project Setup

```sh
npm install
```

#### Development Mode

To develop the app with hot-reloading, run:

```sh
npm run dev
```

#### Production Build

For a production-ready build, execute:

```sh
npm run build
```

The design inspiration was drawn from the [Invoice App challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl).
