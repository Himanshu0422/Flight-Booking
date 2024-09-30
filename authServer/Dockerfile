# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and yarn.lock (if available)
COPY package*.json ./
COPY yarn.lock ./

# Step 4: Install dependencies
RUN yarn install

# Step 5: Copy the entire app to the container
COPY . .

# Step 6: Run build command
RUN yarn install

# Expose the required port
EXPOSE 4002

# Start the application
CMD ["yarn", "start"]
