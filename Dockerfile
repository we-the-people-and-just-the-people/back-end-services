FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy node_modules and dist
COPY node_modules ./node_modules
COPY dist ./dist

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]