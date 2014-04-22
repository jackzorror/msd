package com.morningstardance.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
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

	@RequestMapping(value="/login", params={"username","password"}, method=RequestMethod.GET, headers="!X-Api-Service-Version")
	public @ResponseBody ResponseDto msdLoginDfltVer(String username, String password, HttpServletRequest request, HttpServletResponse response) {
		return msdLoginVer1(username, password, request, response);
	}

	@RequestMapping(value="/login", params={"username","password"}, method=RequestMethod.GET, headers="!X-Api-Service-Version=1.0")
    public @ResponseBody ResponseDto msdLoginVer1(String username,String password, HttpServletRequest request, HttpServletResponse response) {
		ResponseDto responseDto = null;
		try {
			if (msdLoginFacade.verifyLoginUser(username, password, request, response)) {
				responseDto = ResponseDto.createResponseDto("Login", "GET", "OBJECT");
			} else {	
				responseDto = new ResponseDto();
				responseDto.setCode(new Long(HttpStatus.UNAUTHORIZED.value()));
				responseDto.setMessage("Invalide username/password information");
			}
		} catch (Exception ex) {
			responseDto = new ResponseDto();
			responseDto.setCode(new Long(HttpStatus.INTERNAL_SERVER_ERROR.value()));
			responseDto.setMessage("System error, Please try again");
		}
		
		return responseDto;
	}

}
