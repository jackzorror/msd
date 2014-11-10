package com.morningstardance.app.msdstudentcompetition;

public class MSDStudentCompetitionDto {

	private int id;
	private int msdStudentId;
	private int msdCompetitionId;
	private boolean isActive;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMsdStudentId() {
		return msdStudentId;
	}
	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}
	public int getMsdCompetitionId() {
		return msdCompetitionId;
	}
	public void setMsdCompetitionId(int msdCompetitionId) {
		this.msdCompetitionId = msdCompetitionId;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}
