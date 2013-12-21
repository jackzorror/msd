package com.morningstardance.app.msdclass;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassSchedularJPARepository;

@Service("msdClassFacade")
public class MSDClassFacadeImpl implements MSDClassFacade {
	
	@Resource(name="msdClassRepository")
	protected MSDClassRepository msdClassRepository;
	
	@Resource(name="msdClassAssembler")
	protected MSDClassAssembler msdClassAssembler;
	
    @Resource
    private MSDClassJPARepository msdClassJPARepository;
    
    @Resource
    private MSDClassSchedularJPARepository msdClassSchedularJPARepository;


    @Transactional(readOnly = true)
	@Override
	public MSDClassSummaryDto getMSDClassById(Long msdclassId) {
		MSDClass msdclass = msdClassJPARepository.findOne(msdclassId);
		List<MSDClassSchedular> msdclassschedulars = (List<MSDClassSchedular>) msdClassSchedularJPARepository.findByMsdClassId(msdclassId.intValue());
		return msdClassAssembler.createSummaryDtoFromEntity(msdclass, msdclassschedulars);
	}

    @Transactional(readOnly = true)
	@Override
	public List<MSDClassSummaryDto> getAllMSDClass() {
		List<MSDClass> msdclasses = msdClassJPARepository.findAll();
		List<MSDClassSummaryDto> dtos = new ArrayList<MSDClassSummaryDto>();
		for (MSDClass msdc : msdclasses) {
			List<MSDClassSchedular> msdclassschedulars = (List<MSDClassSchedular>) msdClassSchedularJPARepository.findByMsdClassId(msdc.getId().intValue());
			dtos.add(msdClassAssembler.createSummaryDtoFromEntity(msdc, msdclassschedulars));
		}
		return dtos;
	}
	
    @Transactional(readOnly = true)
    @Override
    public List<MSDClass> findAll() {
        return msdClassJPARepository.findAll();
    }

	@Override
	public MSDClassDto addClass(MSDClassDto msdclassdto) {
		MSDClass centity = msdClassAssembler.createEntityFromDto(msdclassdto);
		msdClassJPARepository.save(centity);
		MSDClassDto dto = msdClassAssembler.createDtoFromEntity(centity);
		return dto;
	}

	@Override
	public List<String> getClassUniqueName() {
		return msdClassJPARepository.findUniqueNames();
	}

	@Override
	public MSDClassDto getClassByClassName(String cname) {
		MSDClass msdc =  msdClassJPARepository.findByName(cname);
		MSDClassDto dto = msdClassAssembler.createDtoFromEntity(msdc);
		return dto;
	}
}
