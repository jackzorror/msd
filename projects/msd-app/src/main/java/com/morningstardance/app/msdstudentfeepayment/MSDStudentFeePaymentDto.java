package com.morningstardance.app.msdstudentfeepayment;

import java.util.Date;

public class MSDStudentFeePaymentDto {

	private int id;
	private int msdStudentFeeId;
	private String payNote;
	private Date payTime;
	private String payType;
	private float payFee;
	private float fee;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMsdStudentFeeId() {
		return msdStudentFeeId;
	}
	public void setMsdStudentFeeId(int msdStudentFeeId) {
		this.msdStudentFeeId = msdStudentFeeId;
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
	public float getPayFee() {
		return payFee;
	}
	public void setPayFee(float payFee) {
		this.payFee = payFee;
	}
	public float getFee() {
		return fee;
	}
	public void setFee(float fee) {
		this.fee = fee;
	}
}
