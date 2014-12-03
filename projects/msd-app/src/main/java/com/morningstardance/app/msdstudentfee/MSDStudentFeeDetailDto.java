package com.morningstardance.app.msdstudentfee;

public class MSDStudentFeeDetailDto extends MSDStudentFeeSummaryDto {

	private String payNote;
	private String payType;
	private String feeNote;

	public String getPayNote() {
		return payNote;
	}

	public void setPayNote(String payNote) {
		this.payNote = payNote;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getFeeNote() {
		return feeNote;
	}

	public void setFeeNote(String feeNote) {
		this.feeNote = feeNote;
	}

}
