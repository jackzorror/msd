package com.morningstardance.app.msdclass;

import java.util.List;

public interface MSDClassFacade {

	MSDClassDto getMSDClassById(Long msdclassId);

	List<MSDClassDto> getAllMSDClass();

}
