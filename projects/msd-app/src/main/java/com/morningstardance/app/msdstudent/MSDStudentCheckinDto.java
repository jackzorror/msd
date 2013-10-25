package com.morningstardance.app.msdstudent;

import java.util.Date;

import com.morningstardance.domain.entity.MsdStudentCheckin;

public class MSDStudentCheckinDto {
	
	private int id;
	private int studentId;
	private int classId;
	private Date checkInTime;

	public MSDStudentCheckinDto() {
	}
	
	public MSDStudentCheckinDto(MsdStudentCheckin entity) {
		this.id = entity.getId().intValue();
		this.classId = entity.getMsdClassId();
		this.studentId = entity.getMsdStudentId();
		this.checkInTime = entity.getCheckinTime();
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
	public Date getCheckInTime() {
		return checkInTime;
	}
	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}

}
