#!/bin/sh

dirhome=$(pwd)

. /Users/junzuo/Workspace/msd/msdenv.sh
. /Users/junzuo/Workspace/msd/envset.sh

cp -r projects/msd-web/src/main/webapp/msd-ui app_home/deploy/msd-web/.

cd $dirhome
