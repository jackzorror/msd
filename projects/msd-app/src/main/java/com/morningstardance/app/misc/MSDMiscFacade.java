package com.morningstardance.app.misc;

import java.util.List;

public interface MSDMiscFacade {

	List<MSDTypeDto> getCostType();

	List<MSDTypeDto> getCompetitionType();

	MSDFileNameDto createStudentNameListFile(String string);

}
