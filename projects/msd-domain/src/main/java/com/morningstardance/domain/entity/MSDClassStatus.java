package com.morningstardance.domain.entity;

public enum MSDClassStatus {
	INACTIVE("INACTIVE"),
	ACTIVE("ACTIVE"),
	EXPIRED("EXPIRED");
	
	private MSDClassStatus(final String text) {
		this.text = text;
	}
	
	private final String text;

	public String toString() {
		return text;
	}
}
