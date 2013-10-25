package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
    public @ResponseBody List<MSDStudentDto> getAllStudentsByClassIdDfltVer(@RequestParam("msdclassid") Long msdClassId) {
    	return getAllStudentsByClassIdVer1(msdClassId);
    }

    @RequestMapping(params={"msdclassid"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody List<MSDStudentDto> getAllStudentsByClassIdVer1(Long msdClassId) {
    	List<MSDStudentDto> dtos = msdStudentFacade.getAllStudentsByClassId(msdClassId);
		return dtos;
	}
}
