package com.morningstardance.batch;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.morningstardance.batch.student.ImportStudent;

public class App {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		App app = new App();
		app.run();
	}

	public void run() {
		ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
		
		ImportStudent is = (ImportStudent) ctx.getBean("importStudent");
		is.importStudent("/Users/junzuo/Workspace/msd/data/all_list.csv");
	}
}
