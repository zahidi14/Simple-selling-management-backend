# Use official Node.js image as a base
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 3000 (or whatever port your app uses)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]