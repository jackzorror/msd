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

	@Override
	public MSDStudentDetailDto createDetailDtoFromEntity(MSDStudent msdStudent) {
		if (null == msdStudent)
			return null;
		
		MSDStudentDetailDto dto = new MSDStudentDetailDto();
		dto.setId(msdStudent.getId().intValue());
		dto.setLastName(msdStudent.getLastName());
		dto.setFirstName(msdStudent.getFirstName());
		
		return dto;
	}

	@Override
	public List<MSDStudentDetailDto> createDetailDtoFromEntity(
			List<MSDStudent> msdStudents) {
		List<MSDStudentDetailDto> dtos = new ArrayList<MSDStudentDetailDto>();
		for (MSDStudent student : msdStudents) {
			dtos.add(this.createDetailDtoFromEntity(student));
		}
		return dtos;
	}

	@Override
	public MSDStudent createEntityFromDetailDto(
			MSDStudentDetailDto msdStudentDetailDto) {
		MSDStudent student = new MSDStudent();
		student.setId(new Long(msdStudentDetailDto.getId()));
		student.setFirstName(msdStudentDetailDto.getFirstName());
		student.setLastName(msdStudentDetailDto.getLastName());
		
		return student;
	}

}
