package com.morningstardance.app.msdclass;

import java.util.Date;

public class MSDClassDto {
	protected int id;
	protected String name;
	protected String location;
	protected Date classStartTime;
	protected Date classEndTime;
	protected String classStatus;
	protected String nonClassDates;
	protected boolean isactive;
	
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Date getClassStartTime() {
		return classStartTime;
	}
	public void setClassStartTime(Date classStartTime) {
		this.classStartTime = classStartTime;
	}
	public Date getClassEndTime() {
		return classEndTime;
	}
	public void setClassEndTime(Date classEndTime) {
		this.classEndTime = classEndTime;
	}
	public String getClassStatus() {
		return classStatus;
	}
	public void setClassStatus(String classStatus) {
		this.classStatus = classStatus;
	}
	public String getNonClassDates() {
		return nonClassDates;
	}
	public void setNonClassDates(String nonClassDates) {
		this.nonClassDates = nonClassDates;
	}
	public boolean isIsactive() {
		return isactive;
	}
	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}
}
