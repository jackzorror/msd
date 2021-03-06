package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclass.MSDClassSummaryDto;
import com.morningstardance.app.msdstudent.MSDStudentBalanceDto;
import com.morningstardance.app.msdstudent.MSDStudentDetailDto;
import com.morningstardance.app.msdstudent.MSDStudentDto;
import com.morningstardance.app.msdstudent.MSDStudentFacade;
import com.morningstardance.app.msdstudentclass.MSDStudentClassDto;
import com.morningstardance.app.msdstudentclass.MSDStudentClassFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudent")
public class MSDStudentController {
	
	@Resource(name="msdStudentFacade")
	protected MSDStudentFacade msdStudentFacade;
	
	@Resource
	protected MSDStudentClassFacade msdStudentClassFacade;
	

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

    @RequestMapping(value="/ByClssId/{msdclassid}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getAllStudentByClassNameDfltVer(@PathVariable Long msdclassid, String type) {
		return getAllStudentByClassNameVer1(msdclassid, type);
	}

    @RequestMapping(value="/ByClassId/{msdclassid}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getAllStudentByClassNameVer1(@PathVariable Long msdclassid, String type) {
    	if (type.equals("Summary")) {
    		List<MSDStudentDto> dtos = msdStudentFacade.getAllStudentSummaryDtoByClassId(msdclassid);
    		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    		return responseDto;
    	}
    	return null;
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
		MSDStudentClassDto newDto = msdStudentFacade.registerStudentToClassByStudentClassDto(studentClassDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
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
		MSDStudentClassDto newDto = msdStudentClassFacade.registerStudentToClassByStudentClassDto(studentClassDto);
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
		MSDStudentClassDto newDto = msdStudentFacade.registerStudentToClassByStudentClassDto(studentClassDto);
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
    
    @RequestMapping(value="/{msdstudentid}/FINANCEBALANCE", method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentFinanceBalanceByStudentIdDfltVer(@PathVariable Long msdstudentid) {
		return getStudentFinanceBalanceByStudentIdVer1(msdstudentid);
	}

    @RequestMapping(value="/{msdstudentid}/FINANCEBALANCE", method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getStudentFinanceBalanceByStudentIdVer1(@PathVariable Long msdstudentid) {
    	MSDStudentBalanceDto dto = msdStudentFacade.getStudentFinanceBalanceByStudentId(msdstudentid);
    	ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
    	return responseDto;
    }
    
    
}
