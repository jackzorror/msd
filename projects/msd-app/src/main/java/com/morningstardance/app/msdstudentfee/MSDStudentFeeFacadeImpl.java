package com.morningstardance.app.msdstudentfee;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.app.msdstudentcredit.MSDStudentCreditFacade;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDGeneralFee;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.entity.MSDStudentCompetition;
import com.morningstardance.domain.entity.MSDStudentFee;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

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
	
	@Resource
	private MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	private MSDStudentFeeAssembler msdStudentFeeAssembler;
	
	@Resource
	private MSDStudentCreditFacade msdStudentCreditFacade;
	
	/**
	 * when user register student to class, the system will add all
	 * the active class fee to this student fee table
	 * 
	 * 2015/01/06 remove class fee from system, this function will not be used
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
			
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(sid, cfee.getId(), MSDClassFee.class.getSimpleName(), null, cfee.getCost().doubleValue());
		}
	}

	/**
	 * when user un register student from class, the system will de active all
	 * the student fee which link to un register class' class fees
	 * 
	 * 2015/01/06 remove class fee from system, this function will not be used
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

//				throw new RuntimeException();
			}
		}
	}
	
	/**
	 * when user delete class fee under class UI, the system will
	 * de active this class fee in all active student fee table with same
	 * class fee id
	 * 
	 * 2015/01/06 remove class fee from system, this function will not be used
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
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(sid, cfee.getId(), MSDCompetitionFee.class.getSimpleName(), null, cfee.getCost().doubleValue());
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

//				throw new RuntimeException();
				
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
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(new Long(cs.getMsdStudentId()), cfee.getId(), MSDClassFee.class.getSimpleName(), null, cfee.getCost().doubleValue());
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
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(new Long(cs.getMsdStudentId()), cfee.getId(), MSDCompetitionFee.class.getSimpleName(), null, cfee.getCost().doubleValue());
		}
	}
	
	private void addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(
			Long sid, Long id, String simpleName, String feeNote, double fee) {
		if (null == sid || null == id || null == simpleName) return;
		
		MSDStudentFee sfee = getOnlyOneActiveStudentFeeByStudentIdANdFeeObjectIdAndFeeObjectId(sid.intValue(), id.intValue(), simpleName);
		
		// We allow multiple MSDGeneralFee 
		if (null == sfee || simpleName.equals(MSDGeneralFee.class.getSimpleName())) {
			MSDStudentFee nfee = new MSDStudentFee();
			nfee.setIsActive((byte) 1);
			nfee.setIsPaid((byte)0);
			nfee.setIsWaiver((byte)0);
			nfee.setMsdStudentFeeObjectId(id.intValue());
			nfee.setMsdStudentFeeObjectName(simpleName);
			nfee.setMsdStudentId(sid.intValue());
			nfee.setFeeNote(feeNote);
			nfee.setFee(new BigDecimal(fee));
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

	@Override
	public List<MSDStudentFeeSummaryDto> getStudentFeeSummarysByStudentId(Long id) {
		if (null == id || id.intValue() == 0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(id);
		if (null == s) return null;
		
		List<MSDStudentFee> sfees = msdStudentFeeJPARepository.findByMsdStudentIdAndIsActive(id.intValue(), (byte) 1);
		
		List<MSDStudentFeeSummaryDto> dtos = msdStudentFeeAssembler.createSummaryDtoFromEntity(sfees);
		
		return dtos;
	}

	@Override
	public MSDStudentFeeDetailDto getStudentFeeDetailDtoById(Long msdstudentfeeid) {
		if (null == msdstudentfeeid || msdstudentfeeid.intValue() == 0) return null;
		
		MSDStudentFee sfee = msdStudentFeeJPARepository.findOne(msdstudentfeeid);
		if (null == sfee) return null;
		
		MSDStudentFeeDetailDto dto = msdStudentFeeAssembler.createDetailDtoFromEntity(sfee);
		
		return dto;
	}

	@Override
	public MSDStudentFeeDto getStudentFeeDtoById(Long msdstudentfeeid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String payStudentFeesByStudentIdAndFeeInfo(Long msdstudentid,
			String feeidlist, double totalfee, String paytype,
			Date paytime, String paynote) {

		if (null == msdstudentid || msdstudentid.intValue() == 0) return null;
		
		if (null == feeidlist || feeidlist.length() == 0) return null;
		
		if (totalfee == 0.0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(msdstudentid);
		if (null == s) return null;
		
		String[] idlist = feeidlist.split(",");
		for (String id : idlist) {
			if (null != id && !(id.isEmpty()))
				payStudentFeeByStudentIdAndFeeId(msdstudentid, new Long(id), paytype, paytime, paynote);
		}
		
		return "Success";
	}

	private void payStudentFeeByStudentIdAndFeeId(Long msdstudentid,
			Long feeid, String paytype, Date paytime, String paynote) {
		if (null == msdstudentid || msdstudentid.intValue() == 0) return;
		
		if (null == feeid || feeid.intValue() == 0) return;
		
		MSDStudentFee sfee = msdStudentFeeJPARepository.findOne(feeid);
		
		if (null == sfee || sfee.getIsActive() == (byte) 0) return;
		
		if (null != paytype && paytype.equals("WAIVESTUDENTFEE")) {
			sfee.setIsWaiver((byte) 1);
		} else {
			sfee.setIsPaid((byte) 1);
			sfee.setPayType(paytype);
		}
		sfee.setPayNote(paynote);
		sfee.setPayTime(paytime);
		msdStudentFeeJPARepository.saveAndFlush(sfee);
		
		msdOperationService.msdStudentOperation(msdstudentid, "Paid Student Fee", sfee.toString(), null, "DATABASE");
	}

	@Override
	public String payStudentFeesByStudentPayDto(
			MSDStudentFeePayDto dto) {
		if (null == dto) return null;
		
		msdStudentCreditFacade.consumeStudentCredits(new Long(dto.getMsdStudentId()), dto.getCreditIdList(), dto.getPayTime(), dto.getPayNote());
		
		return payStudentFeesByStudentIdAndFeeInfo(new Long(dto.getMsdStudentId()), dto.getFeeIdList(), dto.getTotalFee(),
				dto.getPayType(), dto.getPayTime(), dto.getPayNote());
	}

	private void addFeeToStudentFeeByStudentIdAndFeeIdAndType(Long sid, Long fid, String type, String note, double fee) {
		if (null == sid || sid.intValue() == 0) return;
		if (null == fid || fid.intValue() == 0) return;
		if (null == type || type.isEmpty()) return;
		
		if (type.equals("GENERALFEE")) {
			addFeeToStudentFeeByStudentIdAndObjectFeeIdAndObjectFeeName(sid, fid, MSDGeneralFee.class.getSimpleName(), note, fee);
		}
		
	}

	@Override
	public String addFeeToStudentFeeByStudentIdAndFeeIdListAndType(Long msdstudentid, Long feeid, String feenote, String type, double fee) {
		if (null == msdstudentid || msdstudentid.intValue() == 0) return null;
		
		if (null == feeid || feeid.intValue() == 0) return null;
		
		if (null == type || type.isEmpty()) return null;

		MSDStudent s = msdStudentJPARepository.findOne(msdstudentid);
		
		if (s == null || s.getIsActive() == (byte) 0) return null;

		addFeeToStudentFeeByStudentIdAndFeeIdAndType(msdstudentid, feeid, type, feenote, fee);
		
		return "Success";
	}
}
