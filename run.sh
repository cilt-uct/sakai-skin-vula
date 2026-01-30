#!/bin/bash
# File: run-npm.sh
# Usage: ./run-npm.sh <script-name> [additional npm args]
# Auto-completion included

set -e

ROOT_DIR="$(dirname "$0")/skin/skins/default"

# Switch to Skin folder
cd "$ROOT_DIR"

if [ ! -f "package.json" ]; then
    echo "Error: package.json not found"
    exit 1
fi

# Function to list all npm scripts
list_scripts() {
    jq -r '.scripts | keys[]' "package.json" | sort
}

# Bash completion function
_run_npm_completion() {
    local cur scripts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"

    if [ -f "package.json" ]; then
        scripts=$(jq -r '.scripts | keys[]' "package.json")
        COMPREPLY=( $(compgen -W "$scripts" -- "$cur") )
    fi
    return 0
}

# Register the completion function (only in interactive shells)
if [[ $- == *i* ]]; then
    complete -F _run_npm_completion ./run-npm.sh
fi

# If no argument is provided, list scripts and exit
if [ -z "$1" ]; then
    echo "Available npm scripts:"
    list_scripts
    exit 0
fi

SCRIPT_NAME="$1"
shift # Shift to pass remaining arguments to npm

# Check if the script exists
if ! jq -e ".scripts[\"$SCRIPT_NAME\"]" "package.json" >/dev/null; then
    echo "Error: npm script '$SCRIPT_NAME' not found in package.json"
    echo
    echo "Available scripts:"
    list_scripts
    exit 1
fi

# Run the npm script with any extra arguments
# echo "Running npm script '$SCRIPT_NAME' in $ROOT_DIR"
npm run "$SCRIPT_NAME" "$@"
