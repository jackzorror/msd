#!/bin/sh

export JAVA_HOME=$(/usr/libexec/java_home)
echo JAVA_HOME="$JAVA_HOME"

export PROJECT_ROOT="/Users/junzuo/Workspace/morningstardance"
echo PROJECT_ROOT= "$PROJECT_ROOT"

export APP_HOME="$PROJECT_ROOT/app_home"
echo APP_HOME="$APP_HOME"

export ANT_HOME="$PROJECT_ROOT/apache-ant-1.9.0"
echo ANT_HOME="$ANT_HOME"

export CATALINA_HOME="$PROJECT_ROOT/apache-tomcat-7.0.40"
echo CATALINA_HOME=$CATALINA_HOME

export TOMCAT_HOME=$PROJECT_ROOT/apache-tomcat-7.0.40
echo TOMCAT_HOME="$TOMCAT_HOME"

SERVER_START_CMD="./start-tomcat.sh"
export SERVER_START_CMD
echo SERVER_START_CMD="$SERVER_START_CMD"
