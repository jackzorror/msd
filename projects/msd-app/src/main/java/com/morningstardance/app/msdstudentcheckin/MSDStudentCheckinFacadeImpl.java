package com.morningstardance.app.msdstudentcheckin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.entity.MsdStudentCheckin;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;
import com.morningstardance.domain.msdstudentcheckin.MSDStudentCheckinRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdStudentCheckinFacade")
public class MSDStudentCheckinFacadeImpl implements MSDStudentCheckinFacade {
	
	private final int VALID_INFORMATION = 1;
	private final int STUDENT_NOT_REGISTER_TO_CLASS = 2;
	private final int STUDENT_NOT_FOUND = 3;

	@Resource(name="msdStudentRepository")
	MSDStudentRepository msdStudentRepository;
	
	@Resource(name="msdClassRepository")
	MSDClassRepository msdClassRepository;
	
	@Resource(name="msdStudentCheckinRepository")
	MSDStudentCheckinRepository msdStudentCheckinRepository;
	
	@Resource
	MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	MSDStudentClassJPARepository msdStudentClassJPARepository;
	

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
			MSDStudentCheckinDto dto = this.getStudentCheckinDtoByClassIdAndStudent(msdClassId, s);
			dtos.add(dto);
		}
		return dtos;
	}
	

	@Override
	public MSDStudentCheckinDto getStudentCheckinDtoByLastNameFirstName(Long msdClassId,
			String lastname, String firstname) {
		
		MSDStudent s = msdStudentRepository.getByLastNameFirstName(lastname, firstname);
		
		if (null == s) 
			return null;
		else 
			return this.getStudentCheckinDtoByClassIdAndStudent(msdClassId, s);
	}

	private MSDStudentCheckinDto getStudentCheckinDtoByClassIdAndStudent(Long msdClassId, MSDStudent s) {
		
		MsdStudentCheckin checkin = msdStudentCheckinRepository.findForCheckInByStudentIdAndClassId(msdClassId, s.getId());
		
		MSDStudentCheckinDto dto = null;
		
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
		dto.setInClass(msdStudentRepository.isStudentRegisteToClass(s.getId(), msdClassId));
		
		return dto;
	}

	@Override
	public List<String> getAllStudentNameList(String namelisttype) {
		List<String> nameList = null;
		if ("LASTNAME".equals(namelisttype)) {
			nameList = msdStudentJPARepository.findUniqueLastNames();
		} else if ("FIRSTNAME".equals(namelisttype)) {
			nameList = msdStudentJPARepository.findUniqueFirstNames();
		}
		return nameList;
	}

	@Override
	public String checkStudentClassRegisteinformation(
			Long msdclassid, Long msdstudentid) {
		MSDStudentClass msdsc = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(msdclassid.intValue(), msdstudentid.intValue());
		if(null != msdsc) {
			return "FOUND";
		}
		return "NOT FOUND";
	}

	@Override
	public MSDStudentCheckInValidResultDto validStudentCheckInInformation(String firstname,
			String lastname, Long msdclassid) {
		MSDStudentCheckInValidResultDto dto = new MSDStudentCheckInValidResultDto();
		
		MSDStudent student = msdStudentJPARepository.findByFirstNameAndLastName(firstname, lastname);
		if (null != student) {
			dto.setMsdStudentId(student.getId().intValue());
			MSDStudentClass msdsc = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(msdclassid.intValue(), student.getId().intValue());
			if (null != msdsc) {
				dto.setValidationResult(VALID_INFORMATION);
			} else {
				dto.setValidationResult(STUDENT_NOT_REGISTER_TO_CLASS);
			}
		} else {
			dto.setValidationResult(STUDENT_NOT_FOUND);
		}
		return dto;
	}
}
