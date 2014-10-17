package com.morningstardance.app.msdclassfee;


public class MSDClassFeeDto {

	private int id;
	private int msdClassId;
	private String feeName;
	private String feeTypeName;
	private float cost;
	private int msdCostTypeId;
	
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
}
