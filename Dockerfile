# Use official Node.js 20 image as a base
FROM node:20

# Set working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the app will run on (adjust if different)
EXPOSE 3000

# Start the application using the compiled JavaScript file
CMD ["npm", "run", "start"]