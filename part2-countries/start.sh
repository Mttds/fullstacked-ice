#!/usr/bin/env bash
export VITE_OPENWEATHER_API_KEY=$(grep OPENWEATHER_API_KEY .env | cut -d"=" -f2 ) && npm run dev
