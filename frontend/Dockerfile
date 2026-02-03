# =========================
# 1. Build Frontend
# =========================
FROM node:18-alpine AS frontend-builder

# Set working directory for frontend
WORKDIR /app/frontend

# Install frontend dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build


# =========================
# 2. Build Backend (Production)
# =========================
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json* ./backend/

# Install backend dependencies (production only)
RUN cd backend && npm install --omit=dev

# Copy backend source code
COPY backend ./backend

# Copy built frontend into backend public folder
COPY --from=frontend-builder /app/frontend/dist ./backend/public

# Cloud Run / Production port
ENV PORT=8080
EXPOSE 8080

# Start backend server
CMD ["node", "backend/server.js"]