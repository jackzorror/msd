package com.morningstardance.app.msdstudentfee;

import java.util.Date;

public class MSDStudentFeeSummaryDto {

	private int id;
	private boolean isPaid;
	private boolean isWaiver;
	private boolean isActive;
	private String feeObjectName;
	private String feeName;
	private Date payTime;
	private float cost;
	private String feeNote;
	private String payType;
	private double fee;
	private double paidFee;
	
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
	public Date getPayTime() {
		return payTime;
	}
	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
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
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
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
}
