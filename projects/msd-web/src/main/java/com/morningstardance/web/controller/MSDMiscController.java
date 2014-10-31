package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.misc.MSDCompetitionTypeDto;
import com.morningstardance.app.misc.MSDCostTypeDto;
import com.morningstardance.app.misc.MSDMiscFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdmisc")
public class MSDMiscController {
	
	@Resource
	private MSDMiscFacade msdMiscFacade;

	@RequestMapping(params={"miscname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getMiscByNameDfltVer(String miscname) {
		return getMiscByNameVer1(miscname);
	}

    @RequestMapping(params={"miscname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getMiscByNameVer1(String miscname) {
    	ResponseDto responseDto = null;
    	if (null == miscname || miscname.isEmpty())
    		responseDto = null;
    	else if (miscname.equals("COST_TYPE")) {
    		List<MSDCostTypeDto> dtos = msdMiscFacade.getCostType();
    		responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    	} else if (miscname.equals("COMPETITION_TYPE")) {
    		List<MSDCompetitionTypeDto> dtos = msdMiscFacade.getCompetitionType();
    		responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    	}
		return responseDto;
	}

}
