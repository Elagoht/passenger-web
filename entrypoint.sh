#!/bin/sh

# Check environment variables
if [ -z "$DOMAIN_NAME" ]; then
  echo "DOMAIN_NAME environment variable not set. Using self-signed certificate."

  # Create SSL directory
  mkdir -p /etc/nginx/ssl

  # Generate self-signed certificate if it doesn't exist
  if [ ! -f /etc/nginx/ssl/selfsigned.crt ]; then
    echo "Generating self-signed SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/selfsigned.key \
      -out /etc/nginx/ssl/selfsigned.crt \
      -subj "/C=US/ST=NA/L=NA/O=Local/CN=localhost"
  fi
else
  # Get certificate from Let's Encrypt
  echo "Obtaining Let's Encrypt certificate for: $DOMAIN_NAME"

  # Start Nginx in HTTP mode first - required for Certbot
  nginx

  # Obtain certificate from Let's Encrypt
  certbot --nginx -d $DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL --redirect

  # Stop Nginx, will be restarted by entrypoint
  nginx -s stop
  
  # Add cron job for automatic certificate renewal
  echo "0 12 * * * certbot renew --quiet" >> /etc/crontabs/root
  crond
fi

# Start Nginx
nginx -g 'daemon off;'