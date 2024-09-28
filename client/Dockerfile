# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN yarn install

# Step 5: Copy the entire app to the container
COPY . .

# Step 6: Start the React app in development mode
CMD ["yarn", "start"]

# Expose port 3000
EXPOSE 3000
