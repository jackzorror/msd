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
	/**
	 * when user register student to class, the system will add all
	 * the active class fee to this student fee table
	 */
	public void addClassFeeToStudentFeeByStudentIdAndStudentClassId(Long sid, Long scid) {
		if (null == sid || null == scid) return;
				
		MSDStudentClass sc = msdStudentClassJPARepository.findOne(scid);
		if (null == sc || sc.getIsActive() == (byte) 0) return;
		
		Long cid = new Long(sc.getMsdClassId());
		List<MSDClassFee> cfees = msdClassFeeJPARepository.findByMsdClassIdAndIsActive(cid.intValue(), (byte) 1);
		for (MSDClassFee cfee : cfees) {
			if (cfee.getIsActive() == (byte) 0)
				continue;
			
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(sid, cfee.getId(), MSDClassFee.class.getSimpleName());
		}
	}

	@Override
	/**
	 * when user un register student from class, the system will de active all
	 * the student fee which link to un register class' class fees
	 */
	public void removeClassFeeFromStudentFeeByStudentIdAndStudentClassId(Long sid, Long scid) {
		MSDStudentClass sc = msdStudentClassJPARepository.findOne(scid);
		Long cid = new Long(sc.getMsdClassId());
		List<MSDClassFee> cfees = msdClassFeeJPARepository.findByMsdClassIdAndIsActive(cid.intValue(), (byte) 1);
		for (MSDClassFee cfee : cfees) {
			if (cfee.getIsActive() == (byte) 0)
				continue;

			MSDStudentFee sfee = getOnlyOneActiveStudentFeeByStudentIdANdFeeObjectIdAndFeeObjectId(sid.intValue(), cfee.getId().intValue(), MSDClassFee.class.getSimpleName());
			if (null != sfee) {
				sfee.setIsActive((byte)0);
				msdStudentFeeJPARepository.saveAndFlush(sfee);
				msdOperationService.msdStudentOperation(sid, "Remove Class Fee From Student Fee", sfee.toString(), null, "DATABASE");
			} else {
				String msg = "Cannot find (or found more than one active) student fee.";
				msdOperationService.msdStudentOperation(sid, "Remove Class Fee From Student Fee", msg, "Class Fee: " + cfee.toString(), "ERROR");

				throw new RuntimeException();
			}
		}
	}
	
	@Override
	/**
	 * when user delete class fee under class UI, the system will
	 * de active this class fee in all active student fee table with same
	 * class fee id
	 */
	public void removeClassFeeFromStudentFeeByClassFeeId(Long id) {
		if (null == id || id.intValue() == 0) return;
		
		MSDClassFee cfee = msdClassFeeJPARepository.findOne(id);
		
		if (null == cfee) return;
		
		List<MSDStudentFee> sfees = msdStudentFeeJPARepository.findByMsdStudentFeeObjectIdAndMsdStudentFeeObjectNameAndIsActive(id.intValue(), MSDClassFee.class.getSimpleName(), (byte)1);
		for (MSDStudentFee sfee : sfees) {
			if (null != sfee) {
				sfee.setIsActive((byte)0);
				msdStudentFeeJPARepository.save(sfee);
				msdOperationService.msdStudentOperation(new Long(sfee.getMsdStudentId()), "Remove Class Fee From Student Fee", sfee.toString(), null, "DATABASE");
			}
		}
	}
	
	@Override
	/**
	 * when user register student to competition, the system will add all
	 * the active competition fee to this student fee table
	 */
	public void addCompetitionFeeToStudentFeeByStudentIdAndStudentCompetitionId(
			Long sid, Long scid) {
		if (null == sid || null == scid) return;
		
		MSDStudentCompetition sc = msdStudentCompetitionJPARepository.findOne(scid);
		if (null == sc || sc.getIsActive() == (byte) 0) return;
		
		Long cid = new Long(sc.getMsdComptitionId());
		List<MSDCompetitionFee> cfees = msdCompetitionFeeJPARepository.findByMsdCompetitionId(cid.intValue());
		for (MSDCompetitionFee cfee : cfees) {
			if (cfee.getIsActive() == (byte) 0) 
				continue;
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(sid, cfee.getId(), MSDCompetitionFee.class.getSimpleName());
		}
	}

	@Override
	public void removeCompetitionFeeFromStudentFeeByStudentIdAndStudentCompetitionId(
			Long msdStudentId, Long scid) {
		MSDStudentCompetition sc = msdStudentCompetitionJPARepository.findOne(scid);
		Long cid = new Long(sc.getMsdComptitionId());
		List<MSDCompetitionFee> cfees = msdCompetitionFeeJPARepository.findByMsdCompetitionId(cid.intValue());
		for (MSDCompetitionFee cfee : cfees) {
			if (cfee.getIsActive() == (byte) 0) 
				continue;

			MSDStudentFee sfee = getOnlyOneActiveStudentFeeByStudentIdANdFeeObjectIdAndFeeObjectId(msdStudentId.intValue(), cfee.getId().intValue(), MSDCompetitionFee.class.getSimpleName());
			if (null != sfee) {
				sfee.setIsActive((byte)0);
				msdStudentFeeJPARepository.save(sfee);
				msdOperationService.msdStudentOperation(msdStudentId, "Remove Competition Fee From Student Fee", sfee.toString(), null, "DATABASE");
			} else {
				String msg = "Cannot find (or found more than one active) student fee.";
				msdOperationService.msdStudentOperation(msdStudentId, "Remove Competition Fee From Student Fee", msg, "Competition Fee: " + cfee.toString(), "ERROR");

				throw new RuntimeException();
				
			}
		}
		
	}

	@Override
	public void removeCompetitionFeeFromStudentFeeByCompetitionFeeId(Long id) {
		if (null == id || id.intValue() == 0) return;
		
		MSDCompetitionFee cfee = msdCompetitionFeeJPARepository.findOne(id);
		
		if (null == cfee) return;
		
		List<MSDStudentFee> sfees = msdStudentFeeJPARepository.findByMsdStudentFeeObjectIdAndMsdStudentFeeObjectNameAndIsActive(id.intValue(), MSDCompetitionFee.class.getSimpleName(), (byte)1);
		for (MSDStudentFee sfee : sfees) {
			if (null != sfee) {
				sfee.setIsActive((byte)0);
				msdStudentFeeJPARepository.save(sfee);
				msdOperationService.msdStudentOperation(new Long(sfee.getMsdStudentId()), "Remove Competition Fee From Student Fee", sfee.toString(), null, "DATABASE");
			}
		}
	}

	@Override
	/**
	 * when user add class fee under class UI, the system will
	 * add this new class fee to all student whose register to
	 * this class
	 */
	public void addClassFeeToStudentFeeByClassFeeId(Long id) {
		if (null == id || id.intValue() == 0) return;
		
		MSDClassFee cfee = msdClassFeeJPARepository.findOne(id);
		
		if (null == cfee || cfee.getIsActive() == (byte) 0) return;
		
		// only find active MSDStudentClass record
		List<MSDStudentClass> scs = msdStudentClassJPARepository.findByMsdClassIdAndIsActive(cfee.getMsdClassId(), (byte) 1);
		for (MSDStudentClass cs : scs) {
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(new Long(cs.getMsdStudentId()), cfee.getId(), MSDClassFee.class.getSimpleName());
		}
	}

	@Override
	/**
	 * when user add competition fee under competition UI, the system will
	 * add this new competition fee to all student fee whose register to 
	 * this competition
	 */
	public void addCompetitionFeeToStudentFeeByCompetitionFeeId(Long id) {
		if (null == id || id.intValue() == 0) return;
		
		MSDCompetitionFee cfee = msdCompetitionFeeJPARepository.findOne(id);
		
		if (null == cfee || cfee.getIsActive() == (byte) 0) return;
		
		List<MSDStudentCompetition> scs = msdStudentCompetitionJPARepository.findByMsdCompetitionIdAndIsActive(cfee.getMsdCompetitionId(), (byte) 1);
		for (MSDStudentCompetition cs : scs) {
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(new Long(cs.getMsdStudentId()), cfee.getId(), MSDCompetitionFee.class.getSimpleName());
		}
	}
	
	private void addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(
			Long sid, Long id, String simpleName) {
		if (null == sid || null == id || null == simpleName) return;
		
		MSDStudentFee sfee = getOnlyOneActiveStudentFeeByStudentIdANdFeeObjectIdAndFeeObjectId(sid.intValue(), id.intValue(), simpleName);
		
		if (null == sfee) {
			MSDStudentFee nfee = new MSDStudentFee();
			nfee.setIsActive((byte) 1);
			nfee.setIsPaid((byte)0);
			nfee.setIsWaiver((byte)0);
			nfee.setMsdStudentFeeObjectId(id.intValue());
			nfee.setMsdStudentFeeObjectName(simpleName);
			nfee.setMsdStudentId(sid.intValue());
			msdStudentFeeJPARepository.save(nfee);
			msdOperationService.msdStudentOperation(sid, "Add " + simpleName +" Fee to Student Fee", nfee.toString(), null, "DATABASE");
		} else {
			String msg = simpleName + " already existed in student fee table.";
			msdOperationService.msdStudentOperation(sid, "Add Fee to Student Fee ", msg, "Student Fee: " + sfee.toString(), "ERROR");
		}
	}

	/*
	 * only return one active student fee by student id and object id
	 * 	or null if not found or more than
	 */
	private MSDStudentFee getOnlyOneActiveStudentFeeByStudentIdANdFeeObjectIdAndFeeObjectId(int msdStudentId, int objectFeeid, String objectFeeName) {
		List<MSDStudentFee> fees = msdStudentFeeJPARepository.findByMsdStudentIdAndMsdStudentFeeObjectIdAndMsdStudentFeeObjectNameAndIsActive
				(msdStudentId, objectFeeid, objectFeeName, (byte) 1);
		if (null != fees && fees.size() == 1) 
			return fees.get(0);
		
		return null;
	}
}
