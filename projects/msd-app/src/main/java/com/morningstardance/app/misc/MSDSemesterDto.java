package com.morningstardance.app.misc;

import java.util.Date;

public class MSDSemesterDto {

	private int id;
	private String name;
	protected Date startDate;
	
	public MSDSemesterDto(int id, String name, Date startDate) {
		this.id = id;
		this.name = name;
		this.startDate = startDate;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
}
