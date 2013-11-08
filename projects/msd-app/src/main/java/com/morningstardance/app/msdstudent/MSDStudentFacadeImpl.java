package com.morningstardance.app.msdstudent;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MsdStudentCheckin;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentCheckinRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;

@Service("msdStudentFacade")
public class MSDStudentFacadeImpl implements MSDStudentFacade {
	
	@Resource(name="msdStudentRepository")
	MSDStudentRepository msdStudentRepository;
	
	@Resource(name="msdStudentAssembler")
	MSDStudentAssembler msdStudentAssembler;
	
	@Resource(name="msdClassRepository")
	MSDClassRepository msdClassRepository;
	
	@Resource(name="msdStudentCheckinRepository")
	MSDStudentCheckinRepository msdStudentCheckinRepository;
	
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
	public MSDStudentCheckinDto studentClassCheckin(Long msdStudentId,
			Long msdClassId) {
		if (null == msdStudentId || null == msdClassId) {
			return null;
		}
		
		MSDStudent msdStudent = msdStudentRepository.findById(msdStudentId);
		if (null == msdStudent) {
			return null;
		}
		
		MSDClass msdClass = msdClassRepository.findById(msdClassId);
		if (null == msdClass) {
			return null;
		}
		
		MsdStudentCheckin checkin = new MsdStudentCheckin();
		checkin.setMsdClassId(msdClassId.intValue());
		checkin.setMsdStudentId(msdStudentId.intValue());
		checkin.setCheckinTime(new Date());
		
		checkin = msdStudentCheckinRepository.save(checkin);
		
		MSDStudentCheckinDto dto = new MSDStudentCheckinDto(checkin);

		return dto;
	}

	@Override
	public List<MSDStudentDto> getAllStudentsByClassIdForCheckin(Long msdClassId) {
		List<MSDStudent> msdStudents = msdStudentRepository.getAllByClassIdForCheckin(msdClassId);
		return msdStudentAssembler.createDtoFromEntity(msdStudents);
	}

}
