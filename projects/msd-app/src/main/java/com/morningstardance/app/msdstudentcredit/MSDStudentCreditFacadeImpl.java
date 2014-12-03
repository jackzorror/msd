package com.morningstardance.app.msdstudentcredit;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentCredit;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentCreditJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdStudentCreditFacade")
public class MSDStudentCreditFacadeImpl implements MSDStudentCreditFacade {
	
	@Resource
	MSDStudentCreditJPARepository msdStudentCreditJPARepository;
	
	@Resource
	MSDStudentCreditAssembler msdStudentCreditAssembler;
	
	@Resource
	MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	MSDOperationService msdOperationService;

	@Override
	public List<MSDStudentCreditSummaryDto> getStudentCreditSummarysByStudentId(Long id) {
		if (null == id || id.intValue() == 0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(id);
		if (null == s) return null;
		
		List<MSDStudentCredit> sfees = msdStudentCreditJPARepository.findByMsdStudentIdAndIsActive(id.intValue(), (byte) 1);
		
		List<MSDStudentCreditSummaryDto> dtos = msdStudentCreditAssembler.createSummaryDtoFromEntity(sfees);
		
		return dtos;
	}

	@Override
	public MSDStudentCreditDto createStudentCredit(MSDStudentCreditDto dto) {
		if (null == dto) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(new Long(dto.getMsdStudentId()));
		if (null == s) return null;
		
		MSDStudentCredit entity = msdStudentCreditAssembler.createEntityFromDto(dto);
		
		entity = msdStudentCreditJPARepository.save(entity);
		
		msdOperationService.msdStudentOperation(new Long(entity.getMsdStudentId()), "Add Student Credit", entity.toString(), null, "DATABASE");

		return msdStudentCreditAssembler.createDtoFromEntity(entity);
	}

	@Override
	public MSDStudentCreditDto addStudentCredit(Long sid, String creditnote, Double credit) {
		if (null == sid || sid.intValue() == 0) return null;
		if (null == credit || credit.doubleValue() == 0.0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(sid);
		if (null == s) return null;
		
		MSDStudentCredit entity = new MSDStudentCredit();
		entity.setCredit(new BigDecimal(credit));
		entity.setCreditDate(new Date());
		entity.setMsdStudentId(s.getId().intValue());
		entity.setCreditNote(creditnote);
		entity.setIsActive((byte) 1);
		entity.setIsConsumed((byte) 0);
		
		entity = msdStudentCreditJPARepository.save(entity);
		
		msdOperationService.msdStudentOperation(sid, "Add Student Credit", entity.toString(), null, "DATABASE");

		return msdStudentCreditAssembler.createDtoFromEntity(entity);
	}

	@Override
	public MSDStudentCreditDto getStudentCreditDtoById(Long msdstudentcreditid) {
		if (null == msdstudentcreditid) return null;
		MSDStudentCredit scredit = msdStudentCreditJPARepository.findOne(msdstudentcreditid);
		if (null == scredit) return null;
		
		return msdStudentCreditAssembler.createDtoFromEntity(scredit);
	}

	@Override
	public String consumeStudentCredits(Long msdStudentId, String creditIdList, Date consumeTime, String consumeNote) {
		if (null == msdStudentId || msdStudentId.intValue() == 0) return null;
		
		if (null == creditIdList || creditIdList.length() == 0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(msdStudentId);
		if (null == s) return null;
		
		String[] idlist = creditIdList.split(",");
		for (String id : idlist) {
			if (null != id && !(id.isEmpty()))
				consumeStudentCreditByStudentIdAndCreditId(msdStudentId, new Long(id), consumeTime, consumeNote);
		}
		
		return "Success";
	}

	private String consumeStudentCreditByStudentIdAndCreditId(Long msdStudentId,
			Long id, Date consumeTime, String consumeNote) {
		if (null == msdStudentId || msdStudentId.intValue() == 0) return null;
		
		if (null == id || id.intValue() == 0) return null;
		
		MSDStudent s = msdStudentJPARepository.findOne(msdStudentId);
		if (null == s) return null;
		
		MSDStudentCredit credit = msdStudentCreditJPARepository.findOne(id);
		if (null == credit) return null;
		
		credit.setConsumedDate(consumeTime);
		credit.setConsumeNote(consumeNote);
		credit.setIsConsumed((byte) 1);
		
		msdStudentCreditJPARepository.saveAndFlush(credit);
		msdOperationService.msdStudentOperation(msdStudentId, "Consume Student Credit", credit.toString(), null, "DATABASE");

		return "Success";
		
	}

}
