package com.morningstardance.app.msdcompetition;

public class MSDCompetitionSummaryDto {
	private int id;
	private String name;
	private String competitiondate;
	private boolean isactive;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCompetitiondate() {
		return competitiondate;
	}
	public void setCompetitiondate(String competitiondate) {
		this.competitiondate = competitiondate;
	}
	public boolean isIsactive() {
		return isactive;
	}
	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}

}
