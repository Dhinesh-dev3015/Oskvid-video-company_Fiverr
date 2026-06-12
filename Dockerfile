# Use the latest Node.js LTS version
FROM node:latest

# Install ffmpeg for video compression
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 80
EXPOSE 80

# Set environment to production
ENV NODE_ENV=production

# Start the application on port 80
CMD ["sh", "-c", "npx next start -p 80"]

