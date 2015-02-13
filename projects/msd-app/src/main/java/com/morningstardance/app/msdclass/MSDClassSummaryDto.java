package com.morningstardance.app.msdclass;

public class MSDClassSummaryDto {
	
	private int id;
	private String name;
	private String schedule;
	private boolean isactive;
	private int semesterid;
	private int typeid;
	private String classTypeName;
	
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
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public boolean getIsactive() {
		return isactive;
	}
	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}
	public int getSemesterid() {
		return semesterid;
	}
	public void setSemesterid(int semesterid) {
		this.semesterid = semesterid;
	}
	public int getTypeid() {
		return typeid;
	}
	public void setTypeid(int typeid) {
		this.typeid = typeid;
	}
	public String getClassTypeName() {
		return classTypeName;
	}
	public void setClassTypeName(String classTypeName) {
		this.classTypeName = classTypeName;
	}

}
