package com.morningstardance.web.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdstudentcompetition.MSDStudentCompetitionDto;
import com.morningstardance.app.msdstudentcompetition.MSDStudentCompetitionFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdstudentcompetition")
public class MSDStudentCompetitionController {
	
	@Resource
	private MSDStudentCompetitionFacade msdStudentCompetitionFacade;

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterCompetitionDfltVer(@RequestBody MSDStudentCompetitionDto studentCompetitionDto) {
    	return studentRegisterCompetitionVer1(studentCompetitionDto);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterCompetitionVer1(MSDStudentCompetitionDto studentCompetitionDto) {
		MSDStudentCompetitionDto newDto = msdStudentCompetitionFacade.registerStudentToCompetitionByStudentCompetitionDto(studentCompetitionDto);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}/{msdcompetitionidlist}", method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentRegisterCompetitionsDfltVer(@PathVariable Long msdstudentid, @PathVariable String msdcompetitionidlist) {
    	return studentRegisterCompetitionsVer1(msdstudentid, msdcompetitionidlist);
    }

    @RequestMapping(value="/{msdstudentid}/{msdcompetitionidlist}", method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentRegisterCompetitionsVer1(@PathVariable Long msdstudentid, @PathVariable String msdcompetitionidlist) {
		String newDto = msdStudentCompetitionFacade.registerStudentToCompetitionesByStudentIdAndCompetitionIdList(msdstudentid, msdcompetitionidlist);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(params={"competitionid", "studentidlist", "oldcompetitionid", "registertype"}, method=RequestMethod.POST, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto registerCompetitionByCompetitionIdAndStudentIdlistAndTypeDfltVer(Long competitionid, String studentidlist, Long oldcompetitionid, String registertype) {
    	return registerCompetitionByCompetitionIdAndStudentIdlistAndTypeVer1(competitionid, studentidlist,oldcompetitionid, registertype);
    }

    @RequestMapping(params={"competitionid", "studentidlist", "oldcompetitionid", "registertype"}, method=RequestMethod.POST, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto registerCompetitionByCompetitionIdAndStudentIdlistAndTypeVer1(Long competitionid, String studentidlist, Long oldcompetitionid, String registertype) {
		String newDto = msdStudentCompetitionFacade.registerStudentToCompetitionByCompetitionIDAndStudentIdlistAndType(competitionid, studentidlist, oldcompetitionid, registertype);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "POST", "OBJECT");
		return responseDto;
	}
    
    @RequestMapping(value="/{msdstudentid}/{msdcompetitionidlist}", method=RequestMethod.DELETE, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto studentDeleteRegisteredCompetitionsDfltVer(@PathVariable Long msdstudentid, @PathVariable String msdcompetitionidlist) {
    	return studentDeleteRegisteredCompetitionsVer1(msdstudentid, msdcompetitionidlist);
    }

    @RequestMapping(value="/{msdstudentid}/{msdcompetitionidlist}", method=RequestMethod.DELETE, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto studentDeleteRegisteredCompetitionsVer1(@PathVariable Long msdstudentid, @PathVariable String msdcompetitionidlist) {
		String newDto = msdStudentCompetitionFacade.unRegisterStudentFromCompetitionsByStudentIdAndCompetitionIdList(msdstudentid, msdcompetitionidlist);
		ResponseDto responseDto = ResponseDto.createResponseDto(newDto, "PUT", "OBJECT");
		return responseDto;
	}
}
