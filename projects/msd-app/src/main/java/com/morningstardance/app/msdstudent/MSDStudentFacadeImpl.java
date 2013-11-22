package com.morningstardance.app.msdstudent;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdclass.MSDClassAssembler;
import com.morningstardance.app.msdclass.MSDClassDto;
import com.morningstardance.domain.entity.MSDClass;
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
	
	@Resource(name="msdClassAssembler")
	MSDClassAssembler msdClassAssembler;
	
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
	public MSDStudentDetailDto getStudentDetailDtoByName(String firstname, String lastname) {
		MSDStudent s = msdStudentRepository.getByLastNameFirstName(lastname, firstname);
		return msdStudentAssembler.createDetailDtoFromEntity(s);
	}

	@Override
	public List<MSDClassDto> getAllStudentRegisterClassByStudentId(Long msdstudentid) {
		List<MSDClass> s = msdClassRepository.getAllStudentRegisterClassByStudentId(msdstudentid);
		return msdClassAssembler.createDtoFromEntity(s);
	}

	@Override
	public MSDStudentDetailDto getStudentDetailDtoById(Long msdstudentid) {
		MSDStudent msdStudent = msdStudentRepository.findById(msdstudentid);
		return msdStudentAssembler.createDetailDtoFromEntity(msdStudent);
	}

	@Override
	public MSDStudentDetailDto updateStudentinformation(MSDStudentDetailDto studentDetailDto) {
		if (studentDetailDto.getId() == 0) {
			return null;
		}
		
		MSDStudent student = msdStudentAssembler.createEntityFromDetailDto(studentDetailDto);
		msdStudentRepository.save(student);
		return msdStudentAssembler.createDetailDtoFromEntity(student);
	}
}
