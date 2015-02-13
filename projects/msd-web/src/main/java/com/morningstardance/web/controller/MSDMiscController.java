package com.morningstardance.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.misc.MSDFileNameDto;
import com.morningstardance.app.misc.MSDMiscFacade;
import com.morningstardance.app.misc.MSDTypeDto;
import com.morningstardance.web.MSDTypeObject;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/rs/msdmisc")
public class MSDMiscController {
	
	@Resource
	private MSDMiscFacade msdMiscFacade;

	@RequestMapping(params={"miscname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto getMiscByNameDfltVer(String miscname) {
		return getMiscByNameVer1(miscname);
	}

    @RequestMapping(params={"miscname"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
	public @ResponseBody ResponseDto getMiscByNameVer1(String miscname) {
    	ResponseDto responseDto = null;
    	if (null == miscname || miscname.isEmpty()) {
    		responseDto = null;
    	} else if (miscname.equals("ALL_TYPE")) {
        		List<MSDTypeDto> dtos = msdMiscFacade.getAllType();
        		responseDto = ResponseDto.createResponseDto(dtos, "GET", "ARRAY");
    	} else if (miscname.contains("CREATE_NAME_LIST_FILE")) {
    		String [] fields = miscname.split("-");
    		MSDFileNameDto dto = msdMiscFacade.createStudentNameListFile(fields[1]);
    		responseDto = ResponseDto.createResponseDto(dto, "GET", "OBJECT");
    	}
		return responseDto;
	}

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version")
    public @ResponseBody ResponseDto addMSDTypeDfltVer(@RequestBody MSDTypeObject type) {
    	return addMSDTypeVer1(type);
    }

    @RequestMapping(method=RequestMethod.PUT, headers="!X-Api-Service-Version=1.0")
	public@ResponseBody ResponseDto addMSDTypeVer1(@RequestBody MSDTypeObject type) {
    	MSDTypeDto dto = msdMiscFacade.addMSDType(new MSDTypeDto(type.getId(), type.getTypeName(), type.getTypeString()));
		ResponseDto responseDto = ResponseDto.createResponseDto(dto, "PUT", "OBJECT");
		return responseDto;
	}

}
