#!/bin/sh
# Copyright (c) Wael Rabadi. All rights reserved.
# See LICENSE for details.

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ "$(uname -s)" = "Darwin" ]; then
  if [ "$(whoami)" = "root" ]; then
    TARGET_DIR="/Library/Google/Chrome/NativeMessagingHosts"
  else
    TARGET_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  fi
else
  if [ "$(whoami)" = "root" ]; then
    TARGET_DIR="/etc/opt/chrome/native-messaging-hosts"
  else
    TARGET_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"
  fi
fi

HOST_NAME=com.waelrabadi.onemark

# Create directory to store native messaging host.
mkdir -p "$TARGET_DIR"

# Copy native messaging host manifest.
cp "$DIR/$HOST_NAME.json" "$TARGET_DIR"

# Update host path in the manifest.
HOST_PATH=nmh/onemark_darwin
FULL_HOST_PATH="$DIR/$HOST_PATH"
ESCAPED_HOST_PATH=${FULL_HOST_PATH////\\/}
sed -i -e "s/HOST_PATH/$ESCAPED_HOST_PATH/" "$TARGET_DIR/$HOST_NAME.json"

# Set permissions for the manifest so that all users can read it.
chmod o+r "$TARGET_DIR/$HOST_NAME.json"

# Update .env file
sed -i -e "s/ONEMARK_SETUP=1/ONEMARK_SETUP=0/" "$DIR/Resources/app.asar.unpacked/.env"

echo "Native messaging host $HOST_NAME has been installed."

cp "$DIR/com.waelrabadi.onemark.plist" ~/Library/LaunchAgents/com.waelrabadi.onemark.plist
launchctl load -w ~/Library/LaunchAgents/com.waelrabadi.onemark.plist
