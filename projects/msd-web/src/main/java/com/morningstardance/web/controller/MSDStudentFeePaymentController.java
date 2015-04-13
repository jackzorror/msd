package com.morningstardance.web.controller;

import java.util.LinkedHashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentfee.MSDStudentFeePayDto;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeSummaryDto;
import com.morningstardance.app.msdstudentfeepayment.MSDStudentFeePaymentDto;
import com.morningstardance.app.msdstudentfeepayment.MSDStudentFeePaymentFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudentfeepayment")
public class MSDStudentFeePaymentController {

	@Resource
	private MSDStudentFeePaymentFacade msdStudentFeePaymentFacade;

	@RequestMapping(params={"studentfeeid"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getMSDStudentFeePaymentByStudentFeeIdDfltVer(Long studentfeeid) {
		return getMSDStudentFeePaymentByStudentFeeIdVer1(studentfeeid);
	}

	@RequestMapping(params={"studentfeeid"},method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getMSDStudentFeePaymentByStudentFeeIdVer1(Long studentfeeid) {
		ResponseDto responseDto = null;
		List<MSDStudentFeePaymentDto> dtos = msdStudentFeePaymentFacade.getStudentFeePaymentByStudentFeeId(studentfeeid);
        responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		
		return responseDto;
	}
	
	@RequestMapping(params={"studentid", "semesterid"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getMSDStudentFeePaymentByStudentIdAndSemesterIdDfltVer(Long studentid, Long semesterid) {
		return getMSDStudentFeePaymentByStudentIdAndSemesterIdVer1(studentid, semesterid);
	}

	@RequestMapping(params={"studentid", "semesterid"},method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getMSDStudentFeePaymentByStudentIdAndSemesterIdVer1(Long studentid, Long semesterid) {
		ResponseDto responseDto = null;
		List<MSDStudentFeePaymentDto> dtos = msdStudentFeePaymentFacade.getStudentFeePaymentsByStudentIdAndSemesterId(studentid, semesterid);
        responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		
		return responseDto;
	}

	@RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addStudentFeePaymentByDtoDfltVer(@RequestBody MSDStudentFeePaymentDto msdStudentFeePaymentDto) {
    	return addStudentFeePaymentByDtoVer1(msdStudentFeePaymentDto);
    }

    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto addStudentFeePaymentByDtoVer1(@RequestBody MSDStudentFeePaymentDto msdStudentFeePaymentDto) {
    	MSDStudentFeePaymentDto newDto = msdStudentFeePaymentFacade.addStudentFeePaymentByDto(msdStudentFeePaymentDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto updateStudentFeePaymentByDtoDfltVer(@RequestBody String dtos) {
    	return updateStudentFeePaymentByDtoVer1(dtos);
    }

	@RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto updateStudentFeePaymentByDtoVer1(@RequestBody String dtos) {
    	String msg = msdStudentFeePaymentFacade.updateStudentFeePayment(dtos);
		ResponseDto responseDto = ResponseDto.createResponseDto(msg, "PUT", "OBJECT");
		return responseDto;
	}
}
