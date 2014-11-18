package com.morningstardance.web.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;
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
		MSDStudentClassDto newDto = msdStudentClassFacade.registerStudentToClassByStudentClassDto(studentClassDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}/{msdclassidlist}", method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterClassesDfltVer(@PathVariable Long msdstudentid, @PathVariable String msdclassidlist) {
    	return studentRegisterClassesVer1(msdstudentid, msdclassidlist);
    }

    @RequestMapping(value="/{msdstudentid}/{msdclassidlist}", method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterClassesVer1(@PathVariable Long msdstudentid, @PathVariable String msdclassidlist) {
		String newDto = msdStudentClassFacade.registerStudentToClassesByStudentIdAndClassIdList(msdstudentid, msdclassidlist);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(params={"classid", "studentidlist", "oldclassid", "registertype"}, method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto registerClassByClassIdAndStudentIDlistAndTypeDfltVer(Long classid, String studentidlist, Long oldclassid, String registertype) {
    	return registerClassByClassIdAndStudentIDlistAndTypeVer1(classid, studentidlist,oldclassid, registertype);
    }

    @RequestMapping(params={"classname", "studentidlist", "oldclassname", "registertype"}, method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto registerClassByClassIdAndStudentIDlistAndTypeVer1(Long classid, String studentidlist, Long oldclassid, String registertype) {
		String newDto = msdStudentClassFacade.registerStudentToClassByClassIDAndStudentIdlistAndType(classid, studentidlist, oldclassid, registertype);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}/{msdclassidlist}", method=RequestMethod.DELETE, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentDeleteRegisteredClassesDfltVer(@PathVariable Long msdstudentid, @PathVariable String msdclassidlist) {
    	return studentDeleteRegisteredClassesVer1(msdstudentid, msdclassidlist);
    }

    @RequestMapping(value="/{msdstudentid}/{msdclassidlist}", method=RequestMethod.DELETE, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentDeleteRegisteredClassesVer1(@PathVariable Long msdstudentid, @PathVariable String msdclassidlist) {
		msdStudentClassFacade.unRegisterStudentFromClassesByStudentIdAndClassIdList(msdstudentid, msdclassidlist);
		ResponseDto responseDto = ResponseDto.createResponseDto(null, "DELETE", "OBJECT");
		return responseDto;
	}
    
	
}
