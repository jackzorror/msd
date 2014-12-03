package com.morningstardance.app.msdgeneralfee;

public class MSDGeneralFeeDto {

	private int id;
	private float cost;
	private int costTypeId;
	private boolean isActive;
	private String feeName;
	private String feeTypeName;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public int getCostTypeId() {
		return costTypeId;
	}
	public void setCostTypeId(int costTypeId) {
		this.costTypeId = costTypeId;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
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

}
