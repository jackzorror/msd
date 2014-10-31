package com.morningstardance.app.msdcompetitionfee;

public class MSDCompetitionFeeDto {

	private int id;
	private int msdCompetitionId;
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
	public int getMsdCompetitionId() {
		return msdCompetitionId;
	}
	public void setMsdCompetitionId(int msdCompetitionId) {
		this.msdCompetitionId = msdCompetitionId;
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
