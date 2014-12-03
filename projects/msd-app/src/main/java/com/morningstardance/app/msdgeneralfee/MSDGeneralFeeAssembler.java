package com.morningstardance.app.msdgeneralfee;

import java.util.List;

import com.morningstardance.domain.entity.MSDGeneralFee;

public interface MSDGeneralFeeAssembler {

	List<MSDGeneralFeeDto> createDtoFromEntity(List<MSDGeneralFee> entities);

	MSDGeneralFeeDto createDtoFromEntity(MSDGeneralFee entity);

}
