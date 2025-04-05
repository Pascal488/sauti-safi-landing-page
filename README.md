# VoithAI Landing Page

A React + TypeScript + Vite project for VoithAI landing page, with Strapi CMS integration.

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/voithai-landing-page.git
   cd voithai-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   cp .env.example .env
   ```

4. Setting up Strapi (two options):

   **Option A: Quick Setup** (recommended for first-time users)
   ```bash
   npm run init:strapi
   ```
   This will use Strapi's quickstart to set up a fully functional Strapi instance.

   **Option B: Manual Setup**
   If you prefer more control or the quick setup doesn't work:
   ```bash
   npm run setup:strapi
   cd strapi && npm install
   ```

   **Troubleshooting Strapi:**
   If you encounter dependency conflicts or other Strapi setup issues:
   ```bash
   # Method 1: Create Strapi in a separate directory
   mkdir -p strapi-standalone && cd strapi-standalone
   npx create-strapi-app@latest . --quickstart
   # After setup, copy the strapi folder to your project

   # Method 2: Use legacy dependencies flag
   npm run init:strapi:fresh
   cd strapi && npm install --legacy-peer-deps

   # Method 3: Install Strapi CLI globally (might need sudo)
   npm install -g @strapi/strapi
   cd strapi && npx strapi develop
   ```

5. Run the application:

   **Frontend only** (without Strapi):
   ```bash
   npm run dev:frontend
   ```
   
   **Complete stack** (frontend + Strapi):
   ```bash
   npm run dev
   ```

   The services will be available at:
   - Frontend: http://localhost:5173 (or another port if 5173 is busy)
   - Strapi Admin: http://localhost:1337/admin
   
   When accessing Strapi for the first time, you'll need to create an admin user.

## Strapi CMS Setup

The first time you run Strapi, you'll need to:

1. Create an admin user when prompted in the browser at http://localhost:1337/admin

2. Create Content Types in Strapi:

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
   - Enable "find" and "findOne" permissions for all content types you created
   - Save changes

4. Create an API token:
   - Go to Settings → API Tokens → Create new API token
   - Name: "VoithAI Landing Page" 
   - Type: Read-only
   - Copy the generated token

5. Update your frontend .env file:
   ```
   VITE_STRAPI_API_URL=http://localhost:1337/api
   VITE_STRAPI_API_TOKEN=your_strapi_api_token_here
   VITE_STRAPI_MEDIA_URL=http://localhost:1337
   ```

6. Add Content:
   - Go to Content Manager
   - Add entries for each content type
   - Add media files through the Media Library
   - Publish all content

## Available Scripts

- `npm run dev` - Start both frontend and Strapi in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:strapi` - Start only Strapi
- `npm run build` - Build both frontend and Strapi for production
- `npm run setup:strapi` - Initial setup for Strapi
- `npm run start` - Run both frontend and Strapi in production mode

## Deployment to EC2

This project uses GitHub Actions to deploy both the React frontend and Strapi backend to EC2. Follow these step-by-step instructions to set up the deployment pipeline.

### Additional Secrets for Strapi

In addition to the EC2 deployment secrets, you'll need to add the following Strapi-specific secrets to your GitHub repository:

1. `STRAPI_APP_KEYS`: A comma-separated list of random keys (e.g., `key1,key2,key3,key4`)
2. `STRAPI_API_TOKEN_SALT`: A random string for API token salt
3. `STRAPI_ADMIN_JWT_SECRET`: A random string for admin JWT 
4. `STRAPI_JWT_SECRET`: A random string for JWT

You can generate these random strings using a tool like:
```bash
openssl rand -base64 32
```

### 1. Launch an EC2 Instance

1. Sign in to AWS Management Console
2. Navigate to EC2 service
3. Click "Launch Instance"
4. Choose an Amazon Machine Image (AMI) - Ubuntu Server 22.04 LTS recommended
5. Select an instance type (t2.micro is eligible for free tier)
6. Configure security groups:
   - Allow SSH (port 22) from your IP
   - Allow HTTP (port 80) from anywhere
   - Allow HTTPS (port 443) from anywhere
7. Create and download a new key pair
8. Launch the instance and wait for it to initialize

### 2. Set Up the EC2 Instance

Connect to your instance via SSH:
```bash
ssh -i path/to/your-key.pem ubuntu@your-ec2-public-ip
```

Install required software:
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

Configure Nginx for React SPA:
```bash
sudo nano /etc/nginx/sites-available/voithai

# Paste this configuration
server {
    listen 80;
    listen [::]:80;
    server_name _;  # Replace with your domain if available

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the configuration:
```bash
sudo ln -s /etc/nginx/sites-available/voithai /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

Prepare deployment directory:
```bash
sudo mkdir -p /var/www/html
sudo chown -R ubuntu:ubuntu /var/www/html  # Use your username instead of ubuntu if different
sudo chmod -R 755 /var/www/html
```

### 3. Set Up GitHub Actions Secrets

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:

   a. `SSH_PRIVATE_KEY`: The content of your EC2 key pair file
      - Run `cat path/to/your-key.pem` and copy the entire output
      
   b. `KNOWN_HOSTS`: Get this by running locally:
      ```bash
      ssh-keyscan -H your-ec2-public-ip
      ```
      
   c. `SSH_USER`: The username for your EC2 instance (typically `ubuntu` for Ubuntu AMIs)
   
   d. `EC2_HOST`: Your EC2 instance public IP address

### 4. Trigger the Deployment

The GitHub Actions workflow will automatically deploy when you push to the main branch.

To manually trigger a deployment:
1. Go to your repository on GitHub
2. Click on "Actions"
3. Select the "Deploy to EC2" workflow
4. Click "Run workflow"

### 5. Verify Deployment

Once the GitHub Actions workflow completes successfully, visit your EC2 instance's public IP in a browser to see the deployed application.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
