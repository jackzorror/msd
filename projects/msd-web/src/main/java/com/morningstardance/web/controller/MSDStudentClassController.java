package com.morningstardance.web.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;
import com.morningstardance.app.msdstudent.MSDStudentFacade;
import com.morningstardance.app.msdstudentclass.MSDStudentClassFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudentclass")
public class MSDStudentClassController {

	@Resource(name="msdStudentClassFacade")
	protected MSDStudentClassFacade msdStudentClassFacade;
	

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterClassDfltVer(@RequestBody MSDStudentClassDto studentClassDto) {
    	return studentRegisterClassVer1(studentClassDto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterClassVer1(MSDStudentClassDto studentClassDto) {
		MSDStudentClassDto newDto = msdStudentClassFacade.registerStudentToClass(studentClassDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
    
	
}
