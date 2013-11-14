package com.morningstardance.app.msdstudentcheckin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MsdStudentCheckin;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;
import com.morningstardance.domain.msdstudentcheckin.MSDStudentCheckinRepository;

@Service("msdStudentCheckinFacade")
public class MSDStudentCheckinFacadeImpl implements MSDStudentCheckinFacade {

	@Resource(name="msdStudentRepository")
	MSDStudentRepository msdStudentRepository;
	
	@Resource(name="msdClassRepository")
	MSDClassRepository msdClassRepository;
	
	@Resource(name="msdStudentCheckinRepository")
	MSDStudentCheckinRepository msdStudentCheckinRepository;
	

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
	public List<MSDStudentCheckinDto> getAllStudentCheckinDtoForCheckInByClassId(
			Long msdClassId) {
		List<MSDStudent> msdstudents = msdStudentRepository.getAllByClassId(msdClassId);
		List<MSDStudentCheckinDto> dtos = new ArrayList<MSDStudentCheckinDto>();
		for (MSDStudent s : msdstudents) {
			MSDStudentCheckinDto dto = null;
			MsdStudentCheckin checkin = msdStudentCheckinRepository.findForCheckInByStudentIdAndClassId(msdClassId, s.getId());
			if (null == checkin) {
				dto = new MSDStudentCheckinDto();
				dto.setId(0);
				dto.setClassId(msdClassId.intValue());
				dto.setStudentId(s.getId().intValue());
				dto.setCheckedIn(false);
				dto.setName(s.getFirstName() + " " + s.getLastName());
			} else {
				dto = new MSDStudentCheckinDto(checkin);
				dto.setCheckedIn(true);
				dto.setName(s.getFirstName() + " " + s.getLastName());
			}
			dtos.add(dto);
		}
		return dtos;
	}

}
