package com.morningstardance.app.msdclassfee;

import java.util.List;

import com.morningstardance.domain.entity.MSDClassFee;

public interface MSDClassFeeAssembler {

	MSDClassFeeDto createDtoFromEntity(MSDClassFee entity);

	List<MSDClassFeeDto> createDtoFromEntity(List<MSDClassFee> msdclassfees);

}
