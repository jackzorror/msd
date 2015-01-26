package com.morningstardance.app.msdgeneralfee;

import java.util.List;

public interface MSDGeneralFeeFacade {

	List<MSDGeneralFeeDto> getAllGeneralFee();

	MSDGeneralFeeDto createGeneralFee(MSDGeneralFeeDto dto);

	String updateGeneralFeeNameByID(Long generalfeeid, String feename);

}
