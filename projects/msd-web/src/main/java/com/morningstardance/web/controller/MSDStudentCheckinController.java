package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.ResponseDto;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinDto;
import com.morningstardance.app.msdstudentcheckin.MSDStudentCheckinFacade;

@Controller
@RequestMapping("/msdstudentcheckin")
public class MSDStudentCheckinController {

	@Resource(name="msdStudentCheckinFacade")
	protected MSDStudentCheckinFacade msdStudentCheckinFacade;

	@RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
    public @ResponseBody List<MSDStudentCheckinDto> getAllStudentCheckInDtoForCheckInByClassIDDfltVer(Long msdclassid) {
    	return getAllStudentCheckInDtoForCheckInByClassIDVer1(msdclassid);
    }
    
    @RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
    public @ResponseBody List<MSDStudentCheckinDto> getAllStudentCheckInDtoForCheckInByClassIDVer1(Long msdclassid) {
    	List<MSDStudentCheckinDto> dtos = msdStudentCheckinFacade.getAllStudentCheckinDtoForCheckInByClassId(msdclassid);
    	return dtos;
    }
    
    @RequestMapping(params={"type=checkin", "lastname", "firstname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody MSDStudentCheckinDto getNonClassStudentCheckInDtoForCheckInByLastNameAndFirstNameDfltVer(String lastname, String firstname) {
    	return getNonClassStudentCheckInDtoForCheckInByLastNameAndFirstNameVer1(lastname, firstname);
    }
    
    @RequestMapping(params={"type=checkin", "lastname", "firstname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody MSDStudentCheckinDto getNonClassStudentCheckInDtoForCheckInByLastNameAndFirstNameVer1(String lastname, String firstname) {

		return null;
	}
    
    @RequestMapping(method=RequestMethod.POST, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto studentClassCheckInDfltVer(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletResponse response) {
    	return studentClassCheckInVer1(studentCheckinDto, response);
    	
    }
	    
	@RequestMapping(params={"msdstudentid","msdclassid"},method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto studentClassCheckInVer1(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletResponse response) {

		Long msdstudentid = new Long(studentCheckinDto.getStudentId());
		Long msdclassid = new Long(studentCheckinDto.getClassId());
    	MSDStudentCheckinDto dto = msdStudentCheckinFacade.studentClassCheckin(msdstudentid, msdclassid);
    	
        ResponseDto responseDto = new ResponseDto();
    	if (null != dto) {
    		response.setStatus(HttpStatus.CREATED.value());
            responseDto.setCode(200L);
            responseDto.setResourceId(dto.getId());
            responseDto.setMessage("created");
    	} else {
    		response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            responseDto.setCode(500L);
            responseDto.setMessage("error");
    	}

        return responseDto;
    }
}
