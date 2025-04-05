#!/bin/bash
# Initialize Strapi from scratch using the quickstart approach
# This script should be run after the setup-strapi.js script has created the directory structure

# Create fresh strapi directory if you want to start over
if [ "$1" == "--fresh" ]; then
  echo "Creating fresh Strapi installation (removing existing one if it exists)..."
  rm -rf strapi
  mkdir -p strapi
fi

# Change to the project root directory
cd "$(dirname "$0")/.."

# Ensure the strapi directory exists
if [ ! -d "strapi" ]; then
  mkdir -p strapi
fi

# Navigate to the strapi directory and initialize Strapi with quickstart
cd strapi

# Use npx to run the Strapi CLI to create a new app in the current directory
echo "Creating new Strapi application with quickstart..."
npx create-strapi-app@latest . --quickstart --no-run --legacy-peer-deps

# Create a setup info file
echo "# Strapi Setup Information

This Strapi instance was created on $(date)

## Access Information
Admin URL: http://localhost:1337/admin

## Remember to:
1. Create an admin user on first run
2. Set up the necessary content types
3. Configure permissions for the API
" > SETUP-INFO.md

echo "Strapi initialization complete!"
echo "To start Strapi, run: npm run dev"
echo "Or to start only Strapi: cd strapi && npm run develop"