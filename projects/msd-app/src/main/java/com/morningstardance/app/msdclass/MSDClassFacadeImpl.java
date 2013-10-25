package com.morningstardance.app.msdclass;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.msdclass.MSDClassRepository;

@Service("msdClassFacade")
public class MSDClassFacadeImpl implements MSDClassFacade {
	
	@Resource(name="msdClassRepository")
	protected MSDClassRepository msdClassRepository;
	
	@Resource(name="msdClassAssembler")
	protected MSDClassAssembler msdClassAssembler;

	@Override
	public MSDClassDto getMSDClassById(Long msdclassId) {
		MSDClass msdclass = msdClassRepository.findById(msdclassId);
		return msdClassAssembler.createDtoFromEntity(msdclass);
	}

	@Override
	public List<MSDClassDto> getAllMSDClass() {
		List<MSDClass> msdclasses = msdClassRepository.getAll();
		return msdClassAssembler.createDtoFromEntity(msdclasses);
	}

}
