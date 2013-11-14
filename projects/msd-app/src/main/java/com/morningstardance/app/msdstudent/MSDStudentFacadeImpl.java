package com.morningstardance.app.msdstudent;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinDto;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MsdStudentCheckin;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;
import com.morningstardance.domain.msdstudentcheckin.MSDStudentCheckinRepository;

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
}
