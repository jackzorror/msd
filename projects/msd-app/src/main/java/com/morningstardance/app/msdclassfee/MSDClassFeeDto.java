package com.morningstardance.app.msdclassfee;


public class MSDClassFeeDto {

	private int id;
	private int msdClassId;
	private String feeName;
	private String feeTypeName;
	private float cost;
	private int msdCostTypeId;
	private float oneTimePay;
	private float monthlyPay;
	private float weeklyPay;
	private float dailyPay;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMsdClassId() {
		return msdClassId;
	}
	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}
	public String getFeeName() {
		return feeName;
	}
	public void setFeeName(String feeName) {
		this.feeName = feeName;
	}
	public String getFeeTypeName() {
		return feeTypeName;
	}
	public void setFeeTypeName(String feeTypeName) {
		this.feeTypeName = feeTypeName;
	}
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public int getMsdCostTypeId() {
		return msdCostTypeId;
	}
	public void setMsdCostTypeId(int msdCostTypeId) {
		this.msdCostTypeId = msdCostTypeId;
	}
	public float getOneTimePay() {
		return oneTimePay;
	}
	public void setOneTimePay(float oneTimePay) {
		this.oneTimePay = oneTimePay;
	}
	public float getMonthlyPay() {
		return monthlyPay;
	}
	public void setMonthlyPay(float monthlyPay) {
		this.monthlyPay = monthlyPay;
	}
	public float getWeeklyPay() {
		return weeklyPay;
	}
	public void setWeeklyPay(float weeklyPay) {
		this.weeklyPay = weeklyPay;
	}
	public float getDailyPay() {
		return dailyPay;
	}
	public void setDailyPay(float dailyPay) {
		this.dailyPay = dailyPay;
	}
}
