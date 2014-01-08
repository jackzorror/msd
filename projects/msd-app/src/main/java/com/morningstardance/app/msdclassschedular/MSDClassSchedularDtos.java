package com.morningstardance.app.msdclassschedular;

import java.util.List;

public class MSDClassSchedularDtos {

	private int id;
	private List<String> weekdays;
	private String startTime;
	private String endTime;
	private int msdClassId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<String> getWeekdays() {
		return weekdays;
	}
	public void setWeekdays(List<String> weekdays) {
		this.weekdays = weekdays;
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
	public int getMsdClassId() {
		return msdClassId;
	}
	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}
	
}
