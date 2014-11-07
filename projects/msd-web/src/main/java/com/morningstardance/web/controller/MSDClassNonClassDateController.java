package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclassnonclassdate.MSDClassNonClassDateFacade;
import com.morningstardance.domain.entity.MSDClassNonClassDate;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdclassnonclassdate")
public class MSDClassNonClassDateController {

	@Resource
	private MSDClassNonClassDateFacade msdClssNonClassDateFacade;
	
	@RequestMapping(value="/{msdClassNonClassDateId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto deleteClassNonClassDateByIdDfltVer(@PathVariable("msdClassNonClassDateId") Long msdClassNonClassDateId) {
		return deleteClassNonClassDateByIdVer1(msdClassNonClassDateId);
	}

	@RequestMapping(value="/{msdClassNonClassDateId}", method=RequestMethod.DELETE, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto deleteClassNonClassDateByIdVer1(@PathVariable("msdClassNonClassDateId") Long msdClassNonClassDateId) {
		msdClssNonClassDateFacade.deleteClassNonClassDateById(msdClassNonClassDateId);
        ResponseDto responseDto = ResponseDto.createResponseDto(null, "DELETE", "OBJECT");
		return responseDto;
	}

	@RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getClassNonClassDateByClassIdDfltVer(Long msdclassid) {
		return getClassNonClassDateByClassIdVer1(msdclassid);
	}

    @RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getClassNonClassDateByClassIdVer1(Long msdclassid) {
		List<MSDClassNonClassDate> dtos = msdClssNonClassDateFacade.getClassNonClassDateByClassId(msdclassid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addClassNonClassDateDfltVer(@RequestBody MSDClassNonClassDate date) {
    	return addClassNonClassDateVer1(date);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addClassNonClassDateVer1(@RequestBody MSDClassNonClassDate date) {
    	MSDClassNonClassDate msdCNCD = msdClssNonClassDateFacade.addClassNonClassDate(date);
		ResponseDto responseDto = ResponseDto.createResponseDto(msdCNCD, "PUT", "OBJECT");
		return responseDto;
	}

}
