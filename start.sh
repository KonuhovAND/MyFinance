#!/bin/bash
cleanup() {
  echo
  echo "Ctrl+C pressed. Saving changes..."
  cd ./../
  git add db.sqlite3

  # Commit only if there are staged changes
  if ! git diff --cached --quiet; then
    git commit -m "update in db.sqlite3"
    git push
  else
    echo "No changes to commit."
  fi

  echo "Exiting..."
  exit 130
}

trap cleanup SIGINT

echo "Script is running. Press Ctrl+C to stop it."

# Your long-running command
uv run manage.py runserver &
cd frontend && npm start
