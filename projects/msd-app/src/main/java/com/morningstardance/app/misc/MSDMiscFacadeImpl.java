package com.morningstardance.app.misc;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
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
import com.morningstardance.domain.entity.MSDCompetitionType;
import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDType;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDTypeJPARepository;

@Service("msdMiscFacade")
public class MSDMiscFacadeImpl implements MSDMiscFacade {

	@Resource
	private MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Resource
	private MSDCompetitionTypeJPARepository msdCompetitionTypeJPARepository;
	
	@Resource
	private MSDTypeJPARepository msdTypeJPARepository;
	
	@Resource
	private MSDClassJPARepository msdClssJPARepository;
	
	@Resource
	private MSDStudentFacade msdStudentFacade;
	
	@Override
	public List<MSDTypeDto> getCostType() {
		List<MSDTypeDto> costTypes = new ArrayList<MSDTypeDto>();
		List<MSDCostType> enitites = msdCostTypeJPARepository.findAll();
		for (MSDCostType type: enitites) {
			costTypes.add(new MSDTypeDto(type.getId().intValue(), type.getName()));
		}
		return costTypes;
	}

	@Override
	public List<MSDTypeDto> getCompetitionType() {
		List<MSDTypeDto> types = new ArrayList<MSDTypeDto>();
		List<MSDCompetitionType> entities = msdCompetitionTypeJPARepository.findAll();
		for (MSDCompetitionType entity : entities) {
			types.add(new MSDTypeDto(entity.getId().intValue(), entity.getName()));
		}
		return types;
	}
/*
	private List<MSDTypeDto> getTypesByType(String type) {
		List<MSDTypeDto> types = new ArrayList<MSDTypeDto>();
		List<MSDType> ts = msdTypeJPARepository.findByType(type);
		for (MSDType t : ts) {
			types.add(new MSDTypeDto(t.getId().intValue(), t.getName()));
		}
		return types;
	}
*/
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
				firstLine += "Class " + c.getName() + "-" + c.getLocation() + "\n";
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
}
