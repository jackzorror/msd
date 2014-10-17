package com.morningstardance.app.msdstudentcheckin;

import java.util.Date;

public class MSDStudentCheckinReportDto {

	private int id;
	private int studentId;
	private int classId;
	private String className;
	private Date checkInTime;
	private boolean isRegisterClass;
	private boolean isMakeup;
	private boolean isFiveHoursMoreStduent;
	private boolean isOther;
	private String note;
	
	public MSDStudentCheckinReportDto() {
		
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStudentId() {
		return studentId;
	}
	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}
	public int getClassId() {
		return classId;
	}
	public void setClassId(int classId) {
		this.classId = classId;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public Date getCheckInTime() {
		return checkInTime;
	}
	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}
	public boolean isRegisterClass() {
		return isRegisterClass;
	}
	public void setRegisterClass(boolean isRegisterClass) {
		this.isRegisterClass = isRegisterClass;
	}
	public boolean isMakeup() {
		return isMakeup;
	}
	public void setMakeup(boolean isMakeup) {
		this.isMakeup = isMakeup;
	}
	public boolean isFiveHoursMoreStduent() {
		return isFiveHoursMoreStduent;
	}
	public void setFiveHoursMoreStduent(boolean isFiveHoursMoreStduent) {
		this.isFiveHoursMoreStduent = isFiveHoursMoreStduent;
	}

	public boolean isOther() {
		return isOther;
	}

	public void setOther(boolean isOther) {
		this.isOther = isOther;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	
}
