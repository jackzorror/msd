package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckInValidResultDto;
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
    
    @RequestMapping(params={"type=checkin", "firstname", "lastname", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto validStudentCheckInInformationDfltVer(String firstname, String lastname, Long msdclassid) {
    	return validStudentCheckInInformationVer1(firstname, lastname, msdclassid);
    }
    @RequestMapping(params={"type=checkin", "firstname", "lastname", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto validStudentCheckInInformationVer1(String firstname, String lastname, Long msdclassid) {
    	MSDStudentCheckInValidResultDto dto = msdStudentCheckinFacade.validStudentCheckInInformation(firstname, lastname, msdclassid);
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
    	MSDStudentCheckinDto dto = msdStudentCheckinFacade.studentClassCheckin(msdstudentid, msdclassid);
        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "POST", "OBJECT");
        
        final String cookieName = "MSD_CHECKIN_COOKIE";
        final String cookieValue = "my cool value here !";  // you could assign it some encoded value
        final Boolean useSecureCookie = new Boolean(false);
        final int expiryTime = 60 * 60 * 24;  // 24h in seconds
        final String cookiePath = "/";

        Cookie myCookie = new Cookie(cookieName, cookieValue);

        myCookie.setSecure(useSecureCookie.booleanValue());  // determines whether the cookie should only be sent using a secure protocol, such as HTTPS or SSL

        myCookie.setMaxAge(expiryTime);  // A negative value means that the cookie is not stored persistently and will be deleted when the Web browser exits. A zero value causes the cookie to be deleted.

        myCookie.setPath(cookiePath);  // The cookie is visible to all the pages in the directory you specify, and all the pages in that directory's subdirectories

        response.addCookie(myCookie);

		return responseDto;
    }
}
