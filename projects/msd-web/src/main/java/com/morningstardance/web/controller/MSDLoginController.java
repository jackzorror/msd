package com.morningstardance.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.morningstardance.app.login.MSDLoginFacade;
import com.morningstardance.web.ResponseDto;

@Controller
@RequestMapping("/msdlogin")
public class MSDLoginController {
	
	@Resource
	private MSDLoginFacade msdLoginFacade;

	@RequestMapping(params={"username","password"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto msdLoginDfltVer(String username, String password, HttpServletResponse response) {
		return msdLoginVer1(username, password, response);
	}

	@RequestMapping(params={"username","password"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto msdLoginVer1(String username,String password, HttpServletResponse response) {
		ResponseDto responseDto = null;
		if (msdLoginFacade.verifyLoginUser(username, password)) {
			responseDto = ResponseDto.createResponseDto("Login", "GET", "OBJECT");
		} else {	
			responseDto = ResponseDto.createResponseDto("Login", "GET", "OBJECT");
		}
		return responseDto;
	}

}
