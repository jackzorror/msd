package com.morningstardance.web.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentcredit.MSDStudentCreditDto;
import com.morningstardance.app.msdstudentcredit.MSDStudentCreditFacade;
import com.morningstardance.app.msdstudentcredit.MSDStudentCreditSummaryDto;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudentcredit")
public class MSDStudentCreditController {
	
	@Resource
	MSDStudentCreditFacade msdStudentCreditFacade;

	@RequestMapping(value="/{msdstudentcreditid}", method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getStudentCreditDetailByIdDfltVer(@PathVariable("msdstudentcreditid") Long msdstudentcreditid) {
		return getStudentCreditDetailByIdVer1(msdstudentcreditid);
	}

	@RequestMapping(value="/{msdstudentcreditid}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getStudentCreditDetailByIdVer1(@PathVariable("msdstudentcreditid") Long msdstudentcreditid) {
		
		MSDStudentCreditDto dto = msdStudentCreditFacade.getStudentCreditDtoById(msdstudentcreditid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
	
		return responseDto;
	}
	
	@RequestMapping(params={"id", "type"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getMSDStudentCreditByIdAndTypeDfltVer(Long id, String type) {
		return getMSDStudentCreditByIdAndTypeVer1(id, type);
	}

	@RequestMapping(params={"id", "type"},method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getMSDStudentCreditByIdAndTypeVer1(Long id, String type) {
		ResponseDto responseDto = null;
		if ("ByStudentId".equals(type)) {
			List<MSDStudentCreditSummaryDto> dtos = msdStudentCreditFacade.getStudentCreditSummarysByStudentId(id);
	        responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		} 
		
		return responseDto;
	}

    @RequestMapping(params={"msdstudentid", "creditnote", "credit"}, method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addStudentCreditDfltVer(Long msdstudentid,String creditnote,Double credit) {
    	return addStudentCrediteVer1(msdstudentid, creditnote, credit);
    }

    @RequestMapping(params={"msdstudentid", "creditnote", "credit"}, method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addStudentCrediteVer1(Long msdstudentid,String creditnote,Double credit) {
    	MSDStudentCreditDto dto = msdStudentCreditFacade.addStudentCredit(new Long(msdstudentid), creditnote, new Double(credit));
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "POST", "OBJECT");
		return responseDto;
	}

    @RequestMapping(params={"msdStudentId", "creditIdList", "consumeTime", "consumeNote"}, method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto consumeStudentCreditsDfltVer(Long msdStudentId,String creditIdList, Date consumeTime, String consumeNote) {
    	return consumeStudentCreditsVer1(msdStudentId, creditIdList, consumeTime, consumeNote);
    }

    @RequestMapping(params={"msdStudentId", "creditIdList", "consumeTime", "consumeNote"}, method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto consumeStudentCreditsVer1(Long msdStudentId,String creditIdList, Date consumeTime, String consumeNote) {
    	String result = msdStudentCreditFacade.consumeStudentCredits(msdStudentId, creditIdList, consumeTime, consumeNote);
		ResponseDto responseDto = ResponseDto.createResponseDto(result, "POST", "OBJECT");
		return responseDto;
	}
}
