package com.morningstardance.app.msdstudentfee;

public class MSDStudentFeeSummaryDto {

	private int id;
	private boolean isPaid;
	private boolean isWaiver;
	private boolean isActive;
	private String feeObjectName;
	private String feeNote;
	private double fee;
	
	private double totalPaidFee;

	private String feeName;
	private String feeTypeName;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean getIsPaid() {
		return isPaid;
	}
	public void setIsPaid(boolean isPaid) {
		this.isPaid = isPaid;
	}
	public boolean getIsWaiver() {
		return isWaiver;
	}
	public void setIsWaiver(boolean isWaiver) {
		this.isWaiver = isWaiver;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
	public String getFeeObjectName() {
		return feeObjectName;
	}
	public void setFeeObjectName(String feeObjectName) {
		this.feeObjectName = feeObjectName;
	}
	public String getFeeName() {
		return feeName;
	}
	public void setFeeName(String feeName) {
		this.feeName = feeName;
	}
	public String getFeeNote() {
		return feeNote;
	}
	public void setFeeNote(String feeNote) {
		this.feeNote = feeNote;
	}
	public double getFee() {
		return fee;
	}
	public void setFee(double fee) {
		this.fee = fee;
	}
	public double getTotalPaidFee() {
		return totalPaidFee;
	}
	public void setTotalPaidFee(double totalPaidFee) {
		this.totalPaidFee = totalPaidFee;
	}
	public String getFeeTypeName() {
		return feeTypeName;
	}
	public void setFeeTypeName(String feeTypeName) {
		this.feeTypeName = feeTypeName;
	}
}
