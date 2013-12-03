package com.morningstardance.app.msdclass;

import java.util.List;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassFacade {

	MSDClassDto getMSDClassById(Long msdclassId);

	List<MSDClassDto> getAllMSDClass();

	List<MSDClass> findAll();

}
