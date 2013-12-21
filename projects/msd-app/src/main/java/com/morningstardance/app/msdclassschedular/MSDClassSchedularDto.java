package com.morningstardance.app.msdclassschedular;

import com.morningstardance.app.util.WeekdayEnum;

public class MSDClassSchedularDto {

	private int id;
	private int weekday;
	private String WeekdayStr;
	private String startTime;
	private String endTime;
	private int mscClassId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getWeekday() {
		return weekday;
	}
	public void setWeekday(int weekday) {
		this.weekday = weekday;
		this.WeekdayStr = WeekdayEnum.getWeekdayString(weekday);
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getWeekdayStr() {
		return WeekdayStr;
	}
	public int getMscClassId() {
		return mscClassId;
	}
	public void setMscClassId(int mscClassId) {
		this.mscClassId = mscClassId;
	}
	
}
