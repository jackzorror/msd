package com.morningstardance.app.msdcompetition;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeAssembler;
import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeDto;
import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.repository.MSDCompetitionRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdCompetitionFacade")
public class MSDCompetitionFacadeImpl implements MSDCompetitionFacade {

	@Resource
	private MSDCompetitionJPARepository msdCompetitionJPARepository;
	
	@Resource
	private MSDCompetitionRepository msdCompetitionRepository;
	
	@Resource
	private MSDCompetitionFeeJPARepository msdCompetitionFeeJPARepository;
	
	@Resource
	private MSDStudentCompetitionJPARepository msdStudentCompetitionJPARepository;
	
	@Resource
	private MSDCompetitionAssembler msdCompetitionAssembler;
	
	@Resource
	private MSDCompetitionFeeAssembler msdCompetitionFeeAssembler;
	
	@Resource
	private MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Override
	public List<MSDCompetitionDto> getAllMSDCompetition() {
		List<MSDCompetitionDto> dtos = null;
		List<MSDCompetition> entities = msdCompetitionJPARepository.findAll();
		
		if (null != entities && entities.size() > 0) {
			dtos = new ArrayList<MSDCompetitionDto>();
			for (MSDCompetition entity : entities) {
				dtos.add(msdCompetitionAssembler.createDtoFromEntity(entity));
			}
		}
		return dtos; 
	}

	@Override
	public MSDCompetitionDto getMSDCompetitionById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return null;
		
		MSDCompetitionDto dto = null;
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null != entity) {
			dto = msdCompetitionAssembler.createDtoFromEntity(entity);
		}
		return dto;
	}

	@Override
	public MSDCompetitionDto addCompetition(MSDCompetitionDto msdcompetitiondto) {
		
		if (null == msdcompetitiondto) return null;
		
		String ovalue = null;
		if (msdcompetitiondto.getId() != 0) {
			MSDCompetition oentity = msdCompetitionJPARepository.findOne(new Long(msdcompetitiondto.getId()));
			if (null != oentity)
				ovalue = oentity.toString();
		}
		
		MSDCompetition entity = msdCompetitionAssembler.createEntityFromDto(msdcompetitiondto);
		msdCompetitionJPARepository.save(entity);
		MSDCompetitionDto dto = msdCompetitionAssembler.createDtoFromEntity(entity);
		
		if (msdcompetitiondto.getId() == 0) {
			msdOperationService.msdCompetitionOperation(entity.getId(), "Create New Competition", entity.toString(), null, "DATABASE");
		} else {
			msdOperationService.msdCompetitionOperation(entity.getId(), "Change Class", entity.toString(), ovalue, "DATABASE");
		}
		return dto;
	}

	@Override
	public void disableCompetitionById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return;
		
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null == entity) return;
		
		entity.setIsActive((byte) 0);
		
		msdCompetitionJPARepository.save(entity);
		
		msdOperationService.msdCompetitionOperation(entity.getId(), "Disable Competition", entity.toString(), null, "DATABASE");
	}

	@Override
	public MSDCompetitionSummaryDto getMSDCompetitionSummaryDtoById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return null;
		
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null == entity) return null;
		
		MSDCompetitionSummaryDto dto = msdCompetitionAssembler.createSummaryDtoFromEntity(entity);
		
		return dto;
	}

	@Override
	public MSDCompetitionDto getMSDCompetitionDtoById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return null;
		
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null == entity) return null;
		
		MSDCompetitionDto dto = msdCompetitionAssembler.createDtoFromEntity(entity);
		
		return dto;
	}

	@Override
	public MSDCompetitionDetailDto getMSDCompetitionDetailDtoById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return null;
		
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null == entity) return null;

		List<MSDCompetitionFee> cfees = msdCompetitionFeeJPARepository.findByMsdCompetitionIdAndIsActive(msdCompetitionId.intValue(), (byte)1);
		
		List<MSDCompetitionFeeDto> cfeedtos = new ArrayList<MSDCompetitionFeeDto>();
		for (MSDCompetitionFee cfee : cfees) {
			MSDCompetitionFeeDto dto = msdCompetitionFeeAssembler.createDtoFromEntity(cfee);
			cfeedtos.add(dto);
		}
		
		BigDecimal totalFee = msdCompetitionFeeJPARepository.getTotalCompetitionFeeByCompetitionIdAndIsActive(new Integer(msdCompetitionId.intValue()), (byte)1);
		Long totalStudent = msdStudentCompetitionJPARepository.getTotalStudentCountByCompetitionIdAndIsActive(new Integer(msdCompetitionId.intValue()), (byte)1); 
		
		MSDCompetitionDetailDto dto = msdCompetitionAssembler.createDetailDtoFromEnitty(entity, cfeedtos, totalFee, totalStudent);
			
		return dto;
	}

	@Override
	public List<MSDCompetitionSummaryDto> getCompetitionSummaryDtoByStudentIdAndType(Long msdstudentid, String type) {
		if (null == msdstudentid || msdstudentid.intValue() == 0 || null == type || type.isEmpty()) return null;
	
		if (type.equals("REGISTER")) {
			return getStudentRegisterCompetitionSummaryDtoByStudentId(msdstudentid);
		} else if (type.equals("NONREGISTER")) {
			return getStudentNonRegisterCompetitionSummaryDtoByStudentId(msdstudentid);
		}
			
		return null;
	}

	@Override
	public List<MSDCompetitionSummaryDto> getStudentNonRegisterCompetitionSummaryDtoByStudentId(
			Long msdstudentid) {
		if (null == msdstudentid || msdstudentid.intValue() == 0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(msdstudentid);
		if (null == s || s.getIsActive() == (byte)0) return null;
		
		List<MSDCompetition> cList = msdCompetitionRepository.findStudentNonRegisterCompetitionByStudentId(msdstudentid);
		
		if (null == cList || cList.size() == 0)  return null;
		
		List<MSDCompetitionSummaryDto> dtos = new ArrayList<MSDCompetitionSummaryDto>();
		for(MSDCompetition c : cList) {
			dtos.add(msdCompetitionAssembler.createSummaryDtoFromEntity(c));
		}
		
		return dtos;
	}

	@Override
	public  List<MSDCompetitionSummaryDto> getStudentRegisterCompetitionSummaryDtoByStudentId(
			Long msdstudentid) {
		if (null == msdstudentid || msdstudentid.intValue() == 0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(msdstudentid);
		if (null == s || s.getIsActive() == (byte)0) return null;
		
		List<MSDCompetition> cList = msdCompetitionRepository.findStudentRegisterCompetitionByStudentId(msdstudentid);
		
		if (null == cList || cList.size() == 0)  return null;
		
		List<MSDCompetitionSummaryDto> dtos = new ArrayList<MSDCompetitionSummaryDto>();
		for(MSDCompetition c : cList) {
			dtos.add(msdCompetitionAssembler.createSummaryDtoFromEntity(c));
		}

		/*
		List<MSDStudentCompetition> scList = msdStudentCompetitionJPARepository.findByMsdStudentIdAndIsActive(msdstudentid.intValue(), (byte)1);
		
		if (null == scList || scList.size() == 0) return null;
		
		List<MSDCompetitionSummaryDto> dtos = new ArrayList<MSDCompetitionSummaryDto>();
		for (MSDStudentCompetition sc : scList) {
			MSDCompetition entity = msdCompetitionJPARepository.findOne(new Long(sc.getMsdComptitionId()));
			if (null != sc && sc.getIsActive() == (byte) 1) {
				dtos.add(msdCompetitionAssembler.createSummaryDtoFromEntity(entity));
			}
		}
		*/
		return dtos;
	}

}
