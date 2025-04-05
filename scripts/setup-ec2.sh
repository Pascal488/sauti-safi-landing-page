#!/bin/bash
# Script to set up an EC2 instance for hosting VoithAI landing page with Strapi CMS

# Update system packages
sudo apt update
sudo apt upgrade -y

# Install Node.js (for Strapi)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx and PM2
sudo apt install -y nginx
sudo npm install -g pm2

# Configure firewall (if using UFW)
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
sudo ufw allow 'OpenSSH'
sudo ufw --force enable

# Create web directories with proper permissions
sudo mkdir -p /var/www/html
sudo mkdir -p /var/www/strapi
sudo chown -R $USER:$USER /var/www
sudo chmod -R 755 /var/www

# Configure Nginx for frontend
cat > nginx-frontend.conf << EOF
server {
    listen 80;
    listen [::]:80;
    server_name _;  # Replace with your domain if available

    root /var/www/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
    
    # Proxy requests to /api to Strapi
    location /api/ {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Server \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Host \$http_host;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
    
    # Proxy Strapi admin
    location /admin/ {
        proxy_pass http://localhost:1337/admin/;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Server \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Host \$http_host;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
    
    # Proxy requests to Strapi uploads
    location /uploads/ {
        proxy_pass http://localhost:1337/uploads/;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Server \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Host \$http_host;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}
EOF

sudo mv nginx-frontend.conf /etc/nginx/sites-available/voithai
sudo ln -s /etc/nginx/sites-available/voithai /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Remove default site

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Setup PM2 for Strapi
cat > /var/www/strapi/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: "strapi",
    cwd: "/var/www/strapi",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production",
    }
  }]
}
EOF

# Setup PM2 to start on system reboot
pm2 startup systemd -u $USER --hp $HOME

echo "EC2 setup completed successfully!"
echo "Remember to:"
echo "1. Deploy your frontend to /var/www/html"
echo "2. Deploy Strapi to /var/www/strapi"
echo "3. Setup Strapi environment variables"
echo "4. Start Strapi with: cd /var/www/strapi && pm2 start ecosystem.config.js"