#!/bin/sh
# Copyright (c) Wael Rabadi. All rights reserved.
# See LICENSE for details.

set -e

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
rm "$TARGET_DIR/$HOST_NAME.json"

echo "Native messaging host $HOST_NAME has been uninstalled."

launchctl unload -w ~/Library/LaunchAgents/com.waelrabadi.onemark.plist
rm ~/Library/LaunchAgents/com.waelrabadi.onemark.plist
