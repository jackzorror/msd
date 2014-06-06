package com.morningstardance.app.msdstudentclass;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;

@Service("msdStudentClassFacade")
public class MSDStudentClassFacadeImpl implements MSDStudentClassFacade {

	@Resource
	private MSDStudentClassJPARepository msdStudentClassJPARepository;
	
	@Override
	public MSDStudentClassDto registerStudentToClass(MSDStudentClassDto studentClassDto) {
		MSDStudentClass studentClass = new MSDStudentClass();
		studentClass.setMsdClassId(studentClassDto.getMsdClassId());
		studentClass.setMsdStudentId(studentClassDto.getMsdStudentId());
		MSDStudentClass entity = null;
		entity = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(studentClassDto.getMsdClassId(),	studentClassDto.getMsdStudentId());
		if (null == entity) {
			entity = msdStudentClassJPARepository.save(studentClass);
		}
		MSDStudentClassDto dto = new MSDStudentClassDto();
		dto.setId(entity.getId().intValue());
		dto.setMsdClassId(entity.getMsdClassId());
		dto.setMsdStudentId(entity.getMsdStudentId());
		return dto;
	}

	@Override
	public void deleteRegisteredStudentClass(Long id) {
		msdStudentClassJPARepository.delete(id);
	}
}
