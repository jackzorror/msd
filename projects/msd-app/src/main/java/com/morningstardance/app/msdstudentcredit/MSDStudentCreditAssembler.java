package com.morningstardance.app.msdstudentcredit;

import java.util.List;

import com.morningstardance.domain.entity.MSDStudentCredit;

public interface MSDStudentCreditAssembler {

	MSDStudentCreditSummaryDto createSummaryDtoFromEntity(MSDStudentCredit sfee);

	List<MSDStudentCreditSummaryDto> createSummaryDtoFromEntity(List<MSDStudentCredit> sfees);

	MSDStudentCredit createEntityFromDto(MSDStudentCreditDto dto);

	MSDStudentCreditDto createDtoFromEntity(MSDStudentCredit entity);

}
