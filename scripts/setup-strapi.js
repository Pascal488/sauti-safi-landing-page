#!/usr/bin/env node

/*
This script sets up a Strapi project for VoithAI landing page.
It creates a basic structure for Strapi in the 'strapi' directory
and provides instructions on how to continue the setup.
*/

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const strapiDir = path.join(rootDir, 'strapi');

console.log('Setting up Strapi for VoithAI...');

// Create Strapi directory if it doesn't exist
if (!fs.existsSync(strapiDir)) {
  console.log('Creating Strapi directory...');
  fs.mkdirSync(strapiDir, { recursive: true });
}

// Write a basic package.json for Strapi if it doesn't exist
const packageJsonPath = path.join(strapiDir, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log('Creating initial package.json for Strapi...');
  const packageJson = {
    name: "voithai-strapi",
    private: true,
    version: "0.1.0",
    description: "VoithAI Strapi CMS",
    scripts: {
      develop: "strapi develop",
      start: "strapi start",
      build: "strapi build",
      strapi: "strapi"
    },
    dependencies: {
      "@strapi/strapi": "^4.21.2",
      "@strapi/plugin-i18n": "^4.21.2",
      "@strapi/plugin-users-permissions": "^4.21.2",
      "better-sqlite3": "^9.4.3"
    },
    strapi: {
      uuid: "be23f59d-2e1f-4bc0-bad2-e8be4b8d0f93"
    },
    engines: {
      node: ">=18.0.0 <=20.x.x",
      npm: ">=6.0.0"
    }
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Create a sample .env file for Strapi
const strapiEnvPath = path.join(strapiDir, '.env');
if (!fs.existsSync(strapiEnvPath)) {
  console.log('Creating .env file for Strapi...');
  const strapiEnvContent = `HOST=0.0.0.0
PORT=1337
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModifiedtokenSalt
ADMIN_JWT_SECRET=toBeModifiedAdminJwtSecret
JWT_SECRET=toBeModifiedJwtSecret
TRANSFER_TOKEN_SALT=toBeModifiedTransferTokenSalt
`;

  fs.writeFileSync(strapiEnvPath, strapiEnvContent);
}

// Create directory structure for Strapi
const dirsToCreate = [
  'src/api',
  'src/components',
  'src/extensions',
  'config',
  'public/uploads',
  'data'
];

dirsToCreate.forEach(dir => {
  const fullPath = path.join(strapiDir, dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Create a README with manual setup instructions
const strapiReadmePath = path.join(strapiDir, 'README.md');
const strapiReadmeContent = `# VoithAI Strapi Backend

This is the Strapi CMS backend for the VoithAI landing page.

## Setup Instructions

After installing dependencies with \`npm install\`, start the Strapi server with \`npm run develop\`.

Then you'll need to:

1. Create an admin user when prompted in the browser
2. Create the following content types:

   a. **Hero (Single Type)**:
   - Go to Content-Type Builder → Create new single type
   - Name it "Hero"
   - Add fields:
     - title (Text)
     - subtitle (Text)
     - buttonText (Text)
     - mainImage (Media)

   b. **Features (Collection Type)**:
   - Go to Content-Type Builder → Create new collection type
   - Name it "Feature"
   - Add fields:
     - title (Text)
     - description (Rich Text or Text)
     - icon (Media)
     - bgColor (Text) - for CSS color code

   c. **Benefits (Collection Type)**:
   - Name it "Benefit"
   - Add fields:
     - title (Text)
     - description (Rich Text or Text)
     - icon (Media)

   d. **Timeline Items (Collection Type)**:
   - Name it "Timeline Item"
   - Add fields:
     - number (Text)
     - title (Text)
     - description (Rich Text or Text)

3. Configure Permissions:
   - Go to Settings → Roles → Public
   - Enable "find" and "findOne" permissions for all content types
   - Save changes

4. Create an API token:
   - Go to Settings → API Tokens → Create new API token
   - Name: "VoithAI Landing Page" 
   - Type: Read-only
   - Copy the generated token and add it to the frontend .env file
`;

fs.writeFileSync(strapiReadmePath, strapiReadmeContent);

// Try to install Strapi dependencies
try {
  console.log('\nInstalling Strapi dependencies...');
  console.log('This may take a while, please be patient...');
  
  // First install @strapi/strapi locally in the strapi directory
  execSync('npm install @strapi/strapi', {
    cwd: strapiDir,
    stdio: 'inherit'
  });
  
  // Then install all other dependencies
  execSync('npm install', {
    cwd: strapiDir,
    stdio: 'inherit'
  });
  
  // Create basic Strapi config files
  const configFiles = {
    'server.js': `module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS')
  },
});`,
    'admin.js': `module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});`,
    'database.js': `module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  },
});`
  };
  
  // Create config directory if it doesn't exist
  const configDir = path.join(strapiDir, 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Write config files
  Object.entries(configFiles).forEach(([fileName, content]) => {
    fs.writeFileSync(path.join(configDir, fileName), content);
  });
  
  // Install Strapi CLI locally to ensure it's accessible via npm scripts
  execSync('npm install @strapi/cli', {
    cwd: strapiDir,
    stdio: 'inherit'
  });
  
  console.log('\n✅ Strapi dependencies and configurations installed successfully!');
} catch (error) {
  console.error('\n⚠️ Failed to install Strapi dependencies.');
  console.error('Please run "cd strapi && npm install @strapi/strapi && npm install" manually.');
  console.error('Error details:', error.message);
}

console.log('\n---------------------------------------------');
console.log('🚀 Strapi setup complete!');
console.log('\nNext steps:');
console.log('1. Make sure Strapi dependencies are installed:');
console.log('   cd strapi && npm install');
console.log('2. Start the development environment:');
console.log('   npm run dev');
console.log('3. Access Strapi admin at: http://localhost:1337/admin');
console.log('4. Follow the setup steps in strapi/README.md');
console.log('---------------------------------------------');