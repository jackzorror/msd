package com.morningstardance.app.msdclass;

import java.util.Date;

public class MSDAddClassDto {

	protected int id;
	protected String name;
	protected Date classStartTime;
	protected Date classEndTime;
	protected boolean isActive;
	protected int semesterId;
	protected int classTypeId;
	
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
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
	public int getSemesterId() {
		return semesterId;
	}
	public void setSemesterId(int semesterId) {
		this.semesterId = semesterId;
	}
	public int getClassTypeId() {
		return classTypeId;
	}
	public void setClassTypeId(int classTypeId) {
		this.classTypeId = classTypeId;
	}
	
}
