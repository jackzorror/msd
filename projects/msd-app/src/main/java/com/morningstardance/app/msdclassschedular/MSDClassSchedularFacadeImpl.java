package com.morningstardance.app.msdclassschedular;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassSchedularJPARepository;

@Service("msdClassSchedularFacade")
public class MSDClassSchedularFacadeImpl implements MSDClassSchedularFacade {
	
	@Resource
	private MSDClassSchedularJPARepository msdClassSchedularJPARepository;
	
	@Resource
	private MSDClassSchedularAssembler msdClassSchedularAssembler;

	@Override
	public List<MSDClassSchedularDto> getClassSchedularByClassId(Long msdclassid) {
		List<MSDClassSchedular> css = msdClassSchedularJPARepository.findByMsdClassId(msdclassid.intValue());
		List<MSDClassSchedularDto>  dtos = msdClassSchedularAssembler.createDtoFromEntity(css);
		return dtos;
	}

}
