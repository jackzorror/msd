package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

}