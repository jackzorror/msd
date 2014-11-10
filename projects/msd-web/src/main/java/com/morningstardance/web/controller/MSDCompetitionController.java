package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclass.MSDClassDetailDto;
import com.morningstardance.app.msdclass.MSDClassSummaryDto;
import com.morningstardance.app.msdcompetition.MSDCompetitionDetailDto;
import com.morningstardance.app.msdcompetition.MSDCompetitionDto;
import com.morningstardance.app.msdcompetition.MSDCompetitionFacade;
import com.morningstardance.app.msdcompetitionfee.MSDCompetitionSummaryDto;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdcompetition")
public class MSDCompetitionController {
	
	@Resource
	private MSDCompetitionFacade msdCOmpetitionFacade;

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getAllMSDCompetitionDfltVer() {
		return getAllMSDCompetitionVer1();
	}
	
	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	private ResponseDto getAllMSDCompetitionVer1() {
		List<MSDCompetitionDto> dtos = msdCOmpetitionFacade.getAllMSDCompetition();
        ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}

	@RequestMapping(value="/{msdCompetitionId}", method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getMSDCompetitionByIdDfltVer(@PathVariable("msdCompetitionId") Long msdCompetitionId) {
		return getMSDCompetitionByIdVer1(msdCompetitionId);
	}

	@RequestMapping(value="/{msdCompetitionId}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getMSDCompetitionByIdVer1(@PathVariable("msdClassId") Long msdCompetitionId) {
		MSDCompetitionDto dto = msdCOmpetitionFacade.getMSDCompetitionById(msdCompetitionId);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}

	@RequestMapping(value="/{msdCompetitionId}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getMSDCompetitionByIdAndTypeDfltVer(@PathVariable("msdCompetitionId") Long msdCompetitionId, String type) {
		return getMSDCompetitionByIdAndTypeVer1(msdCompetitionId, type);
	}

	@RequestMapping(value="/{msdCompetitionId}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getMSDCompetitionByIdAndTypeVer1(@PathVariable("msdCompetitionId") Long msdCompetitionId, String type) {
		ResponseDto responseDto = null;
		if ("SUMMARY".equals(type)) {
			MSDCompetitionSummaryDto dto = msdCOmpetitionFacade.getMSDCompetitionSummaryDtoById(msdCompetitionId);
	        responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		} else if ("DETAIL".equals(type)) {
			MSDCompetitionDetailDto dto = msdCOmpetitionFacade.getMSDCompetitionDetailDtoById(msdCompetitionId);
	        responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		} else {
			responseDto = ResponseDto.createResponseDto(null, "GET", "OBJECT");
		}
		
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addCompetitionDfltVer(@RequestBody MSDCompetitionDto msdcompetitiondto) {
    	return addCompetitionVer1(msdcompetitiondto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addCompetitionVer1(@RequestBody MSDCompetitionDto msdcompetitiondto) {
    	MSDCompetitionDto addedDto = msdCOmpetitionFacade.addCompetition(msdcompetitiondto);
		ResponseDto responseDto = ResponseDto.createResponseDto(addedDto, "PUT", "OBJECT");
		return responseDto;
	}
    
	@RequestMapping(value="/{msdCompetitionId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto deleteCompetitionByIdDfltVer(@PathVariable("msdCompetitionId") Long msdCompetitionId) {
		return deleteCompetitionByIdVer1(msdCompetitionId);
	}

	@RequestMapping(value="/{msdCompetitionId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto deleteCompetitionByIdVer1(@PathVariable("msdCompetitionId") Long msdCompetitionId) {
		msdCOmpetitionFacade.disableCompetitionById(msdCompetitionId);
        ResponseDto responseDto = ResponseDto.createResponseDto(null, "DELETE", "OBJECT");
		return responseDto;
	}

}
