#!/usr/bin/env node

/*
This script creates a standalone Strapi instance outside of the main project,
making it easier to avoid dependency conflicts.
*/

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const tempDir = path.join(os.tmpdir(), 'voithai-strapi-temp');

console.log('Setting up a standalone Strapi instance for VoithAI...');

// Create a temporary directory for Strapi
if (fs.existsSync(tempDir)) {
  console.log('Removing existing temporary Strapi directory...');
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log('Creating temporary directory...');
fs.mkdirSync(tempDir, { recursive: true });

try {
  // Navigate to temp directory and create Strapi
  console.log('Creating Strapi application (this may take several minutes)...');
  console.log(`Working directory: ${tempDir}`);
  
  execSync('npx create-strapi-app@latest . --quickstart --no-run', {
    cwd: tempDir,
    stdio: 'inherit'
  });
  
  // Copy the whole strapi directory to the project
  const strapiDir = path.join(rootDir, 'strapi');
  
  if (fs.existsSync(strapiDir)) {
    console.log('Removing existing Strapi directory...');
    fs.rmSync(strapiDir, { recursive: true, force: true });
  }
  
  console.log('Copying Strapi to project directory...');
  
  // Create the target directory
  fs.mkdirSync(strapiDir, { recursive: true });
  
  // Function to copy directory recursively
  const copyDir = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  
  // Copy files
  copyDir(tempDir, strapiDir);
  
  console.log('\n✅ Strapi successfully created and copied to the project!');
  console.log('\nCleanup: Removing temporary directory...');
  fs.rmSync(tempDir, { recursive: true, force: true });
  
  console.log('\n---------------------------------------------');
  console.log('🚀 Strapi setup complete!');
  console.log('\nNext steps:');
  console.log('1. Start the development environment:');
  console.log('   npm run dev');
  console.log('2. Access Strapi admin at: http://localhost:1337/admin');
  console.log('3. Follow the setup steps in strapi/README.md');
  console.log('---------------------------------------------');
  
} catch (error) {
  console.error('\n⚠️ Error creating Strapi application:');
  console.error(error.message);
  console.error('\nPlease try the manual setup method described in the README.md');
  
  // Clean up temp directory
  console.log('Cleaning up temporary directory...');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  
  process.exit(1);
}