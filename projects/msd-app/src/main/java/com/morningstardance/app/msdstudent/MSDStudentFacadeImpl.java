package com.morningstardance.app.msdstudent;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;

@Service("msdStudentFacade")
public class MSDStudentFacadeImpl implements MSDStudentFacade {
	
	@Resource(name="msdStudentRepository")
	MSDStudentRepository msdStudentRepository;
	
	@Resource(name="msdStudentAssembler")
	MSDStudentAssembler msdStudentAssembler;
	
	@Resource(name="msdClassRepository")
	MSDClassRepository msdClassRepository;
	
	@Override
	public List<MSDStudentDto> getAllStudents() {
		List<MSDStudent> msdStudents = msdStudentRepository.getAll();
		return msdStudentAssembler.createDtoFromEntity(msdStudents);
	}

	@Override
	public List<MSDStudentDto> getAllStudentsByClassId(Long msdClassId) {
		List<MSDStudent> msdStudents = msdStudentRepository.getAllByClassId(msdClassId);
		return msdStudentAssembler.createDtoFromEntity(msdStudents);
	}

	@Override
	public List<MSDStudentDto> getAllStudentsByClassIdForCheckin(Long msdClassId) {
		List<MSDStudent> msdStudents = msdStudentRepository.getAllByClassIdForCheckin(msdClassId);
		return msdStudentAssembler.createDtoFromEntity(msdStudents);
	}

	@Override
	public MSDStudentDto getStudentByName(String firstname, String lastname) {
		MSDStudent s = msdStudentRepository.getByLastNameFirstName(lastname, firstname);
		return msdStudentAssembler.createDtoFromEntity(s);
	}
}
