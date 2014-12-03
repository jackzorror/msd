package com.morningstardance.app.msdstudentfee;

import java.util.List;

import com.morningstardance.domain.entity.MSDStudentFee;

public interface MSDStudentFeeAssembler {

	MSDStudentFeeDto createDtoFromEntity(MSDStudentFee sfee);

	List<MSDStudentFeeDto> createDtoFromEntity(List<MSDStudentFee> sfees);

	MSDStudentFeeSummaryDto createSummaryDtoFromEntity(MSDStudentFee sfee);

	List<MSDStudentFeeSummaryDto> createSummaryDtoFromEntity(List<MSDStudentFee> sfees);

	MSDStudentFeeDetailDto createDetailDtoFromEntity(MSDStudentFee sfee);

}
