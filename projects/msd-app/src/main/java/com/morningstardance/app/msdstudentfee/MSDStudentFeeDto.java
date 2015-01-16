package com.morningstardance.app.msdstudentfee;

import java.util.Date;

public class MSDStudentFeeDto {

	private int id;
	private boolean isActive;
	private boolean isPaid;
	private boolean isWaiver;
	private int msdStudentFeeObjectId;
	private String msdStudentFeeObjectName;
	private String payNote;
	private Date payTime;
	private String payType;
	private int msdStudentId;
	private String feeNote;
	private double fee;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
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
	public int getMsdStudentFeeObjectId() {
		return msdStudentFeeObjectId;
	}
	public void setMsdStudentFeeObjectId(int msdStudentFeeObjectId) {
		this.msdStudentFeeObjectId = msdStudentFeeObjectId;
	}
	public String getMsdStudentFeeObjectName() {
		return msdStudentFeeObjectName;
	}
	public void setMsdStudentFeeObjectName(String msdStudentFeeObjectName) {
		this.msdStudentFeeObjectName = msdStudentFeeObjectName;
	}
	public String getPayNote() {
		return payNote;
	}
	public void setPayNote(String payNote) {
		this.payNote = payNote;
	}
	public Date getPayTime() {
		return payTime;
	}
	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public int getMsdStudentId() {
		return msdStudentId;
	}
	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
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
	
}
