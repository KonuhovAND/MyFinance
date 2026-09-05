#!/bin/bash
#!/usr/bin/env bash

cleanup() {
  echo
  echo "Stopping servers..."

  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null

  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null

  echo "Saving changes..."
  git add ~/django_react_spendings/db.sqlite3

  if ! git diff --cached --quiet; then
    git commit -m "update in db.sqlite3"
    git push
  else
    echo "No changes to commit."
  fi

  exit 130
}

trap cleanup SIGINT SIGTERM

uv run manage.py runserver &
BACKEND_PID=$!

cd frontend
npm start &
FRONTEND_PID=$!

wait
