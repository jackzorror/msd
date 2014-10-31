package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclassfee.MSDClassFeeDto;
import com.morningstardance.app.msdcompetition.MSDCompetitionFacade;
import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeDto;
import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdcompetitionfee")
public class MSDCompetitionFeeController {

	@Resource
	private MSDCompetitionFeeFacade msdCompetitionFeeFacade;
	
	@RequestMapping(value="/{msdcompetitionfeeid}", method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getCompetitionFeeByIdDfltVer(@PathVariable("msdcompetitionfeeid") Long msdcompetitionfeeid) {
		return getCompetitionFeeByIdVer1(msdcompetitionfeeid);
	}

	@RequestMapping(value="/{msdcompetitionfeeid}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getCompetitionFeeByIdVer1(@PathVariable("msdcompetitionfeeid") Long msdcompetitionfeeid) {
		MSDCompetitionFeeDto dto = msdCompetitionFeeFacade.getCompetitionFeeById(msdcompetitionfeeid);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}

	@RequestMapping(value="/{msdcompetitionfeeid}", method=RequestMethod.DELETE, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto deleteCompetitionFeeByIdDfltVer(@PathVariable("msdcompetitionfeeid") Long msdcompetitionfeeid) {
		return deleteCompetitionFeeByIdVer1(msdcompetitionfeeid);
	}

	@RequestMapping(value="/{msdcompetitionfeeid}", method=RequestMethod.DELETE, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto deleteCompetitionFeeByIdVer1(@PathVariable("msdcompetitionfeeid") Long msdcompetitionfeeid) {
		msdCompetitionFeeFacade.deleteCompetitionFeeById(msdcompetitionfeeid);
        ResponseDto responseDto = ResponseDto.createResponseDto(null, "DELETE", "OBJECT");
		return responseDto;
	}


	@RequestMapping(params={"msdcompetitionid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getCompetitionFeeByCompetitionIdDfltVer(Long msdcompetitionid) {
		return getCompetitionFeeByCompetitionIdVer1(msdcompetitionid);
	}

    @RequestMapping(params={"msdcompetitionid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getCompetitionFeeByCompetitionIdVer1(Long msdcompetitionid) {
		List<MSDCompetitionFeeDto> dtos = msdCompetitionFeeFacade.getCompetitionFeeByCompetitionId(msdcompetitionid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addCompetitionFeeDfltVer(@RequestBody MSDCompetitionFeeDto competitionFeeDto) {
    	return addCompetitionFeeVer1(competitionFeeDto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addCompetitionFeeVer1(@RequestBody MSDCompetitionFeeDto competitionFeeDto) {
    	MSDCompetitionFeeDto dto = msdCompetitionFeeFacade.createCompetitionFee(competitionFeeDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "PUT", "OBJECT");
		return responseDto;
	}

	
}
