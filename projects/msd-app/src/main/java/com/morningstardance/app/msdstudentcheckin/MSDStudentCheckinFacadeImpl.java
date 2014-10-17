package com.morningstardance.app.msdstudentcheckin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.entity.MsdStudentCheckin;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;
import com.morningstardance.domain.msdstudentcheckin.MSDStudentCheckinRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
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
	
	@Resource
	MSDClassJPARepository msdClassJPARepository;
	
	@Resource
	MSDOperationService msdOperationService;

	@Override
	public MSDStudentCheckinDto studentClassCheckin(MSDStudentCheckinDto indto) {
		if (null == indto) {
			return null;
		}
		
		MSDStudent msdStudent = msdStudentRepository.findById(new Long(indto.getStudentId()));
		if (null == msdStudent) {
			return null;
		}
		
		MSDClass msdClass = msdClassRepository.findById(new Long(indto.getClassId()));
		if (null == msdClass) {
			return null;
		}
		
		MsdStudentCheckin checkin = new MsdStudentCheckin();
		checkin.setMsdClassId(indto.getClassId());
		checkin.setMsdStudentId(indto.getStudentId());
		checkin.setCheckinTime(indto.getCheckInTime());
		checkin.setIsFivehoursmore(indto.isIsFiveHoursMore() == true ? new Byte((byte)1) : new Byte((byte)0));
		checkin.setIsMakeup(indto.isIsMakeup() == true ? new Byte((byte)1) : new Byte((byte)0));
		checkin.setIsOther(indto.isIsOther() == true ? new Byte((byte)1) : new Byte((byte)0));
		checkin.setNote(indto.getOtherCheckinReason());
		
		checkin = msdStudentCheckinRepository.save(checkin);
		
		MSDStudentCheckinDto dto = new MSDStudentCheckinDto(checkin);

		msdOperationService.msdStudentClassOperation(new Long(checkin.getMsdStudentId()), new Long(checkin.getMsdClassId()), 
				"Student : " + checkin.getMsdStudentId() + " Check in Class : " + checkin.getMsdClassId(), "DATABASE");
		
		return dto;
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

		msdOperationService.msdStudentClassOperation(new Long(checkin.getMsdStudentId()), new Long(checkin.getMsdClassId()), 
				"Student : " + checkin.getMsdStudentId() + " Check in Class : " + checkin.getMsdClassId(), "DATABASE");
		
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
	public List<String> getFieldList(String fieldname) {
		List<String> nameList = null;
		if ("LASTNAME".equals(fieldname)) {
			nameList = msdStudentJPARepository.findUniqueLastNames();
		} else if ("FIRSTNAME".equals(fieldname)) {
			nameList = msdStudentJPARepository.findUniqueFirstNames();
		} else if ("CLASSNAME".equals(fieldname)) {
			nameList = msdClassJPARepository.findUniqueNames();
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
			String lastname, String msdclassname) {
		MSDStudentCheckInValidResultDto dto = new MSDStudentCheckInValidResultDto();
		MSDClass mclass = msdClassJPARepository.findByName(msdclassname);
		
		MSDStudent student = msdStudentJPARepository.findByFirstNameAndLastName(firstname, lastname);
		if (null != student) {
			dto.setMsdStudentId(student.getId().intValue());
			dto.setMsdClassId(mclass.getId().intValue());
			MSDStudentClass msdsc = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentIdAndIsActive(mclass.getId().intValue(), student.getId().intValue(), (byte)1);
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

	@Override
	public List<MSDStudentCheckinReportDto> getStudentCheckinReportByStudentIdAndClassId(
			Long msdstudentid, Long msdclassid) {
		if (null == msdstudentid || null == msdclassid) return null;
		
		MSDClass mclass = msdClassJPARepository.findOne(msdclassid);
		if (null == mclass) return null;
		
		boolean isRegisterStudent = null != msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(msdclassid.intValue(), msdstudentid.intValue());
		String cname = mclass.getName();
		
		List<MsdStudentCheckin> scilist = msdStudentCheckinRepository.findByStudentIdAndClassId(msdstudentid.intValue(), msdclassid.intValue());
		
		if (null == scilist || scilist.size() < 1) return null;
		
		List<MSDStudentCheckinReportDto> dtos = createStudentChechinReportDto(scilist, cname, isRegisterStudent);
		
		return dtos;
	}

	private List<MSDStudentCheckinReportDto> createStudentChechinReportDto(
			List<MsdStudentCheckin> scilist, String cname,
			boolean isRegisterStudent) {
		List<MSDStudentCheckinReportDto> dtos = new ArrayList<MSDStudentCheckinReportDto>();
		
		for (MsdStudentCheckin sci : scilist) {
			MSDStudentCheckinReportDto dto = new MSDStudentCheckinReportDto();
			dto.setId(sci.getId().intValue());
			dto.setCheckInTime(sci.getCheckinTime());
			dto.setClassId(sci.getMsdClassId());
			dto.setClassName(cname);
			dto.setFiveHoursMoreStduent(sci.getIsFivehoursmore() == new Byte((byte)1));
			dto.setMakeup(sci.getIsFivehoursmore() == new Byte((byte)1));
			dto.setNote(sci.getNote());
			dto.setOther(sci.getIsOther() == new Byte((byte)1));
			dto.setRegisterClass(isRegisterStudent);
			dto.setStudentId(sci.getMsdStudentId());
			
			dtos.add(dto);
		}
		return dtos;
	}


	@Override
	public List<MSDStudentCheckinReportDto> getStudentAllCheckinReportByStudentId(Long msdstudentid) {
		if (null == msdstudentid) return null;
		
		List<MSDStudentCheckinReportDto> dtos = new ArrayList<MSDStudentCheckinReportDto>();
		
		List<MsdStudentCheckin> sclist = msdStudentCheckinRepository.findByStudentId(msdstudentid.intValue());

		for (MsdStudentCheckin msc : sclist) {
			MSDStudentCheckinReportDto dto = null;
			MSDStudentClass sc = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(msc.getMsdClassId(), msc.getMsdStudentId());
			MSDClass c = msdClassJPARepository.findOne(new Long(msc.getMsdClassId()));
			
			if (null == sc || sc.getIsActive() == (byte) 0) {
				dto = createStudentCheckinReportDto(msc, c.getName(), false);
			} else {
				dto = createStudentCheckinReportDto(msc, c.getName(), true);
			}
			dtos.add(dto);
		}
		return dtos;
	}


	private MSDStudentCheckinReportDto createStudentCheckinReportDto(MsdStudentCheckin msc, String cname, boolean isRegisterStudent) {
		MSDStudentCheckinReportDto dto = new MSDStudentCheckinReportDto();
		dto.setId(msc.getId().intValue());
		dto.setCheckInTime(msc.getCheckinTime());
		dto.setClassId(msc.getMsdClassId());
		dto.setClassName(cname);
		dto.setFiveHoursMoreStduent(null != msc.getIsFivehoursmore() && msc.getIsFivehoursmore().byteValue() == (byte)1);
		dto.setMakeup(null != msc.getIsMakeup() && msc.getIsMakeup().byteValue() == (byte)1);
		dto.setNote(msc.getNote());
		dto.setOther(null != msc.getIsOther() && msc.getIsOther().byteValue() == (byte)1);
		dto.setRegisterClass(isRegisterStudent);
		dto.setStudentId(msc.getMsdStudentId());
		
		return dto;
	}
}
