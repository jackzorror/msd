package com.morningstardance.app.msdcompetition;

import java.math.BigDecimal;
import java.util.List;

import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeDto;

public class MSDCompetitionDetailDto extends MSDCompetitionDto {

	private int totalStudent;
	private BigDecimal totalFee;
	private String competitionStatus;
	
	private List<MSDCompetitionFeeDto> competitionFeeList;
	
	public int getTotalStudent() {
		return totalStudent;
	}
	public void setTotalStudent(int totalStudent) {
		this.totalStudent = totalStudent;
	}
	public BigDecimal getTotalFee() {
		return totalFee;
	}
	public void setTotalFee(BigDecimal totalFee) {
		this.totalFee = totalFee;
	}
	public String getCompetitionStatus() {
		return competitionStatus;
	}
	public void setCompetitionStatus(String competitionStatus) {
		this.competitionStatus = competitionStatus;
	}
	public List<MSDCompetitionFeeDto> getCompetitionFeeList() {
		return competitionFeeList;
	}
	public void setCompetitionFeeList(List<MSDCompetitionFeeDto> competitionFeeList) {
		this.competitionFeeList = competitionFeeList;
	}
}
