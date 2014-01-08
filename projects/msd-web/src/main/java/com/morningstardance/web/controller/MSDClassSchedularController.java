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

import com.morningstardance.app.msdclass.MSDClassSummaryDto;
import com.morningstardance.app.msdclassschedular.MSDClassSchedularDto;
import com.morningstardance.app.msdclassschedular.MSDClassSchedularDtos;
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

		@RequestMapping(value="/{msdClassSchedularId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version")
		public @ResponseBody ResponseDto deleteClassSchedularByIdDfltVer(@PathVariable("msdClassSchedularId") Long msdClassSchedularId) {
			return deleteClassSchedularByIdVer1(msdClassSchedularId);
		}
	
		@RequestMapping(value="/{msdClassSchedularId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version=1.0")
		public @ResponseBody ResponseDto deleteClassSchedularByIdVer1(@PathVariable("msdClassSchedularId") Long msdClassSchedularId) {
			msdClassSchedularFacade.deleteClasSchedularById(msdClassSchedularId);
	        ResponseDto responseDto = ResponseDto.createResponseDto("Delete Successfully", "DELETE", "OBJECT");
			return responseDto;
		}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addClassSchedularDfltVer(@RequestBody MSDClassSchedularDtos classSchedularDtos) {
    	return addClassSchedularVer1(classSchedularDtos);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addClassSchedularVer1(@RequestBody MSDClassSchedularDtos classSchedularDtos) {
		msdClassSchedularFacade.addClassSchedularList(classSchedularDtos);
		ResponseDto responseDto = ResponseDto.createResponseDto("Create Successfully", "PUT", "OBJECT");
		return responseDto;
	}

    @RequestMapping(params={"id", "msdClassId","startTime", "endTime", "weekdays"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addClassSchedularDfltVer(
    		@RequestParam("id") Long id, 
    		@RequestParam("msdClassId") Long msdClassId, 
    		@RequestParam("startTime")String startTime, 
    		@RequestParam("endTime")String endTime, 
    		@RequestParam("weekdays")String weekdays) {
    	return addClassSchedularVer1(id, msdClassId, startTime, endTime, weekdays);
    }

    @RequestMapping(params={"msdclassid","startTime", "endTime", "weekday"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addClassSchedularVer1(@RequestParam("id") Long id, @RequestParam("msdClassId") Long msdClassId, @RequestParam("startTime")String startTime, @RequestParam("endTime")String endTime, @RequestParam("weekdays")String weekdays) {
		msdClassSchedularFacade.addClassSchedularList(id.intValue(), msdClassId.intValue(), startTime, endTime, weekdays);
		ResponseDto responseDto = ResponseDto.createResponseDto("Add Successfully", "POST", "OBJECT");
		return responseDto;
	}

    
}
