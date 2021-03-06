package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclass.MSDClassDetailDto;
import com.morningstardance.app.msdclass.MSDClassDto;
import com.morningstardance.app.msdclass.MSDClassSummaryDto;
import com.morningstardance.app.msdclass.MSDClassFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdclass")
public class MSDClassController {

		@Resource(name="msdClassFacade")
		protected MSDClassFacade msdClassFacade;
		
		@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody ResponseDto getAllMSDClassDfltVer() {
			return getAllMSDClassVer1();
		}
		
		@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		private ResponseDto getAllMSDClassVer1() {
			List<MSDClassSummaryDto> dtos = msdClassFacade.getAllMSDClass();
	        ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
			return responseDto;
		}

		@RequestMapping(params={"classstatus"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody ResponseDto getAllMSDClassByStatusDfltVer(String classstatus) {
			return getAllMSDClassStatusVer1(classstatus);
		}
		
		@RequestMapping(params={"classstatus"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		private ResponseDto getAllMSDClassStatusVer1(String classstatus) {
			List<MSDClassSummaryDto> dtos = msdClassFacade.getAllMSDClassByStatus(classstatus);
	        ResponseDto responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
			return responseDto;
		}

		@RequestMapping(value="/{msdClassId}", method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody ResponseDto getMSDClassByIdDfltVer(@PathVariable("msdClassId") Long msdClassId) {
			return getMSDClassByIdVer1(msdClassId);
		}
	
		@RequestMapping(value="/{msdClassId}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		public @ResponseBody ResponseDto getMSDClassByIdVer1(@PathVariable("msdClassId") Long msdClassId) {
			MSDClassDto dto = msdClassFacade.getMSDClassById(msdClassId);
	        ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
			return responseDto;
		}

	    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
	    public @ResponseBody ResponseDto addClassDfltVer(@RequestBody MSDClassDto msdclassdto) {
	    	return addClassVer1(msdclassdto);
	    }

	    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
		public@ResponseBody ResponseDto addClassVer1(@RequestBody MSDClassDto msdclassdto) {
	    	MSDClassDto addedDto = msdClassFacade.saveClass(msdclassdto);
			ResponseDto responseDto = ResponseDto.createResponseDto(addedDto, "PUT", "OBJECT");
			return responseDto;
		}
	    
		@RequestMapping(params={"type=classname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
		public @ResponseBody ResponseDto getClassUniqueNameDfltVer() {
			return getClassUniqueNameVer1();
		}

	    @RequestMapping(params={"type=classname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
		public @ResponseBody ResponseDto getClassUniqueNameVer1() {
			List<String> names = msdClassFacade.getClassUniqueName();
			ResponseDto responseDto = ResponseDto.createResponseDto(names, "GET", "ARRAY");
			return responseDto;
		}
	    
		@RequestMapping(params={"classname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
		public @ResponseBody ResponseDto getClassByClassNameDfltVer(String classname) {
			return getClassByClassNameVer1(classname);
		}

	    @RequestMapping(params={"classname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
		public @ResponseBody ResponseDto getClassByClassNameVer1(String classname) {
			MSDClassDto dto = msdClassFacade.getClassByClassName(classname);
			ResponseDto responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
			return responseDto;
		}
	    
		@RequestMapping(value="/{msdClassId}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody ResponseDto getMSDClassByIdAndTypeDfltVer(@PathVariable("msdClassId") Long msdClassId, String type) {
			return getMSDClassByIdAndTypeVer1(msdClassId, type);
		}
	
		@RequestMapping(value="/{msdClassId}", params={"type"}, method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		public @ResponseBody ResponseDto getMSDClassByIdAndTypeVer1(@PathVariable("msdClassId") Long msdClassId, String type) {
			ResponseDto responseDto = null;
			if ("SUMMARY".equals(type)) {
				MSDClassSummaryDto dto = msdClassFacade.getMSDClassSummaryById(msdClassId);
		        responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
			} else if ("DETAIL".equals(type)) {
				MSDClassDetailDto dto = msdClassFacade.getMSDClassDetailById(msdClassId);
		        responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
			} else {
				responseDto = ResponseDto.createResponseDto(null, "GET", "OBJECT");
			}
			
			return responseDto;
		}

	    
}
