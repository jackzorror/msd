package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckInValidResultDto;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinDto;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinFacade;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinReportDto;
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
    /*
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
	*/
    /*
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
    */
    @RequestMapping(value="/{msdstudentid}", method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getStudentAllCheckinReportByStudentIdDfltVer(@PathVariable Long msdstudentid) {
    	return getStudentAllCheckinReportByStudentIdVer1(msdstudentid);
    }
    
    @RequestMapping(value="/{msdstudentid}", method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto getStudentAllCheckinReportByStudentIdVer1(@PathVariable Long msdstudentid) {
    	List<MSDStudentCheckinReportDto> reportDtos = msdStudentCheckinFacade.getStudentAllCheckinReportByStudentId(msdstudentid);
    	ResponseDto responseDto = ResponseDto.createResponseDto(reportDtos, "GET", "ARRAY");
    	return responseDto;
    }

    @RequestMapping(value="/{msdstudentid}/{msdclassid}", method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto getStudentCheckinReportByStudentIdAndClassIdDfltVer(@PathVariable Long msdstudentid, @PathVariable Long msdclassid) {
    	return getStudentCheckinReportByStudentIdAndClassIdVer1(msdstudentid, msdclassid);
    }
    
    @RequestMapping(value="/{msdstudentid}/{msdclassid}", method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto getStudentCheckinReportByStudentIdAndClassIdVer1(@PathVariable Long msdstudentid, @PathVariable Long msdclassid) {
    	List<MSDStudentCheckinReportDto> reportDtos = msdStudentCheckinFacade.getStudentCheckinReportByStudentIdAndClassId(msdstudentid, msdclassid);
    	ResponseDto responseDto = ResponseDto.createResponseDto(reportDtos, "GET", "ARRAY");
    	return responseDto;
    }

    @RequestMapping(params={"type=checkin","fieldname"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto getFieldListDfltVer(String fieldname) {
    	return getFieldListVer1(fieldname);
    }
    @RequestMapping(params={"type=checkin","fieldname"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
    public @ResponseBody ResponseDto getFieldListVer1(String fieldname) {
    	List<String> nameList = msdStudentCheckinFacade.getFieldList(fieldname);
        ResponseDto responseDto = ResponseDto.createResponseDto(nameList, "GET", "ARRAY");
		return responseDto;
    }

    @RequestMapping(params={"type=checkin", "firstname", "lastname", "msdclassname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto validStudentCheckInInformationDfltVer(String firstname, String lastname, String msdclassname) {
    	return validStudentCheckInInformationVer1(firstname, lastname, msdclassname);
    }
    @RequestMapping(params={"type=checkin", "firstname", "lastname", "msdclassname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto validStudentCheckInInformationVer1(String firstname, String lastname, String msdclassname) {
    	MSDStudentCheckInValidResultDto dto = msdStudentCheckinFacade.validStudentCheckInInformation(firstname, lastname, msdclassname);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(params={"type=checkin", "msdclassid", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto checkStudentClassRegisteinformationDfltVer(Long msdclassid, Long msdstudentid) {
    	return checkStudentClassRegisteinformationVer1(msdclassid, msdstudentid);
    }
    @RequestMapping(params={"type=checkin", "msdclassid", "msdstudentid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto checkStudentClassRegisteinformationVer1(Long msdclassid, Long msdstudentid) {
    	String result = msdStudentCheckinFacade.checkStudentClassRegisteinformation(msdclassid, msdstudentid);
        ResponseDto responseDto = ResponseDto.createResponseDto(result, "GET", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto studentClassCheckInDfltVer(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletRequest request, HttpServletResponse response) {
    	return studentClassCheckInVer1(studentCheckinDto, request, response);
    	
    }	    
	@RequestMapping(method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto studentClassCheckInVer1(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletRequest request, HttpServletResponse response) {

		Long msdstudentid = new Long(studentCheckinDto.getStudentId());
		Long msdclassid = new Long(studentCheckinDto.getClassId());
//    	MSDStudentCheckinDto dto = msdStudentCheckinFacade.studentClassCheckin(msdstudentid, msdclassid);
    	MSDStudentCheckinDto dto = msdStudentCheckinFacade.studentClassCheckin(studentCheckinDto);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "POST", "OBJECT");
        
		return responseDto;
    }
}
