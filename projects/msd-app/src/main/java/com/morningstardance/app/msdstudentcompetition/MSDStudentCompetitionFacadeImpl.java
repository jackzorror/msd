package com.morningstardance.app.msdstudentcompetition;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeFacade;
import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.entity.MSDStudentCompetition;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdStudentCompetitionFacade")
public class MSDStudentCompetitionFacadeImpl implements
		MSDStudentCompetitionFacade {
	
	@Resource
	private MSDStudentCompetitionJPARepository msdStudentCompetitionJPARepository;
	
	@Resource
	private MSDStudentCompetitionAssembler msdStudentCompetitionAssembler;
	
	@Resource
	private MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	private MSDCompetitionJPARepository msdCompetitionJPARepository;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Resource
	private MSDStudentFeeFacade msdStudentFeeFacade;
	
	@Override
	public MSDStudentCompetitionDto registerStudentToCompetitionByStudentCompetitionDto(
			MSDStudentCompetitionDto studentCompetitionDto) {
		return registerStudentToCompetitionByStudentIdAndCompetitionId(new Long(studentCompetitionDto.getMsdStudentId()), new Long(studentCompetitionDto.getMsdCompetitionId()));
	}

	public MSDStudentCompetitionDto registerStudentToCompetitionByStudentIdAndCompetitionId(Long msdStudentId, Long msdCompetitionId) {
		MSDStudentCompetition entity = createStudentCompetitionRecord(msdStudentId, msdCompetitionId);
		MSDStudentCompetitionDto dto = msdStudentCompetitionAssembler.createDtoFromEntity(entity);
		return dto;
	}

	private MSDStudentCompetition createStudentCompetitionRecord(Long msdStudentId, Long msdCompetitionId) {
		if (null == msdStudentId || null == msdCompetitionId || msdStudentId.intValue() == 0 || msdCompetitionId.intValue() == 0) return null;
		MSDStudent s = msdStudentJPARepository.findOne(msdStudentId);
		if (null == s) return null;
		MSDCompetition c = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null == c) return null;
		
		MSDStudentCompetition stduentCompetition = new MSDStudentCompetition();
		stduentCompetition.setIsActive((byte)1);
		stduentCompetition.setMsdStudentId(msdStudentId.intValue());
		stduentCompetition.setMsdComptitionId(msdCompetitionId.intValue());
		
		MSDStudentCompetition entity = msdStudentCompetitionJPARepository.findByMsdCompetitionIdAndMsdStudentId(msdCompetitionId.intValue(), msdStudentId.intValue());
		if (null == entity || entity.getIsActive() == (byte) 0 ) {
			entity = msdStudentCompetitionJPARepository.saveAndFlush(stduentCompetition);
			msdOperationService.msdStudentClassOperation(msdStudentId, msdCompetitionId, "Register Student : " + msdStudentId + " to Competition : " + msdCompetitionId, "DATABASE");
			msdStudentFeeFacade.addCompetitionFeeToStudentFeeByStudentIdAndStudentCompetitionId(msdStudentId, entity.getId());
		} else {
			msdOperationService.msdStudentCompetitionOperation(msdStudentId, msdCompetitionId, "Re - Register Student : " + msdStudentId + " to Class : " + msdCompetitionId +
					Thread.currentThread().getStackTrace()[1].getMethodName() + " at line : " + Thread.currentThread().getStackTrace()[1].getLineNumber(), "WARNING");
		}
		
		return entity;
	}

	@Override
	public String registerStudentToCompetitionesByStudentIdAndCompetitionIdList(
			Long msdstudentid, String msdcompetitionidlist) {
		if (null == msdstudentid || msdstudentid.intValue() == 0 || null == msdcompetitionidlist || msdcompetitionidlist.isEmpty()) return null;
		String [] ids = msdcompetitionidlist.split(",");
		for (String id : ids) {
			if (null != id && !(id.isEmpty()))
				registerStudentToCompetitionByStudentIdAndCompetitionId(msdstudentid, new Long(id));
		}
		
		return "Sucess";
	}

	@Override
	public String registerStudentToCompetitionByCompetitionIDAndStudentIdlistAndType(
			Long competitionid, String studentidlist, Long oldcompetitionid,
			String registertype) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String unRegisterStudentFromCompetitionsByStudentIdAndCompetitionIdList(
			Long msdstudentid, String msdcompetitionidlist) {
		if (null == msdstudentid || msdstudentid.intValue() == 0 || null == msdcompetitionidlist || msdcompetitionidlist.isEmpty()) return null;
		String [] ids = msdcompetitionidlist.split(",");
		for (String id : ids) {
			if (null != id && !(id.isEmpty()))
				unRegisterStudentFromCompetitionByStudentIdAndCompetitionId(msdstudentid, new Long(id));
		}
		
		return "Sucess";
	}

	public String unRegisterStudentFromCompetitionByStudentIdAndCompetitionId(Long sid, Long cid) {
		MSDStudentCompetition entity = msdStudentCompetitionJPARepository.findByMsdCompetitionIdAndMsdStudentId(cid.intValue(), sid.intValue());
		if (null != entity) {
			unRegisterStudentFromCompetitionById(entity.getId());
		} else {
			msdOperationService.msdStudentCompetitionOperation(sid, cid, "Un - Register Student : " + sid + " from Compeition : " + cid + " " + 
					Thread.currentThread().getStackTrace()[1].getMethodName() + " at line : " + Thread.currentThread().getStackTrace()[1].getLineNumber(), "WARNING");
		}
		
		return "success";
		
	}

	private void unRegisterStudentFromCompetitionById(Long id) {
		MSDStudentCompetition msdsc = msdStudentCompetitionJPARepository.findOne(id);
		if (null != msdsc) {
			msdsc.setIsActive((byte)0);
			msdStudentCompetitionJPARepository.saveAndFlush(msdsc);
			Long sid = new Long(msdsc.getMsdStudentId());
			Long cid = new Long(msdsc.getMsdComptitionId());
			msdOperationService.msdStudentClassOperation(sid, cid, "Un Register Student : " + sid + " from Competition : " + cid, "DATABASE");
			msdStudentFeeFacade.removeCompetitionFeeFromStudentFeeByStudentIdAndStudentCompetitionId(sid, msdsc.getId());
		}
	}

}
