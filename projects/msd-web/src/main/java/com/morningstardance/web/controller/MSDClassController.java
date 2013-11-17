package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.msdclass.MSDClassDto;
import com.morningstardance.app.msdclass.MSDClassFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/msdclass")
public class MSDClassController {

		@Resource(name="msdClassFacade")
		protected MSDClassFacade msdClassFacade;
		
		@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody ResponseDto getAllMSDClassDfltVer() {
			return getAllMSDClassVer1();
		}
		
		@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		private ResponseDto getAllMSDClassVer1() {
			List<MSDClassDto> dtos = msdClassFacade.getAllMSDClass();
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
	
}
