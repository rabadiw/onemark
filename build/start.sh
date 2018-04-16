#!bin/bash
# start Onemark w/server only if it is not running
if [ $(ps -ef | grep -v grep | grep Onemark | wc -l) -le 0 ]; then
    MacOS/Onemark --start=api
fi
echo "Onemark w/server started"