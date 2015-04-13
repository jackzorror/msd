package com.morningstardance.app.msdstudentfee;

import java.util.List;

import com.morningstardance.app.msdstudentfeepayment.MSDStudentFeePaymentDto;

public class MSDStudentFeeDetailDto extends MSDStudentFeeSummaryDto {

	private int feeObjectId;
	private float feeCost;
	private float oneTimeFee;
	private float monthlyFee;
	private float weeklyFee;
	private float dailyFee;
	private float timesFee;
	
	private List<MSDStudentFeePaymentDto> msdStudentFeePaymentList;

	public List<MSDStudentFeePaymentDto> getMsdStudentFeePaymentList() {
		return msdStudentFeePaymentList;
	}

	public void setMsdStudentFeePaymentList(
			List<MSDStudentFeePaymentDto> msdStudentFeePaymentList) {
		this.msdStudentFeePaymentList = msdStudentFeePaymentList;
	}

	public int getFeeObjectId() {
		return feeObjectId;
	}

	public void setFeeObjectId(int feeObjectId) {
		this.feeObjectId = feeObjectId;
	}

	public float getFeeCost() {
		return feeCost;
	}

	public void setFeeCost(float feeCost) {
		this.feeCost = feeCost;
	}

	public float getOneTimeFee() {
		return oneTimeFee;
	}

	public void setOneTimeFee(float oneTimeFee) {
		this.oneTimeFee = oneTimeFee;
	}

	public float getMonthlyFee() {
		return monthlyFee;
	}

	public void setMonthlyFee(float monthlyFee) {
		this.monthlyFee = monthlyFee;
	}

	public float getWeeklyFee() {
		return weeklyFee;
	}

	public void setWeeklyFee(float weeklyFee) {
		this.weeklyFee = weeklyFee;
	}

	public float getDailyFee() {
		return dailyFee;
	}

	public void setDailyFee(float dailyFee) {
		this.dailyFee = dailyFee;
	}

	public float getTimesFee() {
		return timesFee;
	}

	public void setTimesFee(float timesFee) {
		this.timesFee = timesFee;
	}
}
