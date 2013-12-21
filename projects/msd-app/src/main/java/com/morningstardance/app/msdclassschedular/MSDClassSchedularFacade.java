package com.morningstardance.app.msdclassschedular;

import java.util.List;

public interface MSDClassSchedularFacade {

	List<MSDClassSchedularDto> getClassSchedularByClassId(Long msdclassid);

}
