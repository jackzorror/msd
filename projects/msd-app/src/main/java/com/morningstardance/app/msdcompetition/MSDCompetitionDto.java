package com.morningstardance.app.msdcompetition;

import java.util.Date;

public class MSDCompetitionDto {

	private int id;
	private String description;
	private Date endDate;
	private boolean isActive;
	private String location;
	private String name;
	private Date registerDeadline;
	private Date startDate;
	
	private int competitionTypeId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getRegisterDeadline() {
		return registerDeadline;
	}

	public void setRegisterDeadline(Date registerDeadline) {
		this.registerDeadline = registerDeadline;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getCompetitionTypeId() {
		return competitionTypeId;
	}

	public void setCompetitionTypeId(int competitionTypeId) {
		this.competitionTypeId = competitionTypeId;
	}

}
