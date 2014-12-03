package com.morningstardance.app.msdstudentcredit;

public class MSDStudentCreditSummaryDto {

	private int id;
	private int msdStudentId;
	private boolean isConsumed;
	private boolean isActive;
	private float credit;
	private String creditNote;
	
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
	public boolean getIsConsumed() {
		return isConsumed;
	}
	public void setIsConsumed(boolean isConsumed) {
		this.isConsumed = isConsumed;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
	public float getCredit() {
		return credit;
	}
	public void setCredit(float credit) {
		this.credit = credit;
	}
	
	public String getCreditNote() {
		return creditNote;
	}
	public void setCreditNote(String creditNote) {
		this.creditNote = creditNote;
	}
}
