#!bin/bash
# start Onemark w/server only if it is not running
if [ $(ps -ef | grep -v grep | grep "Onemark --start=api" | wc -l) -le 0 ]; then
    open -a /Applications/Onemark.app --args --start=api
fi
echo "Onemark w/server started"