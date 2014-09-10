package com.morningstardance.app.msdstudent;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdclass.MSDClassAssembler;
import com.morningstardance.app.msdclass.MSDClassSummaryDto;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.msdstudent.MSDStudentRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassSchedularJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdStudentFacade")
public class MSDStudentFacadeImpl implements MSDStudentFacade {
	
	@Resource(name="msdStudentRepository")
	private MSDStudentRepository msdStudentRepository;
	
	@Resource(name="msdStudentAssembler")
	private MSDStudentAssembler msdStudentAssembler;
	
	@Resource(name="msdClassRepository")
	private MSDClassRepository msdClassRepository;
	
	@Resource(name="msdClassAssembler")
	private MSDClassAssembler msdClassAssembler;
	
	@Resource
	private MSDStudentClassJPARepository msdStudentClassJPARepository;
	
	@Resource
	private MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	private MSDClassSchedularJPARepository msdClassSchedularJPARepository;
	
	@Resource
	private MSDClassJPARepository msdClassJPARepository;
	
	@Override
	public List<MSDStudentDto> getAllStudents() {
		List<MSDStudent> msdStudents = msdStudentJPARepository.findAll();
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
//		MSDStudent s = msdStudentRepository.getByLastNameFirstName(lastname, firstname);
		MSDStudent s = msdStudentJPARepository.findByFirstNameAndLastName(firstname, lastname);
		
		return msdStudentAssembler.createDetailDtoFromEntity(s);
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
		msdStudentJPARepository.save(student);
		
		return msdStudentAssembler.createDetailDtoFromEntity(student);
	}

	@Override
	public MSDStudentDetailDto addStudent(MSDStudentDetailDto studentDetailDto) {
		MSDStudent student = msdStudentRepository.getByLastNameFirstName(studentDetailDto.getLastName(), studentDetailDto.getFirstName());
		if (null == student) {
			student = msdStudentAssembler.createEntityFromDetailDto(studentDetailDto);
			student = msdStudentRepository.save(student);
		}
		return msdStudentAssembler.createDetailDtoFromEntity(student);
	}

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
	public List<String> getStudentUniqueName(String fieldname) {
		if ("FIRSTNAME".equals(fieldname)) {
			return msdStudentJPARepository.findUniqueFirstNames();
		}
		
		if ("LASTNAME".equals(fieldname)) {
			return msdStudentJPARepository.findUniqueLastNames();
		}
		
		return null;
	}

	@Override
	public List<MSDClassSummaryDto> getStudentNonRegisterClassByStudentId(Long msdstudentid) {
		List<MSDClass> s = msdClassRepository.getStudentNonRegisterClassByStudentId(msdstudentid);
		return getMSDClassSummaryDtoFromEntity(s);
	}

	@Override
	public List<MSDClassSummaryDto> getStudentRegisterClassByStudentId(Long msdstudentid) {
		List<MSDClass> s = msdClassRepository.getStudentRegisterClassByStudentId(msdstudentid);

		return getMSDClassSummaryDtoFromEntity(s);
	}

	private List<MSDClassSummaryDto> getMSDClassSummaryDtoFromEntity(List<MSDClass> s) {
		List<MSDClassSummaryDto> dtos = new ArrayList<MSDClassSummaryDto>();
		
		for(MSDClass c : s) {
			List<MSDClassSchedular> schedulars = msdClassSchedularJPARepository.findByMsdClassId(c.getId().intValue());
			dtos.add(msdClassAssembler.createSummaryDtoFromEntity(c, schedulars));
		}
		return dtos;
	}

	@Override
	public MSDClassSummaryDto getStudentRegisterClassByStudentIdClassId(
			Long msdstudentid, Long msdclassid) {
		
		return null;
	}

	@Override
	public String deleteRegisterClassByStudentIdAndClassId(
			Long msdstudentid, Long msdclassid) {
		try {
			MSDStudentClass sc = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(msdclassid.intValue(), msdstudentid.intValue());
			msdStudentClassJPARepository.delete(sc);
		}  catch (Exception ex) {
			return ex.getStackTrace().toString();
		}
		return null;
	}

	@Override
	public List<MSDStudentDto> getAllStudentSummaryDtoByClassName(String msdclassname) {
		List<MSDStudent> ms = null;
		List<MSDStudentDto> msdtos = null;
		if (msdclassname.equals("All")) {
			ms = msdStudentJPARepository.findAll();
		} else {
			MSDClass c = msdClassJPARepository.findByName(msdclassname);
			if (null != c) {
				ms = msdStudentRepository.getAllByClassId(c.getId());
			} 
		}
		msdtos = msdStudentAssembler.createDtoFromEntity(ms);
		return msdtos;
	}

}
