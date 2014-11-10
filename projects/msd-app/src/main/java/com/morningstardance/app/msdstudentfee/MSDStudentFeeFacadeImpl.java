package com.morningstardance.app.msdstudentfee;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.entity.MSDStudentCompetition;
import com.morningstardance.domain.entity.MSDStudentFee;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeeJPARepository;

@Service("msdStudentFeeFacade")
public class MSDStudentFeeFacadeImpl implements MSDStudentFeeFacade {

	@Resource
	MSDStudentFeeJPARepository msdStudentFeeJPARepository;
	
	@Resource
	MSDClassFeeJPARepository msdClassFeeJPARepository;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Resource 
	private MSDStudentClassJPARepository msdStudentClassJPARepository;
	
	@Resource
	private MSDStudentCompetitionJPARepository msdStudentCompetitionJPARepository;
	
	@Resource
	private MSDCompetitionFeeJPARepository msdCompetitionFeeJPARepository;
	
	@Override
	public void addClassFeeToStudentFeeByStudentIdAndStudentClassId(Long sid, Long scid) {
		MSDStudentClass sc = msdStudentClassJPARepository.findOne(scid);
		Long cid = new Long(sc.getMsdClassId());
		List<MSDClassFee> cfees = msdClassFeeJPARepository.findByMsdClassId(cid.intValue());
		for (MSDClassFee cfee : cfees) {
			MSDStudentFee sfee = new MSDStudentFee();
			sfee.setIsActive(cfee.getIsActive());
			sfee.setIsPaid((byte)0);
			sfee.setIsWaiver((byte)0);
			sfee.setMsdStudentFeeObjectId(cfee.getId().intValue());
			sfee.setMsdStudentFeeObjectName(MSDClassFee.class.getSimpleName());
			sfee.setMsdStudentId(sid.intValue());
			msdStudentFeeJPARepository.save(sfee);
			msdOperationService.msdStudentOperation(sid, "Add Class Fee to Student Fee", sfee.toString(), null, "DATABASE");
		}
	}

	@Override
	public void removeClassFeeFromStudentFeeByStudentIdAndStudentClassId(Long sid, Long scid) {
		MSDStudentClass sc = msdStudentClassJPARepository.findOne(scid);
		Long cid = new Long(sc.getMsdClassId());
		List<MSDClassFee> cfees = msdClassFeeJPARepository.findByMsdClassId(cid.intValue());
		for (MSDClassFee cfee : cfees) {
			MSDStudentFee sfee = msdStudentFeeJPARepository.findByMsdStudentIdAndMsdStudentFeeObjectIdAndMsdStudentFeeObjectName(sid.intValue(), cfee.getId().intValue(), MSDClassFee.class.getSimpleName());
			if (null != sfee) {
				sfee.setIsActive((byte)0);
			}
			msdStudentFeeJPARepository.save(sfee);
			msdOperationService.msdStudentOperation(sid, "Remove Class Fee From Student Fee", sfee.toString(), null, "DATABASE");
		}
	}

	@Override
	public void addCompetitionFeeToStudentFeeByStudentIdAndStudentCompetitionId(
			Long msdStudentId, Long scid) {
		MSDStudentCompetition sc = msdStudentCompetitionJPARepository.findOne(scid);
		Long cid = new Long(sc.getMsdComptitionId());
		List<MSDCompetitionFee> cfees = msdCompetitionFeeJPARepository.findByMsdCompetitionId(cid.intValue());
		for (MSDCompetitionFee cfee : cfees) {
			MSDStudentFee sfee = new MSDStudentFee();
			sfee.setIsActive(cfee.getIsActive());
			sfee.setIsPaid((byte)0);
			sfee.setIsWaiver((byte)0);
			sfee.setMsdStudentFeeObjectId(cfee.getId().intValue());
			sfee.setMsdStudentFeeObjectName(MSDCompetitionFee.class.getSimpleName());
			sfee.setMsdStudentId(msdStudentId.intValue());
			msdStudentFeeJPARepository.save(sfee);
			msdOperationService.msdStudentOperation(msdStudentId, "Add Competition Fee to Student Fee", sfee.toString(), null, "DATABASE");
		}
	}

	@Override
	public void removeCompetitionFeeFromStudentFeeByStudentIdAndStudentCompetitionId(
			Long msdStudentId, Long scid) {
		MSDStudentCompetition sc = msdStudentCompetitionJPARepository.findOne(scid);
		Long cid = new Long(sc.getMsdComptitionId());
		List<MSDCompetitionFee> cfees = msdCompetitionFeeJPARepository.findByMsdCompetitionId(cid.intValue());
		for (MSDCompetitionFee cfee : cfees) {
			MSDStudentFee sfee = msdStudentFeeJPARepository.findByMsdStudentIdAndMsdStudentFeeObjectIdAndMsdStudentFeeObjectName(msdStudentId.intValue(), cfee.getId().intValue(), MSDCompetitionFee.class.getSimpleName());
			if (null != sfee) {
				sfee.setIsActive((byte)0);
			}
			msdStudentFeeJPARepository.save(sfee);
			msdOperationService.msdStudentOperation(msdStudentId, "Remove Competition Fee From Student Fee", sfee.toString(), null, "DATABASE");
		}
		
	}
}
