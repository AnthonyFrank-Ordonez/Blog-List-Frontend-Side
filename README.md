# Bloglist Frontend

A React-based frontend application for managing and displaying blog posts. This application is built with React and Vite, allowing users to create, view, like and delete blog posts.

## Features

- User authentication (login/logout)
- View list of blogs
- Create new blog posts
- Like blog posts
- Delete blog posts (for authorized users)
- Responsive notification system
- Toggle visibility for blog details
- Sort blogs by number of likes
- User-specific blog management

## Technologies

### Frontend Core

- **React 18** - Modern UI library with hooks and components
- **Vite** - Next-generation frontend build tool
- **React Router** - For client-side routing

### State Management & Data Fetching

- **React Hooks** - For local state management
- **Axios** - HTTP client for API requests
- **PropTypes** - Runtime type checking

### Testing & Quality

- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code quality and style checking
- **Prettier** - Code formatting

### UI & Styling

- **CSS Modules** - Scoped styling
- **React Icons** - Icon components

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3003/api
```

4. Start the development server:

```sh
npm run dev
```

5. To run tests:

```sh
npm run test
```

## Project Structure

```
bloglist-frontend/
├── src/
│   ├── components/
│   │   ├── Blog.jsx          # Individual blog display
│   │   ├── BlogForm.jsx      # Form for creating blogs
│   │   ├── Notification.jsx  # Toast notifications
│   │   └── Togglable.jsx    # Reusable toggle component
│   ├── services/
│   │   ├── blogs.js         # Blog API interactions
│   │   └── login.js         # Authentication service
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/
├── tests/                   # Test files
└── package.json
```

## Testing

The application includes comprehensive testing with Jest and React Testing Library. Run tests with coverage:

```sh
npm run test:coverage
```

## Available Scripts

- `npm run dev` - Start development server (default port: 5173)
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:

- Follows the existing style
- Includes appropriate tests
- Updates documentation as needed

## License

This project is open source and available under the [MIT License](LICENSE).
