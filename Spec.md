# Project Specification: Report Generator

## Overview
This project is a Report Generator application. Its primary purpose is to dynamically generate reports based on various data inputs and user configurations. The application is built using React for the frontend, providing a modular and interactive user interface.

## Core Components

### 1. [`App.js`](report-generator-app/src/App.js)
The main application component that orchestrates the overall layout and functionality. It will likely manage state related to report data, user inputs, and rendering of different report sections.

### 2. [`Restricted_Report_Style.css`](report-generator-app/src/Restricted_Report_Style.css)
This CSS file is intended for styling specific elements within the report content that have restricted or unique styling requirements. It should be used carefully to avoid conflicts with global styles.

## Full Page Component Styling
When generating React files based on this Spec.md, all full page components (Full Page Component) must have their main content block (main container) include `className="page-content"`. This class is used to unify page layout and style identification, facilitating global styling and layout control.

## Data Flow
The application will read data from JSON and CSV files, process it, and then pass it down to the relevant components for rendering reports and charts. State management (e.g., using React's `useState` or `useContext`, or a state management library) will be crucial for handling data across components.

## Styling
The project uses CSS modules or standard CSS files for styling. Each component's CSS file should ideally contain styles specific to that component to promote modularity and prevent style conflicts.

## Development Environment
The project is a React application, so standard React development practices apply. This includes using `npm start` for development, `npm build` for production builds, and following React component lifecycle best practices.

## AI Assistant Guidelines
When working on this project, the AI assistant should:
- Prioritize modularity and reusability of components.
- Adhere to existing naming conventions and code style.
- Ensure all new features are well-tested.
- Document any significant changes or additions.
- Pay close attention to styling to maintain a consistent look and feel.
- Consult this `Spec.md` file for project overview and component responsibilities.
- All code, especially related to layout and styling, must consider the final output as an A4-sized PDF report, not a web page. This includes ensuring proper pagination, print-friendly styles, and absolute positioning where necessary for PDF generation tools.
- Each new page generated must start on a new PDF page to ensure proper document structure and readability.
- All command-line operations and scripts should be designed and executed with Windows operating system commands in mind.