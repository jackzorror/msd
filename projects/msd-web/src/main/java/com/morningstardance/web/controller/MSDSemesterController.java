package com.morningstardance.web.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.misc.MSDMiscFacade;
import com.morningstardance.app.misc.MSDSemesterDto;
import com.morningstardance.web.MSDSemesterObject;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdsemester")
public class MSDSemesterController {

	@Resource
	private MSDMiscFacade msdMiscFacade;

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getAllMSDSemesterDfltVer() {
		return getAllMSDSemesterVer1();
	}
	
	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	private ResponseDto getAllMSDSemesterVer1() {
		List<MSDSemesterDto> dtos = msdMiscFacade.getSemester();
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}

	@RequestMapping(value={"/CURRENT_SEMESTER"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getCurrentSemesterDfltVer() {
		return getCurrentSemesterVer1();
	}

    @RequestMapping(value={"/CURRENT_SEMESTER"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getCurrentSemesterVer1() {
    	ResponseDto responseDto = null;
		MSDSemesterDto dto = msdMiscFacade.getCurrentSemester();
		responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}

    @RequestMapping(params={"name", "startDate"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addSemesterDfltVer(String name, Date startDate) {
    	return addSemesterVer1(name, startDate);
    }

    @RequestMapping(params={"name", "startDate"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addSemesterVer1(String name, Date startDate) {
    	MSDSemesterDto dto = new MSDSemesterDto(0, name, startDate);
    	dto = msdMiscFacade.addSemester(dto);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "PUT", "OBJECT");
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addSemesterDfltVer(@RequestBody MSDSemesterObject semesterDto) {
    	return addSemesterVer1(semesterDto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addSemesterVer1(@RequestBody MSDSemesterObject semesterDto) {
    	MSDSemesterDto dto = msdMiscFacade.addSemester(new MSDSemesterDto(semesterDto.getId(), semesterDto.getSemesterName(), semesterDto.getStartDate()));
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "PUT", "OBJECT");
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto updateSemesterDfltVer(@RequestBody MSDSemesterObject semesterDto) {
		return updateSemesterVer1(semesterDto);
    }

    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto updateSemesterVer1(MSDSemesterObject semesterDto) {
    	MSDSemesterDto newDto = msdMiscFacade.updateSemester(new MSDSemesterDto(semesterDto.getId(), semesterDto.getSemesterName(), semesterDto.getStartDate()));
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
}
