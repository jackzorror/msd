package com.morningstardance.app.msdstudentfee;

import java.util.Date;

public class MSDStudentFeePayDto {

	private int msdStudentId;
	private String feeIdList;
	private double totalFee;
	private String payType;
	private Date payTime;
	private String payNote;
	
	public int getMsdStudentId() {
		return msdStudentId;
	}
	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}
	public String getFeeIdList() {
		return feeIdList;
	}
	public void setFeeIdList(String feeIdList) {
		this.feeIdList = feeIdList;
	}
	public double getTotalFee() {
		return totalFee;
	}
	public void setTotalFee(double totalFee) {
		this.totalFee = totalFee;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public Date getPayTime() {
		return payTime;
	}
	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}
	public String getPayNote() {
		return payNote;
	}
	public void setPayNote(String payNote) {
		this.payNote = payNote;
	}
	
	
}
