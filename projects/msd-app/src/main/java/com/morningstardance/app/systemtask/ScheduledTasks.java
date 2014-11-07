package com.morningstardance.app.systemtask;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
public class ScheduledTasks {

    private static final SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
    private static final SimpleDateFormat dateFormat2 = new SimpleDateFormat("YYYYmmdd_HHmmss");
    /*
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        //System.out.println("The time is now " + dateFormat.format(new Date()));
    }
	*/
    @Scheduled(cron="0 0 * * * *")
    public void runCurrentTime() {
        System.out.println("The time is now " + dateFormat1.format(new Date()));
        System.out.println("The time is now " + dateFormat2.format(new Date()));
    }
    /*
    @Scheduled(cron="")
    public void backupDatabase() {
        String path = "~/test/msd_backup_" + new SimpleDateFormat("YYYYmmdd_HHmmss").format(new Date()) + ".sql";
        String username = "root";
        //String password = "";
        String dbname = "msd";
        String executeCmd = "/usr/local/mysql/bin/mysqldump --opt -u" + username + "  " + dbname + " > " + path;
        Process runtimeProcess;
        try {
            runtimeProcess = Runtime.getRuntime().exec(new String[] { "cmd.exe", "/c", executeCmd });
            int processComplete = runtimeProcess.waitFor();

            if (processComplete == 0) {
                System.out.println("Backup created successfully");

            } else {
                System.out.println("Could not create the backup");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    */
}