# Portfolio - Arjun (Developer, Game Dev & Robotics)

A single-page, Swiss-style portfolio built with React, TanStack Start, and Tailwind CSS. The portfolio showcases Unity game dev, ESP32 robotics, creative AI tooling, and full-stack projects.

## 🚀 Getting Started

To run the project locally, you need Node.js and npm installed. 

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

## 🧩 Components & Entry Point

The application uses **TanStack Start** and **TanStack Router**.

### Main Entry Point

The primary entry point for the UI is located at [`src/routes/index.jsx`](src/routes/index.jsx). It defines a single-page layout that stacks all the sections under a fixed navigation bar with smooth scrolling enabled.

### Components Structure

The application is composed of several modular React components located in the [`src/components`](src/components) directory. The `Index` route assembles them to build the single-page experience:

- **`Nav`**: The fixed top navigation bar, linking to different sections of the page.
- **`Hero`**: The introductory landing section.
- **`About`**: Details and background information.
- **`Skills`**: A showcase of technical skills and tools.
- **`Projects`**: A gallery of selected works (Games, Robotics, Full-stack).
- **`Contact`**: The footer section for reaching out.
- **`GridLines`**: A background stylistic element that adds a grid pattern to the site.
- **`Magnetic`**: A wrapper component for interactive magnetic hover effects on elements.
- **`SectionHeading`**: A reusable heading component for the different portfolio sections.
- **`Stats`**: A component displaying numerical statistics or achievements.

These components are brought together in `src/routes/index.jsx` to form a seamless scrollable portfolio page.

## 🛠️ Built With

- [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
