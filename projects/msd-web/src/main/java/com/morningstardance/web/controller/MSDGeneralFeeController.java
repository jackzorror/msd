package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdgeneralfee.MSDGeneralFeeDto;
import com.morningstardance.app.msdgeneralfee.MSDGeneralFeeFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdgeneralfee")
public class MSDGeneralFeeController {
	
	@Resource
	private MSDGeneralFeeFacade msdGeneralFeeFacade;

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getAllGeneralFeeDfltVer() {
		return getAllGeneralFeeVer1();
	}

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getAllGeneralFeeVer1() {
		List<MSDGeneralFeeDto> dtos = msdGeneralFeeFacade.getAllGeneralFee();
        ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addGeneralFeeDfltVer(@RequestBody MSDGeneralFeeDto dto) {
    	return addGeneralFeeVer1(dto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addGeneralFeeVer1(@RequestBody MSDGeneralFeeDto dto) {
    	MSDGeneralFeeDto rdto = msdGeneralFeeFacade.createGeneralFee(dto);
		ResponseDto responseDto = ResponseDto.createResponseDto(rdto, "PUT", "OBJECT");
		return responseDto;
	}

    @RequestMapping(params={"generalfeeid", "feename"}, method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto updateGeneralFeeNameByIDAndNameDfltVer(Long generalfeeid, String feename) {
    	return updateGeneralFeeNameByIDAndNameVer1(generalfeeid, feename);
    }

    @RequestMapping(params={"generalfeeid", "feename"}, method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto updateGeneralFeeNameByIDAndNameVer1(Long generalfeeid, String feename) {
		String newDto = msdGeneralFeeFacade.updateGeneralFeeNameByID(generalfeeid, feename);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto; 
	}

}
