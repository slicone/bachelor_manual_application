#!/bin/bash
echo "Starting Express.js backend..."
cd ./Backend
npm run dev & 
BACKEND_PID=$!

echo "Starting Vue.js frontend..."
cd ../Interactive-Map
npm run dev &
FRONTEND_PID=$!

echo $FRONTEND_PID

trap "echo 'Stopping apps...'; kill $BACKEND_PID; kill -TERM -- -$FRONTEND_PID; exit 0" SIGINT SIGTERM

wait
