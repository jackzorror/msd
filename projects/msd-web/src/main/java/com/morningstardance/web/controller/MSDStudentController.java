package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.ResponseDto;
import com.morningstardance.app.msdstudent.MSDStudentCheckinDto;
import com.morningstardance.app.msdstudent.MSDStudentDto;
import com.morningstardance.app.msdstudent.MSDStudentFacade;

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

    @RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody List<MSDStudentDto> getAllStudentsByClassIdForCheckinDfltVer(@RequestParam("msdclassid") Long msdClassId) {
    	return getAllStudentsByClassIdForCheckinVer1(msdClassId);
    }

    @RequestMapping(params={"type=checkin", "msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody List<MSDStudentDto> getAllStudentsByClassIdForCheckinVer1(Long msdClassId) {
    	List<MSDStudentDto> dtos = msdStudentFacade.getAllStudentsByClassIdForCheckin(msdClassId);
		return dtos;
	}
    
    @RequestMapping(value="/studentcheckin", method=RequestMethod.POST, headers="!X-Api-service-Version")
    public @ResponseBody ResponseDto studentClassCheckInDfltVer(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletResponse response) {
    	return studentClassCheckInVer1(studentCheckinDto, response);
    	
    }
	    
	@RequestMapping(value="/studentcheckin", params={"msdstudentid","msdclassid"},method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto studentClassCheckInVer1(@RequestBody MSDStudentCheckinDto studentCheckinDto, HttpServletResponse response) {

		Long msdstudentid = new Long(studentCheckinDto.getStudentId());
		Long msdclassid = new Long(studentCheckinDto.getClassId());
    	MSDStudentCheckinDto dto = msdStudentFacade.studentClassCheckin(msdstudentid, msdclassid);
    	
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
