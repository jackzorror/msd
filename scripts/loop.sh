#!/bin/sh

if [ "x$SERVER_PID_FILE" = "x" ]; then
    SERVER_PID_FILE=server.pid
fi
if [ "x$TERMINATION_FLAG_FILE" = "x" ]; then
    TERMINATION_FLAG_FILE=loop.termination
fi

rm -f $TERMINATION_FLAG_FILE
LoopCount=0
while true
do
  export LAUNCH_JBOSS_IN_BACKGROUND=true
  echo `date` Starting server ...
  #mkdir -p ../log
  if [ ! -f $SERVER_START_CMD ]; then
      echo Script not found: `pwd`/$SERVER_START_CMD
      break
  fi
  $SERVER_START_CMD $* 2>&1 &
  echo $! > $SERVER_PID_FILE
  wait $!
  if [ -f $TERMINATION_FLAG_FILE ]; then
      rm -f $TERMINATION_FLAG_FILE $SERVER_PID_FILE
      echo `date` Ending server
      break
  fi

  LoopCount=`expr $LoopCount + 1`
  if [ $LoopCount -ge 5 ]
  then
    echo `date` Loop count exceeded, will not restart
    break
  else
    echo `date` Pausing 5 seconds before restart
    sleep 5
  fi
done
