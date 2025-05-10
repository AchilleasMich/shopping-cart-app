#!/bin/bash

echo "Starting shopping cart backend service..."
docker-compose -f docker-compose-dev.yml up -d --build


echo "Starting shopping cart frontend service..."

cd frontend
npm install
npm run dev