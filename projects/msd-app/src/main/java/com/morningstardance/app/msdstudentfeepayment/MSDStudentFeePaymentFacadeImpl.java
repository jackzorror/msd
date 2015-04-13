package com.morningstardance.app.msdstudentfeepayment;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.morningstardance.app.misc.MSDMiscFacade;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentFee;
import com.morningstardance.domain.entity.MSDStudentFeePayment;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeePaymentJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdStudentFeePaymentFacade")
public class MSDStudentFeePaymentFacadeImpl implements
		MSDStudentFeePaymentFacade {
	
	@Resource
	MSDStudentFeePaymentJPARepository msdStudentFeePaymentJPARepository;
	
	@Resource
	MSDStudentFeeJPARepository msdStudentFeeJPARepository;
	
	@Resource
	MSDStudentFeePaymentAssembler msdStudentFeePaymentAssembler;

	@Resource
	private MSDMiscFacade msdMiscFacade;
	
	@Resource
	private MSDStudentJPARepository msdStudentJPARepository;
	
	@Override
	public List<MSDStudentFeePaymentDto> getStudentFeePaymentByStudentFeeId(
			Long studentfeeid) {
		if (null == studentfeeid || studentfeeid.intValue() == 0) return null;
		
		MSDStudentFee sf = msdStudentFeeJPARepository.findOne(studentfeeid);
		if (null == sf) return null;
		
		List<MSDStudentFeePayment> sfps = msdStudentFeePaymentJPARepository.findByMsdStudentFeeId(sf.getId().intValue());
		
		List<MSDStudentFeePaymentDto> dtos = msdStudentFeePaymentAssembler.createDtosFromEntities(sfps);
		
		return dtos;
	}

	@Override
	public MSDStudentFeePaymentDto addStudentFeePaymentByDto(
			MSDStudentFeePaymentDto dto) {
		if (null == dto) return null;
		
		MSDStudentFeePayment entity = msdStudentFeePaymentAssembler.createEntityFromDto(dto);
		
		if (null != entity)
			msdStudentFeePaymentJPARepository.saveAndFlush(entity);
		
		MSDStudentFeePaymentDto newDto = msdStudentFeePaymentAssembler.createDtoFromEntity(entity);
		
		return newDto;
	}

	@Override
	public void createStudentFeePaymentAfterUpdateStudentFeeForGeneralClassFee(
			MSDStudentFee sf) {

		if (null == sf) return;
		
		MSDStudentFeePayment fp = new MSDStudentFeePayment();
		fp.setFee(sf.getFee());
		fp.setPaymentDescription(sf.getFeeNote());
		fp.setMsdStudentFeeId(sf.getId().intValue());
		
		msdStudentFeePaymentJPARepository.saveAndFlush(fp);
	}

	@Override
	public List<MSDStudentFeePaymentDto> getStudentFeePaymentsByStudentIdAndSemesterId(
			Long studentid, Long semesterid) {
		if (null == studentid || studentid.intValue() == 0) return null;
		if (null == semesterid || semesterid.intValue() == 0)
			semesterid = new Long(msdMiscFacade.getCurrentSemester().getId());
		
		MSDStudent s = msdStudentJPARepository.findOne(studentid);
		if (null == s) return null;
		
		List<MSDStudentFee> sfees = msdStudentFeeJPARepository.findByMsdStudentIdAndSemesterAndIsActive(studentid.intValue(), semesterid.intValue(), (byte) 1);

		List<MSDStudentFeePayment> sfpayments = new ArrayList<MSDStudentFeePayment>();
		for(MSDStudentFee sfee : sfees) {
			sfpayments.addAll(msdStudentFeePaymentJPARepository.findByMsdStudentFeeIdOrderByPayTimeAsc(sfee.getId().intValue()));
		}
		
		List<MSDStudentFeePaymentDto> dtos = msdStudentFeePaymentAssembler.createDtosFromEntities(sfpayments);

		return dtos;
	}

	@Override
	public String updateStudentFeePayment(
			MSDStudentFeePaymentDto msdStudentFeePaymentDtos) {
		
		return "success";
	}

	@Override
	public String updateStudentFeePayment(String dtos) {
		ObjectMapper mapper = new ObjectMapper();
		DateFormat nf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
		mapper.setDateFormat(nf);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		
		try {
			List<MSDStudentFeePaymentDto> values = mapper.readValue(dtos, new TypeReference<List<MSDStudentFeePaymentDto>>(){});

			for (MSDStudentFeePaymentDto sfpdto : values) {
				MSDStudentFeePayment entity = null;
				if (sfpdto.getId() != 0)
					entity = msdStudentFeePaymentJPARepository.findOne(new Long(sfpdto.getId()));
				else 
					entity = new MSDStudentFeePayment();
				
				if (sfpdto.getFee() != 0.0f) 
					entity.setFee(new BigDecimal(sfpdto.getFee()));
				
				if (sfpdto.getPayFee() != 0.0f) 
					entity.setPayFee(new BigDecimal(sfpdto.getPayFee()));
				
				if (sfpdto.getMsdStudentFeeId() != 0) {
					entity.setMsdStudentFeeId(sfpdto.getMsdStudentFeeId());
				}

				if (sfpdto.getPayTime() != null) {
					entity.setPayTime(sfpdto.getPayTime());
				}
				
				entity.setMsdStudentFeeId(sfpdto.getMsdStudentFeeId());
				entity.setPayNote(sfpdto.getPayNote());
				entity.setPayType(sfpdto.getPayType());
				entity.setPaymentDescription(sfpdto.getPaymentDescription());
				
				msdStudentFeePaymentJPARepository.saveAndFlush(entity);
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "successfully";
	}

}
