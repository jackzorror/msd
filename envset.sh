
export JAVA_HOME=$(/usr/libexec/java_home)

export PROJECT_ROOT="/Users/junzuo/Workspace/morningstardance"

export M2_HOME="$PROJECT_ROOT/apache-maven-3.0.5"

export MAVEN_OPTS="-Xmx1024m -Dmaven.repo.local=$PROJECT_ROOT/projects/repository"

export ANT_HOME="$PROJECT_ROOT/apache-ant-1.9.0"

export PATH="$JAVA_HOME/bin:$M2_HOME/bin:$ANT_HOME/bin:$PATH"

export CATALINA_HOME="$PROJECT_ROOT/apache-tomcat-7.0.40"
