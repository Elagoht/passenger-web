# Passenger Web

A modern frontend interface for the Passenger-reborn (self-hosted) API, built with React, TypeScript, and Vite. It is also self-hosted.

## Overview

Passenger Web provides a user-friendly interface to interact with the Passenger-reborn API. It offers a responsive design, real-time updates, and a seamless user experience for managing passenger-related operations.

## Features

- Modern React-based UI with TypeScript
- Responsive design for desktop and mobile devices
- Real-time data synchronization with the Passenger-reborn API
- Secure HTTPS communication

## Getting Started

### Prerequisites

- Node.js (for development)
- Docker and Docker Compose (for deployment)

### Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/passenger-web.git
   cd passenger-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

This will create optimized files in the `dist` directory.

## Deployment

The project includes Docker configuration for easy deployment.

### Simple Deployment

```bash
docker-compose up -d
```

This will build the application and serve it on port 13542 via HTTP.

## SSL Configuration

The project supports two types of SSL certificates:

### 1. Self-signed Certificate (Development)

If no `DOMAIN_NAME` is specified, a self-signed certificate will be automatically generated. This is suitable for development environments only.

```bash
docker-compose up -d
```

### 2. Let's Encrypt SSL Certificate (Production)

For production environments, you can use a Let's Encrypt SSL certificate with a real domain name:

1. Create a `docker-compose.yml` file from the `docker-compose.example.yml` file and add the following values:
   ```yaml
   environment:
     - DOMAIN_NAME=your-actual-domain.com  # Replace with your actual domain
     - EMAIL=your-email@example.com        # For Let's Encrypt notifications
   ```

2. Ensure your domain DNS settings are properly configured to point to your server.

3. Open the required ports (80 and 443):
   ```yaml
   ports:
     - "80:80"
     - "443:443"
   ```

4. Start the service:
   ```bash
   docker-compose up -d
   ```

The Let's Encrypt certificate will be automatically acquired and renewed every 90 days.

**Note:** For Let's Encrypt to work:
- You need a real domain name
- Your DNS settings must be correctly configured
- Ports 80 and 443 must be accessible from the outside

## Project Structure

```
passenger-web/
├── src/               # Source code
├── public/            # Static files
├── Dockerfile         # Docker configuration
├── nginx.conf         # Nginx configuration
├── entrypoint.sh      # Docker entrypoint script
└── docker-compose.yml # Docker Compose configuration
```

## Environment Variables

- `VITE_API_URL`: URL for the Passenger-reborn API
- `DOMAIN_NAME`: Domain name for SSL certificate (optional)
- `EMAIL`: Email for Let's Encrypt notifications (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
