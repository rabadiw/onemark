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
if [ -e "$TARGET_DIR/$HOST_NAME.json" ]; then
  rm "$TARGET_DIR/$HOST_NAME.json"
fi
echo "Native messaging host $HOST_NAME has been uninstalled."

launchctl unload -w "$HOME/Library/LaunchAgents/com.waelrabadi.onemark.plist"
if [ -e "$HOME/Library/LaunchAgents/com.waelrabadi.onemark.plist" ]; then
  rm "$HOME/Library/LaunchAgents/com.waelrabadi.onemark.plist"
fi