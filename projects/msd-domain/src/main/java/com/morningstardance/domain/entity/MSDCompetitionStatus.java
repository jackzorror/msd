package com.morningstardance.domain.entity;

public enum MSDCompetitionStatus {
	PASSEDREGISTERDEADLINE("PASSEDREGISTERDEADLINE"),
	ACCEPTREGISTER("ACCEPTREGISTER"),
	COMPETITION("COMPETITION"),
	PASSED("PASSED");
	
	private MSDCompetitionStatus(final String text) {
		this.text = text;
	}
	
	private final String text;

	public String toString() {
		return text;
	}
}
