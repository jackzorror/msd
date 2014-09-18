package com.morningstardance.app.msdclass;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudentclass.MSDStudentClassRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassSchedularJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;

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
    
    @Resource
    private MSDStudentClassRepository msdStudentClassRepository;
    
    @Resource
    private MSDStudentClassJPARepository msdStudentClassJPARepository;


    @Transactional(readOnly = true)
	@Override
	public MSDClassDto getMSDClassById(Long msdclassId) {
		MSDClass msdclass = msdClassJPARepository.findOne(msdclassId);
		return msdClassAssembler.createDtoFromEntity(msdclass);
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

	@Override
	public MSDClassSummaryDto getMSDClassSummaryById(Long msdClassId) {
		MSDClass msdclass = msdClassJPARepository.findOne(msdClassId);
		List<MSDClassSchedular> msdclassschedulars = (List<MSDClassSchedular>) msdClassSchedularJPARepository.findByMsdClassId(msdClassId.intValue());
		return msdClassAssembler.createSummaryDtoFromEntity(msdclass, msdclassschedulars);
	}

	@Override
	public MSDClassDetailDto getMSDClassDetailById(Long msdClassId) {
		MSDClass msdclass = msdClassJPARepository.findOne(msdClassId);
		List<MSDClassSchedular> msdclassschedulars = (List<MSDClassSchedular>) msdClassSchedularJPARepository.findByMsdClassId(msdClassId.intValue());
//		int totalStudentCount = msdStudentClassJPARepository.getAllStudentCount(msdClassId.intValue());
//		int totalStudentCount = msdStudentClassRepository.getAllStudentCount(msdClassId);
		int totalStudentCount = msdStudentClassJPARepository.findByMsdClassId(msdClassId.intValue()).size();

		return msdClassAssembler.createClassDetailFromEntity(msdclass, msdclassschedulars, totalStudentCount);
	}

	@Override
	public List<MSDClassSummaryDto> getAllMSDClassByStatus(String classstatus) {
		List<MSDClass> msdclasses = null;
		if (classstatus.equals("ACTIVE")) {
			byte a = 1;
			msdclasses  = msdClassJPARepository.findByIsActive(a);
		}
		return null;
	}
}
