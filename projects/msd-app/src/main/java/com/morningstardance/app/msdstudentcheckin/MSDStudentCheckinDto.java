package com.morningstardance.app.msdstudentcheckin;

import java.util.Date;

import com.morningstardance.domain.entity.MsdStudentCheckin;

public class MSDStudentCheckinDto {
	
	private int id;
	private int studentId;
	private int classId;
	private Date checkInTime;
	private boolean isCheckedIn;
	private boolean inClass;
	private boolean isMakeup;
	private boolean isOther;
	private boolean isFiveHoursMore;
	private String otherCheckinReason;
	private String name;

	public MSDStudentCheckinDto() {
	}
	
	public MSDStudentCheckinDto(MsdStudentCheckin entity) {
		this.id = entity.getId().intValue();
		this.classId = entity.getMsdClassId();
		this.studentId = entity.getMsdStudentId();
		this.checkInTime = entity.getCheckinTime();
		this.isCheckedIn = false;
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

	public boolean isCheckedIn() {
		return isCheckedIn;
	}

	public void setCheckedIn(boolean isCheckedIn) {
		this.isCheckedIn = isCheckedIn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isInClass() {
		return inClass;
	}

	public void setInClass(boolean inClass) {
		this.inClass = inClass;
	}

	public boolean isIsMakeup() {
		return isMakeup;
	}

	public void setIsMakeup(boolean isMakeup) {
		this.isMakeup = isMakeup;
	}

	public boolean isIsOther() {
		return isOther;
	}

	public void setIsOther(boolean isOther) {
		this.isOther = isOther;
	}

	public boolean isIsFiveHoursMore() {
		return isFiveHoursMore;
	}

	public void setIsFiveHoursMore(boolean isFiveHoursMore) {
		this.isFiveHoursMore = isFiveHoursMore;
	}

	public String getOtherCheckinReason() {
		return otherCheckinReason;
	}

	public void setOtherCheckinReason(String otherCheckinReason) {
		this.otherCheckinReason = otherCheckinReason;
	}
}
