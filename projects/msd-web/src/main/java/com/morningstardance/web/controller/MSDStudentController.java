package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclass.MSDClassDto;
import com.morningstardance.app.msdstudent.MSDStudentDetailDto;
import com.morningstardance.app.msdstudent.MSDStudentDto;
import com.morningstardance.app.msdstudent.MSDStudentFacade;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinDto;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/msdstudent")
public class MSDStudentController {
	
	@Resource(name="msdStudentFacade")
	protected MSDStudentFacade msdStudentFacade;
	

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
	public @ResponseBody List<MSDStudentDto> getAllMSDStudentDfltVer() {
		return getAllMSDStudentVer1();
	}

	@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
	public @ResponseBody List<MSDStudentDto> getAllMSDStudentVer1() {
		List<MSDStudentDto> dtos = msdStudentFacade.getAllStudents();
		return dtos;
	}
	
	@RequestMapping(params={"firstname","lastname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getStudentByNameDfltVer(String firstname, String lastname, HttpServletResponse response) {
		return getStudentByNameVer1(firstname, lastname, response);
	}

	@RequestMapping(params={"firstname","lastname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public ResponseDto getStudentByNameVer1(String firstname,String lastname, HttpServletResponse response) {
		MSDStudentDto dto = msdStudentFacade.getStudentByName(firstname, lastname);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}

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

	@RequestMapping(params={"type=registerclass", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getAllStudentRegisterClassByStudentIdDfltVer(Long msdstudentid) {
		return getAllStudentRegisterClassByStudentIdVer1(msdstudentid);
	}

    @RequestMapping(params={"type=registerclass", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getAllStudentRegisterClassByStudentIdVer1(Long msdstudentid) {
		List<MSDClassDto> dtos = msdStudentFacade.getAllStudentRegisterClassByStudentId(msdstudentid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
	}
    
	@RequestMapping(params={"type=studentdetail", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getStudentDetailByStudentIdDfltVer(Long msdstudentid) {
		return getStudentDetailByStudentIdVer1(msdstudentid);
	}

    @RequestMapping(params={"type=studentdetail", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public ResponseDto getStudentDetailByStudentIdVer1(Long msdstudentid) {
		MSDStudentDetailDto dto = msdStudentFacade.getStudentDetailDtoById(msdstudentid);
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public ResponseDto updateStudentInformationDfltVer(@RequestBody MSDStudentDetailDto studentDetailDto) {
		return updateStudentInformationVer1(studentDetailDto);
    }

    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public ResponseDto updateStudentInformationVer1(MSDStudentDetailDto studentDetailDto) {
		MSDStudentDetailDto newDto = msdStudentFacade.updateStudentinformation(studentDetailDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
}
