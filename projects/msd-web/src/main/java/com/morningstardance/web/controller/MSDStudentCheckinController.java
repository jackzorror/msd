package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinDto;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/msdstudentcheckin")
public class MSDStudentCheckinController {

	@Resource(name="msdStudentCheckinFacade")
	protected MSDStudentCheckinFacade msdStudentCheckinFacade;

	@RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto getAllStudentCheckInDtoForCheckInByClassIDDfltVer(Long msdclassid) {
    	return getAllStudentCheckInDtoForCheckInByClassIDVer1(msdclassid);
    }
    
    @RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
    public @ResponseBody ResponseDto getAllStudentCheckInDtoForCheckInByClassIDVer1(Long msdclassid) {
    	List<MSDStudentCheckinDto> dtos = msdStudentCheckinFacade.getAllStudentCheckinDtoForCheckInByClassId(msdclassid);
        ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
		return responseDto;
    }
    
    @RequestMapping(params={"type=checkin","namelisttype"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto getAllStudentNameListDfltVer(String namelisttype) {
    	return getAllStudentNameListVer1(namelisttype);
    }
    
    @RequestMapping(params={"type=checkin","namelisttype"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
    public @ResponseBody ResponseDto getAllStudentNameListVer1(String namelisttype) {
    	List<String> nameList = msdStudentCheckinFacade.getAllStudentNameList(namelisttype);
        ResponseDto responseDto = ResponseDto.createResponseDto(nameList, "GET", "ARRAY");
		return responseDto;
    }
    @RequestMapping(params={"type=checkin", "msdclassid", "lastname", "firstname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getNonClassStudentCheckInDtoForCheckInByLastNameAndFirstNameDfltVer(Long msdclassid, String lastname, String firstname) {
    	return getNonClassStudentCheckInDtoForCheckInByLastNameAndFirstNameVer1(msdclassid, lastname, firstname);
    }
    
    @RequestMapping(params={"type=checkin", "msdclassid", "lastname", "firstname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto getNonClassStudentCheckInDtoForCheckInByLastNameAndFirstNameVer1(Long msdclassid, String lastname, String firstname) {
    	MSDStudentCheckinDto dto = msdStudentCheckinFacade.getStudentCheckinDtoByLastNameFirstName(msdclassid, lastname, firstname);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto studentClassCheckInDfltVer(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletResponse response) {
    	return studentClassCheckInVer1(studentCheckinDto, response);
    	
    }
	    
	@RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto studentClassCheckInVer1(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletResponse response) {

		Long msdstudentid = new Long(studentCheckinDto.getStudentId());
		Long msdclassid = new Long(studentCheckinDto.getClassId());
    	MSDStudentCheckinDto dto = msdStudentCheckinFacade.studentClassCheckin(msdstudentid, msdclassid);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "POST", "OBJECT");
		return responseDto;
    }
}
