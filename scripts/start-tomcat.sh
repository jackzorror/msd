#!/bin/sh
### $Id: start-tomcat.sh 1566 2012-02-22 14:18:39Z eumcl05 $ ###

# backup current log dir and create a new one 
tstamp=`date '+%Y-%m-%d-%H-%M-%S'`
if [ -d "$APP_HOME/log" ]; then
  mv $APP_HOME/log "$APP_HOME/log-$tstamp"
fi
mkdir -p $APP_HOME/log
exec &> $APP_HOME/log/console.log

echo USER=$USER

DIRNAME=$(pwd)

# CATALINA_OPTS
CATALINA_OPTS="-server -Xms256m -Xmx1500m -XX:MaxPermSize=256m -Dsun.rmi.dgc.server.gcInterval=600000 -Dsun.rmi.dgc.client.gcInterval=600000 -Xloggc:$APP_HOME/log/gc.log -Dapp.home=$APP_HOME -Djava.awt.headless=true -Dcoldfusion.disablejsafe=true -Dorg.apache.cxf.Logger=org.apache.cxf.common.logging.Log4jLogger -Djava.protocol.handler.pkgs=com.sun.net.ssl.internal.www.protocol $CATALINA_OPTS" 
#if [ "$1" = "debug" ]; then
  CATALINA_OPTS="-verbose:gc -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n $CATALINA_OPTS"
#fi

if [ "x$TOMCAT_HOME" = "x" ]; then
  export TOMCAT_HOME=$DIRNAME/../apache-tomcat-7.0.23
fi

# create heap dump on out of memory
CATALINA_OPTS="$CATALINA_OPTS -XX:+HeapDumpOnOutOfMemoryError"

# add an unused define to help Xenoss monitor our application
CATALINA_OPTS="-Dapp-server $CATALINA_OPTS"

CATALINA_HOME=$TOMCAT_HOME
export CATALINA_HOME
echo CATALINA_HOME=$CATALINA_HOME

# we use jboss bind address in some config files, so we need to define it here, for now.
CATALINA_OPTS="$CATALINA_OPTS -Dlog4j.configuration=log4j.xml"

export CATALINA_OPTS
echo CATALINA_OPTS=$CATALINA_OPTS

COMMAND="$CATALINA_HOME/bin/catalina.sh run $*"
echo COMMAND=$COMMAND
exec $COMMAND
