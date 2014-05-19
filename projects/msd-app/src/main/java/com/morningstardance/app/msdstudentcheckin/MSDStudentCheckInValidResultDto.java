package com.morningstardance.app.msdstudentcheckin;

public class MSDStudentCheckInValidResultDto {
	private int msdStudentId;
	private int msdClassId;
	private int validationResult;
	
	public MSDStudentCheckInValidResultDto() {
	}
	
	public int getMsdStudentId() {
		return msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

	public int getValidationResult() {
		return validationResult;
	}

	public void setValidationResult(int validationResult) {
		this.validationResult = validationResult;
	}

	public int getMsdClassId() {
		return msdClassId;
	}

	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}
}
