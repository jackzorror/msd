package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentfee.MSDStudentFeeDetailDto;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeDto;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeFacade;
import com.morningstardance.app.msdstudentfee.MSDStudentFeePayDto;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeSummaryDto;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudentfee")
public class MSDStudentFeeController {
	
	@Resource
	private MSDStudentFeeFacade msdStudentFeeFacade;

	@RequestMapping(value="/{msdstudentfeeid}", method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getStudentFeeByIdDfltVer(@PathVariable("msdstudentfeeid") Long msdstudentfeeid) {
		return getStudentFeeByIdVer1(msdstudentfeeid);
	}

	@RequestMapping(value="/{msdstudentfeeid}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getStudentFeeByIdVer1(@PathVariable("msdstudentfeeid") Long msdstudentfeeid) {
		MSDStudentFeeDto dto = msdStudentFeeFacade.getStudentFeeDtoById(msdstudentfeeid);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
	
	@RequestMapping(value="/{msdstudentfeeid}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getStudentFeeDetailByIdDfltVer(@PathVariable("msdstudentfeeid") Long msdstudentfeeid, String type) {
		return getStudentFeeDetailByIdVer1(msdstudentfeeid, type);
	}

	@RequestMapping(value="/{msdstudentfeeid}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getStudentFeeDetailByIdVer1(@PathVariable("msdstudentfeeid") Long msdstudentfeeid, String type) {
		ResponseDto responseDto = null;
		
		if ("DETAIL".equals(type)) {
			MSDStudentFeeDetailDto dto = msdStudentFeeFacade.getStudentFeeDetailDtoById(msdstudentfeeid);
			responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		}
		
		return responseDto;
	}
	
	@RequestMapping(params={"id", "type"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getMSDStudentFeeByIdAndTypeDfltVer(Long id, String type) {
		return getMSDStudentFeeByIdAndTypeVer1(id, type);
	}

	@RequestMapping(params={"id", "type"},method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getMSDStudentFeeByIdAndTypeVer1(Long id, String type) {
		ResponseDto responseDto = null;
		if ("ByStudentId".equals(type)) {
			List<MSDStudentFeeSummaryDto> dtos = msdStudentFeeFacade.getStudentFeeSummarysByStudentId(id);
	        responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		} 
		
		return responseDto;
	}

    @RequestMapping(params={"msdstudentid", "feeid", "feenote", "type"}, method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addFeeToStudentFeeByStudentIdAndFeeIdListAndTypeDfltVer(Long msdstudentid, Long feeid, String feenote, String type) {
    	return addFeeToStudentFeeByStudentIdAndFeeIdListAndTypeVer1(msdstudentid, feeid, feenote, type);
    }

    @RequestMapping(params={"msdstudentid", "feeid", "feenote", "type"}, method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto addFeeToStudentFeeByStudentIdAndFeeIdListAndTypeVer1(Long msdstudentid, Long feeid, String feenote, String type) {
		String newDto = msdStudentFeeFacade.addFeeToStudentFeeByStudentIdAndFeeIdListAndType(msdstudentid, feeid, feenote, type);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto; 
	}

	@RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto payStudentFeeByStudentFeePayDtoDfltVer(@RequestBody MSDStudentFeePayDto msdStudentFeePayDto) {
    	return payStudentFeeByStudentFeePayDtoVer1(msdStudentFeePayDto);
    }

    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto payStudentFeeByStudentFeePayDtoVer1(@RequestBody MSDStudentFeePayDto msdStudentFeePayDto) {
		String newDto = msdStudentFeeFacade.payStudentFeesByStudentPayDto(msdStudentFeePayDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
}
