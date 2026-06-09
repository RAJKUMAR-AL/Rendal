# Deployment Guide

## Step 1: Fix MongoDB Atlas Network Access

1. Go to https://cloud.mongodb.com
2. Login → Select your Cluster0
3. Left sidebar → "Network Access"
4. Click "Add IP Address"
5. Click "Allow Access from Anywhere" → 0.0.0.0/0
6. Click "Confirm"

## Step 2: Render Backend Env Variables

```
MONGODB_URI = mongodb+srv://alrajkumar:mongo2414@cluster0.sabhiwu.mongodb.net/rental-rooms?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET  = rental-room-secret-key-2024-change-in-production
NODE_ENV    = production
```

## Step 3: Deploy on Render
- Click "Deploy Web Service"
- Wait 3-5 mins
- Visit: https://rendal.onrender.com → should show { "message": "RoomRental API is running ✅" }

## Step 4: Seed Database
- Visit once: https://rendal.onrender.com/api/seed

## Step 5: Deploy Frontend on Vercel
- Root Directory: frontend
- Env Variable: VITE_API_URL = https://rendal.onrender.com
- Deploy
