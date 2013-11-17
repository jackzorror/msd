package com.morningstardance.app.msdstudent;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudent;

@Service("msdStudentAssembler")
public class MSDStudentAssemblerImpl implements MSDStudentAssembler {

	@Override
	public List<MSDStudentDto> createDtoFromEntity(List<MSDStudent> msdStudents) {
		List<MSDStudentDto> dtos = new ArrayList<MSDStudentDto>();
		for (MSDStudent student : msdStudents) {
			dtos.add(this.createDtoFromEntity(student));
		}
		return dtos;
	}

	@Override
	public MSDStudentDto createDtoFromEntity(MSDStudent msdStudent) {
		if (null == msdStudent) 
			return null;
		MSDStudentDto dto = new MSDStudentDto();
		dto.setId(msdStudent.getId().intValue());
		dto.setName(msdStudent.getFirstName() + " " + msdStudent.getLastName());
		return dto;
	}

}
