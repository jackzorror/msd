package com.morningstardance.app.msdstudentcredit;

import java.util.Date;

public class MSDStudentCreditDto extends MSDStudentCreditSummaryDto {

	private String consumeNote;
	private Date consumedDate;
	private Date creditDate;
		
	public String getConsumeNote() {
		return consumeNote;
	}
	public void setConsumeNote(String consumeNote) {
		this.consumeNote = consumeNote;
	}
	public Date getConsumedDate() {
		return consumedDate;
	}
	public void setConsumedDate(Date consumedDate) {
		this.consumedDate = consumedDate;
	}
	public Date getCreditDate() {
		return creditDate;
	}
	public void setCreditDate(Date creditDate) {
		this.creditDate = creditDate;
	}
}
