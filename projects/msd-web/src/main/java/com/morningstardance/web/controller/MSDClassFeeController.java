package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclassfee.MSDClassFeeDto;
import com.morningstardance.app.msdclassfee.MSDClassFeeFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdclassfee")
public class MSDClassFeeController {

	@Resource(name="msdClassFeeFacade")
	private MSDClassFeeFacade msdClassFeeFacade;

	@RequestMapping(value="/{msdclassfeeid}", method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getClassFeeByIdDfltVer(@PathVariable("msdclassfeeid") Long msdclassfeeid) {
		return getClassFeeByIdVer1(msdclassfeeid);
	}

	@RequestMapping(value="/{msdclassfeeid}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getClassFeeByIdVer1(@PathVariable("msdclassfeeid") Long msdclassfeeid) {
		MSDClassFeeDto dto = msdClassFeeFacade.getClassFeeById(msdclassfeeid);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}

	@RequestMapping(value="/{msdClassFeeId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto deleteClassFeeByIdDfltVer(@PathVariable("msdClassFeeId") Long msdClassFeeId) {
		return deleteClassFeeByIdVer1(msdClassFeeId);
	}

	@RequestMapping(value="/{msdClassFeeId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto deleteClassFeeByIdVer1(@PathVariable("msdClassFeeId") Long msdClassFeeId) {
		msdClassFeeFacade.deleteClassFeeById(msdClassFeeId);
        ResponseDto responseDto = ResponseDto.createResponseDto(null, "DELETE", "OBJECT");
		return responseDto;
	}


	@RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getClassFeeByClassIdDfltVer(Long msdclassid) {
		return getClassFeeByClassIdVer1(msdclassid);
	}

    @RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getClassFeeByClassIdVer1(Long msdclassid) {
		List<MSDClassFeeDto> dtos = msdClassFeeFacade.getClassFeeByClassId(msdclassid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}

    @RequestMapping(params={"id", "msdclassid","name", "msdcosttypeid", "cost"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addClassFeeDfltVer(
    		@RequestParam("id") Long id, 
    		@RequestParam("msdclassid") Long msdclassid, 
    		@RequestParam("name")String name, 
    		@RequestParam("msdcosttypeid")Long msdcosttypeid, 
    		@RequestParam("cost")Long cost) {
    	return addClassFeeVer1(id, msdclassid, name, msdcosttypeid, cost);
    }

    @RequestMapping(params={"id", "msdclassid","name", "msdcosttypeid", "cost"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addClassFeeVer1(
    		@RequestParam("id") Long id, 
    		@RequestParam("msdclassid") Long msdclassid, 
    		@RequestParam("name")String name, 
    		@RequestParam("msdcosttypeid")Long msdcosttypeid, 
    		@RequestParam("cost")Long cost) {
    	msdClassFeeFacade.addClassFee(id, msdclassid, name, msdcosttypeid, cost.floatValue());
		ResponseDto responseDto = ResponseDto.createResponseDto("Add Successfully", "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addClassFeeDfltVer(@RequestBody MSDClassFeeDto classFeeDto) {
    	return addClassFeeVer1(classFeeDto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addClassFeeVer1(@RequestBody MSDClassFeeDto classFeeDto) {
    	msdClassFeeFacade.addClassFee(new Long(classFeeDto.getId()), 
    			new Long(classFeeDto.getMsdClassId()), 
    			classFeeDto.getFeeName(), 
    			new Long(classFeeDto.getMsdCostTypeId()), 
    			classFeeDto.getCost(),
    			classFeeDto.getOneTimePay(),
    			classFeeDto.getMonthlyPay(),
    			classFeeDto.getWeeklyPay(),
    			classFeeDto.getDailyPay());
		ResponseDto responseDto = ResponseDto.createResponseDto("Create Successfully", "PUT", "OBJECT");
		return responseDto;
	}

}
