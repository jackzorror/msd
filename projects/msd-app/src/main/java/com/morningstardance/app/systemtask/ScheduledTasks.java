package com.morningstardance.app.systemtask;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
public class ScheduledTasks {

//    private static final SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
    private static final SimpleDateFormat dateFormat2 = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
    /*
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        //System.out.println("The time is now " + dateFormat.format(new Date()));
    }
	*/
    @Scheduled(cron="0 * * * * *")
    public void runCurrentTimeOne() {
        System.out.println("The time One is: " + dateFormat2.format(new Date()));
    }
    
    @Scheduled(cron="0 */5 * * * *")
    public void runCurrentTimeTwo() {
        System.out.println("The time Two is: " + dateFormat2.format(new Date()));
    }
    
    @Scheduled(cron="0 */30 * * * *")
    public void runCurrentTimeThree() {
        System.out.println("The time Three is: " + dateFormat2.format(new Date()));
    }
    
    @Scheduled(cron="0 0 * * * *")
    public void runCurrentTimeFour() {
        System.out.println("The time Four is: " + dateFormat2.format(new Date()));
    }
    
    @Scheduled(cron="0 0 1 * * ?")
    public void backupDatabase() {
        String path = "~/test/msd_backup_" + new SimpleDateFormat("YYYYMMdd_HHmmss").format(new Date()) + ".sql";
        System.out.println(" Backup database to " + path);
        String username = "root";
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
}