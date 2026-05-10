#!/bin/bash

# Setup colors
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Setting up Chat Microservices Ecosystem...${NC}"

# Create .env files from examples if they don't exist
services=("auth-service" "message-service" "api-gateway")

for service in "${services[@]}"; do
  if [ ! -f "$service/.env" ]; then
    echo "Creating .env for $service..."
    cp "$service/.env.example" "$service/.env"
  fi
done

echo -e "${GREEN}Installing root dependencies...${NC}"
npm install

echo -e "${GREEN}Installing service dependencies...${NC}"
npm run install:all

echo -e "${GREEN}Setup complete! Run 'npm run dev' to start.${NC}"
