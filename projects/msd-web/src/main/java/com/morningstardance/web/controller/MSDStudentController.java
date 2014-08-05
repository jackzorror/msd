package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclass.MSDClassSummaryDto;
import com.morningstardance.app.msdstudent.MSDStudentClassDto;
import com.morningstardance.app.msdstudent.MSDStudentDetailDto;
import com.morningstardance.app.msdstudent.MSDStudentDto;
import com.morningstardance.app.msdstudent.MSDStudentFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudent")
public class MSDStudentController {
	
	@Resource(name="msdStudentFacade")
	protected MSDStudentFacade msdStudentFacade;
	

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody ResponseDto getAllMSDStudentDfltVer() {
		return getAllMSDStudentVer1();
	}

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody ResponseDto getAllMSDStudentVer1() {
		List<MSDStudentDto> dtos = msdStudentFacade.getAllStudents();
    	ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    	return responseDto;
	}
	
	@RequestMapping(params={"firstname","lastname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentByNameDfltVer(String firstname, String lastname, HttpServletResponse response) {
		return getStudentByNameVer1(firstname, lastname, response);
	}

	@RequestMapping(params={"firstname","lastname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto getStudentByNameVer1(String firstname,String lastname, HttpServletResponse response) {
		MSDStudentDetailDto dto = msdStudentFacade.getStudentDetailDtoByName(firstname, lastname);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
/*
	@RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getAllStudentsByClassIdForCheckinDfltVer(@RequestParam("msdclassid") Long msdClassId) {
    	return getAllStudentsByClassIdForCheckinVer1(msdClassId);
    }

    @RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getAllStudentsByClassIdForCheckinVer1(Long msdClassId) {
    	List<MSDStudentDto> dtos = msdStudentFacade.getAllStudentsByClassIdForCheckin(msdClassId);
    	ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    	return responseDto;
	}
*/


	@RequestMapping(params={"type=summary"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getAllStudentsSummaryDfltVer() {
    	return getAllStudentsSummaryVer1();
    }

    @RequestMapping(params={"type=summary"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getAllStudentsSummaryVer1() {
    	List<MSDStudentDto> dtos = msdStudentFacade.getAllStudents();
    	ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    	return responseDto;
	}
/*
    @RequestMapping(params={"type=registerclass", "msdstudentid", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentRegisteredClassByStudentIdDfltVer(Long msdstudentid, Long msdclassid) {
		return getStudentRegisteredClassByStudentIdVer1(msdstudentid, msdclassid);
	}

    @RequestMapping(params={"type=registerclass", "msdstudentid", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentRegisteredClassByStudentIdVer1(Long msdstudentid, Long msdclassid) {
		MSDClassSummaryDto dto = msdStudentFacade.getStudentRegisterClassByStudentIdClassId(msdstudentid, msdclassid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
*/
/*
    @RequestMapping(params={"type=registerclass", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentRegisteredClassByStudentIdDfltVer(Long msdstudentid) {
		return getStudentRegisteredClassByStudentIdVer1(msdstudentid);
	}

    @RequestMapping(params={"type=registerclass", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentRegisteredClassByStudentIdVer1(Long msdstudentid) {
		List<MSDClassSummaryDto> dtos = msdStudentFacade.getStudentRegisterClassByStudentId(msdstudentid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}
    
	@RequestMapping(params={"type=nonregisterclass", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentNonRegisteredClassByStudentIdDfltVer(Long msdstudentid) {
		return getStudentNonRegisteredClassByStudentIdVer1(msdstudentid);
	}

    @RequestMapping(params={"type=nonregisterclass", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentNonRegisteredClassByStudentIdVer1(Long msdstudentid) {
		List<MSDClassSummaryDto> dtos = msdStudentFacade.getStudentNonRegisterClassByStudentId(msdstudentid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}
*/    
	@RequestMapping(params={"type=nameautocomplete", "fieldname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentUniqueNameDfltVer(String fieldname) {
		return getStudentUniqueNameVer1(fieldname);
	}

    @RequestMapping(params={"type=nameautocomplete", "fieldname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentUniqueNameVer1(String fieldname) {
		List<String> names = msdStudentFacade.getStudentUniqueName(fieldname);
		ResponseDto responseDto = ResponseDto.createResponseDto(names, "GET", "ARRAY");
		return responseDto;
	}
    
	@RequestMapping(params={"type=studentdetail", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getStudentDetailByStudentIdDfltVer(Long msdstudentid) {
		return getStudentDetailByStudentIdVer1(msdstudentid);
	}

    @RequestMapping(params={"type=studentdetail", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentDetailByStudentIdVer1(Long msdstudentid) {
		MSDStudentDetailDto dto = msdStudentFacade.getStudentDetailDtoById(msdstudentid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto updateStudentInformationDfltVer(@RequestBody MSDStudentDetailDto studentDetailDto) {
		return updateStudentInformationVer1(studentDetailDto);
    }

    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto updateStudentInformationVer1(MSDStudentDetailDto studentDetailDto) {
		MSDStudentDetailDto newDto = msdStudentFacade.updateStudentinformation(studentDetailDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addStudentDfltVer(@RequestBody MSDStudentDetailDto studentDetailDto) {
    	return addStudentVer1(studentDetailDto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addStudentVer1(@RequestBody MSDStudentDetailDto studentDetailDto) {
		MSDStudentDetailDto addedDto = msdStudentFacade.addStudent(studentDetailDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(addedDto, "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}", method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterClassDfltVer(@RequestBody MSDStudentClassDto studentClassDto) {
    	return studentRegisterClassVer1(studentClassDto);
    }

    @RequestMapping(value="/{msdstudentid}", method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterClassVer1(MSDStudentClassDto studentClassDto) {
		MSDStudentClassDto newDto = msdStudentFacade.registerStudentToClass(studentClassDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}/{msdclassid}", method=RequestMethod.DELETE, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto deleteStudentRegisterClassDfltVer(@PathVariable Long msdstudentid, @PathVariable Long msdclassid) {
    	return deleteStudentDeleteRegisterClassVer1(msdstudentid, msdclassid);
    }

    @RequestMapping(value="/{msdstudentid}/{msdclassid}", method=RequestMethod.DELETE, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto deleteStudentDeleteRegisterClassVer1(@PathVariable Long msdstudentid, @PathVariable Long msdclassid) {
		String result = msdStudentFacade.deleteRegisterClassByStudentIdAndClassId(msdstudentid, msdclassid);
		ResponseDto responseDto = ResponseDto.createResponseDto(result, "DELETE", "OBJECT");
		return responseDto;
	}

    @RequestMapping(params={"msdclassid","msdstudentid"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterClassOldDfltVer(Long msdclassid, Long msdstudentid) {
    	return studentRegisterClassOldVer1(msdclassid, msdstudentid);
    }

    @RequestMapping(params={"msdclassid","msdstudentid"}, method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterClassOldVer1(Long msdclassid, Long msdstudentid) {
    	MSDStudentClassDto studentClassDto = new MSDStudentClassDto();
    	studentClassDto.setMsdClassId(msdclassid.intValue());
    	studentClassDto.setMsdStudentId(msdstudentid.intValue());
		MSDStudentClassDto newDto = msdStudentFacade.registerStudentToClass(studentClassDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}

    @RequestMapping(value="/{msdstudentid}/{msdclassid}", method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterClassDfltVer(@PathVariable Long msdstudentid, @PathVariable Long msdclassid) {
    	return studentRegisterClassVer1(msdstudentid, msdclassid);
    }

    @RequestMapping(value="/{msdstudentid}/{msdclassid}", method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterClassVer1(@PathVariable Long msdstudentid, @PathVariable Long msdclassid) {
    	MSDStudentClassDto studentClassDto = new MSDStudentClassDto();
    	studentClassDto.setMsdClassId(msdclassid.intValue());
    	studentClassDto.setMsdStudentId(msdstudentid.intValue());
		MSDStudentClassDto newDto = msdStudentFacade.registerStudentToClass(studentClassDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentRegisteredClassByStudentIdDfltVer(@PathVariable Long msdstudentid, String type) {
		return getStudentRegisteredClassByStudentIdVer1(msdstudentid, type);
	}

    @RequestMapping(value="/{msdstudentid}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentRegisteredClassByStudentIdVer1(@PathVariable Long msdstudentid, String type) {
    	if ("registerclass".equals(type)) {
    		List<MSDClassSummaryDto> dtos = msdStudentFacade.getStudentRegisterClassByStudentId(msdstudentid);
    		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    		return responseDto;
    	} else if ("nonregisterclass".equals(type)) {
    		List<MSDClassSummaryDto> dtos = msdStudentFacade.getStudentNonRegisterClassByStudentId(msdstudentid);
    		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    		return responseDto;
    	}
    	return null;
    }
    
}
