package com.morningstardance.app.msdstudentcredit;

import java.util.Date;
import java.util.List;

public interface MSDStudentCreditFacade {

	List<MSDStudentCreditSummaryDto> getStudentCreditSummarysByStudentId(Long id);

	MSDStudentCreditDto createStudentCredit(MSDStudentCreditDto dto);

	MSDStudentCreditDto addStudentCredit(Long msdstudentid, String creditnote,
			Double credit);

	MSDStudentCreditDto getStudentCreditDtoById(Long msdstudentcreditid);

	String consumeStudentCredits(Long msdStudentId, String creditIdList,
			Date consumeTime, String consumeNote);

	String addStudentCreditToStudents(String msdstudentidlist,
			String creditnote, Double double1);

}
