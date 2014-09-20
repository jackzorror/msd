#!/bin/sh

dirhome=$(pwd)

. /Users/junzuo/Workspace/msd/msdenv.sh
. /Users/junzuo/Workspace/msd/envset.sh

./scripts/stop
returncode=$?
if [ $returncode != 0 ]; then
    exit 1
fi

rm -rf app_home/deploy/msd-web*
returncode=$?
if [ $returncode != 0 ]; then
    exit 1
fi
 
mvn clean
returncode=$?
if [ $returncode != 0 ]; then
    exit 1
fi

mvn
returncode=$?
if [ $returncode != 0 ]; then
    exit 1
fi

cp projects/msd-web/target/msd-web.war app_home/deploy/.
returncode=$?
if [ $returncode != 0 ]; then
    exit 1
fi

./scripts/start
returncode=$?
if [ $returncode != 0 ]; then
    exit 1
fi

cd $dirhome
