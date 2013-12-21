package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclassschedular.MSDClassSchedularDto;
import com.morningstardance.app.msdclassschedular.MSDClassSchedularFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/msdclassschedular")
public class MSDClassSchedularController {
	
	@Resource(name="msdClassSchedularFacade")
	private MSDClassSchedularFacade msdClassSchedularFacade;

	@RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getClassSchedularByClassIdDfltVer(Long msdclassid) {
		return getClassSchedularByClassIdVer1(msdclassid);
	}

    @RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getClassSchedularByClassIdVer1(Long msdclassid) {
		List<MSDClassSchedularDto> dtos = msdClassSchedularFacade.getClassSchedularByClassId(msdclassid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}
    
}
