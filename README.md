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

## Technologies

- React
- Vite
- Axios for HTTP requests
- PropTypes for type checking
- Jest & Testing Library for testing

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. To run tests:

```sh
npm run test
```

## Project Structure

```
bloglist-frontend/
├── src/
│   ├── components/
│   │   ├── Blog.jsx
│   │   ├── BlogForm.jsx
│   │   ├── Notification.jsx
│   │   └── Toggable.jsx
│   ├── services/
│   │   ├── blogs.js
│   │   └── login.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── tests/
└── package.json
```

## Testing

The application includes comprehensive testing with Jest and React Testing Library. Test coverage reports are available in the `coverage` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Please ensure your code follows the existing style and passes all tests before submitting a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
