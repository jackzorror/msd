package com.morningstardance.app.misc;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdstudent.MSDStudentDto;
import com.morningstardance.app.msdstudent.MSDStudentFacade;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDSemester;
import com.morningstardance.domain.entity.MSDType;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDSemesterJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDTypeJPARepository;

@Service("msdMiscFacade")
public class MSDMiscFacadeImpl implements MSDMiscFacade {

	@Resource
	private MSDTypeJPARepository msdTypeJPARepository;
	
	@Resource
	private MSDClassJPARepository msdClssJPARepository;
	
	@Resource
	private MSDSemesterJPARepository msdSemesterJPARepository;
	
	@Resource
	private MSDStudentFacade msdStudentFacade;
	
	@Override
	public List<MSDTypeDto> getCostType() {
		return getTypesByType("FEE_TYPE");
	}

	@Override
	public List<MSDTypeDto> getCompetitionType() {
		return getTypesByType("COMPETITION_TYPE");
	}

	@Override
	public List<MSDTypeDto> getClassType() {
		return getTypesByType("CLASS_TYPE");
	}

	@Override
	public List<MSDTypeDto> getStudentType() {
		return getTypesByType("STUDENTTYPE");
	}

	@Override
	public List<MSDTypeDto> getFeeType() {
		return getTypesByType("FEE_TYPE");
	}

	private List<MSDTypeDto> getTypesByType(String type) {
		List<MSDTypeDto> types = new ArrayList<MSDTypeDto>();
		List<MSDType> ts = msdTypeJPARepository.findByType(type);
		for (MSDType t : ts) {
			types.add(new MSDTypeDto(t.getId().intValue(), t.getName(), t.getType()));
		}
		return types;
	}

	@Override
	public MSDFileNameDto createStudentNameListFile(String cid) {
		String fpath="./../";
		String fname = "StudentNameList";
		String firstLine = "Student Name List for ";
		List<MSDStudentDto> sList = null; 
		if (null != cid && (new Long(cid)) != null && (new Long(cid)).intValue() != 0) {
			sList = msdStudentFacade.getAllStudentSummaryDtoByClassId(new Long(cid));
			MSDClass c = msdClssJPARepository.findOne(new Long(cid));
			if (null != c) 
				firstLine += "Class " + c.getName() + "-" + c.getSemesterId() + "\n";
			fname += "_" + c.getName() + "_";
		} else {
			fname += "_ALL_";
			sList = msdStudentFacade.getAllStudentSummaryDtoByClassId(null);
			firstLine += "All Class \n";
		}
		fname += new SimpleDateFormat("YYYYMMdd_HHmmss").format(new Date()) + ".csv";
		
		MSDFileNameDto dto = new MSDFileNameDto(fname, fpath, "csv");
		try {
			FileWriter fr = new FileWriter(fpath + fname);
			
			fr.write(firstLine);
			for (MSDStudentDto s : sList) {
				String line = s.getFirstName() + "," + s.getLastName() + "\n";
				fr.write(line);
			}
			
			fr.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return dto;
	}

	
	@Override
	public List<MSDSemesterDto> getSemester() {
		List<MSDSemesterDto> sList = new ArrayList<MSDSemesterDto>();
		List<MSDSemester> eList = msdSemesterJPARepository.findAll();
		for(MSDSemester e : eList) {
			sList.add(new MSDSemesterDto(e.getId().intValue(), e.getName(), e.getStartDate()));
		}
		return sList;
	}

	@Override
	public MSDSemesterDto getCurrentSemester() {
		List<MSDSemester> ses = msdSemesterJPARepository.findAllOrderByStartDate();
		Date now = new Date();
		for (MSDSemester se : ses)
			if (se.getStartDate().after(now))
				continue;
			else 
				return new MSDSemesterDto(se.getId().intValue(), se.getName(), se.getStartDate());
		
		return null;
	}

	@Override
	public MSDSemesterDto addSemester(MSDSemesterDto dto) {
		if (null == dto) return null;
		
		MSDSemester s = new MSDSemester();
		s.setName(dto.getName());
		s.setStartDate(dto.getStartDate());
		
		s = msdSemesterJPARepository.saveAndFlush(s);
		dto.setId(s.getId().intValue());
		return dto;
	}

	@Override
	public MSDSemesterDto updateSemester(MSDSemesterDto dto) {
		if (null == dto) return null;
		if (dto.getId() == 0) return addSemester(dto);
		
		MSDSemester s = msdSemesterJPARepository.findOne(new Long(dto.getId()));
		if (null == s) return null;
		s.setName(dto.getName());
		s.setStartDate(dto.getStartDate());
		return dto;
	}

	@Override
	public List<MSDTypeDto> getAllType() {
		List<MSDTypeDto> types = new ArrayList<MSDTypeDto>();
		List<MSDType> ts = msdTypeJPARepository.findAll();
		for(MSDType t : ts) 
			types.add(new MSDTypeDto(t.getId().intValue(), t.getName(), t.getType()));
		
		return types;
	}

	@Override
	public MSDSemesterDto addSemester(String name, Date startDate) {
		MSDSemester s = new MSDSemester();
		s.setName(name);
		s.setStartDate(startDate);
		
		s = msdSemesterJPARepository.saveAndFlush(s);
		
		return new MSDSemesterDto(s.getId().intValue(), s.getName(), s.getStartDate());
	}

	@Override
	public MSDTypeDto addMSDType(MSDTypeDto type) {
		if (null == type) return null;
		
		MSDType t = new MSDType();
		t.setName(type.getName());
		t.setType(type.getType());
		
		t = msdTypeJPARepository.saveAndFlush(t);
		type.setId(t.getId().intValue());
		return type;
	}
}
