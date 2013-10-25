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

@Controller
@RequestMapping("/msdclass")
public class MSDClassController {

		@Resource(name="msdClassFacade")
		protected MSDClassFacade msdClassFacade;
		
		@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody List<MSDClassDto> getAllMSDClassDfltVer() {
			return getAllMSDClassVer1();
		}
		
		@RequestMapping(method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		private List<MSDClassDto> getAllMSDClassVer1() {
			List<MSDClassDto> dtos = msdClassFacade.getAllMSDClass();
			dtos.size();
			return dtos;
		}

		@RequestMapping(value="/{msdClassId}", method=RequestMethod.GET, headers="!X-Api-service-Version")
		public @ResponseBody MSDClassDto getMSDClassByIdDfltVer(@PathVariable("msdClassId") Long msdClassId) {
			return getMSDClassByIdVer1(msdClassId);
		}
	
		@RequestMapping(value="/{msdClassId}", method=RequestMethod.GET, headers="!X-Api-service-Version=1.0")
		public @ResponseBody MSDClassDto getMSDClassByIdVer1(@PathVariable("msdClassId") Long msdClassId) {
			return msdClassFacade.getMSDClassById(msdClassId);
		}
	
}
