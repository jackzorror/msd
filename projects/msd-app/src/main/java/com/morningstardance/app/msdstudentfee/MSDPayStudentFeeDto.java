package com.morningstardance.app.msdstudentfee;

import java.util.Date;

public class MSDPayStudentFeeDto {

	private Long msdStudentId;
	private Long studentFeeId;
	private double fee;
	private double paidFee;
	private String payType;
	private Date payTime;
	private String payNote;
	
	public Long getMsdStudentId() {
		return msdStudentId;
	}
	public void setMsdStudentId(Long msdStudentId) {
		this.msdStudentId = msdStudentId;
	}
	public Long getStudentFeeId() {
		return studentFeeId;
	}
	public void setStudentFeeId(Long studentFeeId) {
		this.studentFeeId = studentFeeId;
	}
	public double getFee() {
		return fee;
	}
	public void setFee(double fee) {
		this.fee = fee;
	}
	public double getPaidFee() {
		return paidFee;
	}
	public void setPaidFee(double paidFee) {
		this.paidFee = paidFee;
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
