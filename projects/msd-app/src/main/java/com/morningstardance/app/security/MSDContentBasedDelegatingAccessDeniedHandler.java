package com.morningstardance.app.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

public class MSDContentBasedDelegatingAccessDeniedHandler implements AccessDeniedHandler {
	private AccessDeniedHandler contentMatchAccessDeniedHandler;
	private AccessDeniedHandler defaultAccessDeniedHandler;
	private RequestContentTypeMatcher requestContentTypeMatcher;
    
	public MSDContentBasedDelegatingAccessDeniedHandler(
			AccessDeniedHandler contentMatchAccessDeniedHandler,
			AccessDeniedHandler defaultAccessDeniedHandler,
			RequestContentTypeMatcher requestContentTypeMatcher) {
		super();
		this.contentMatchAccessDeniedHandler = contentMatchAccessDeniedHandler;
		this.defaultAccessDeniedHandler = defaultAccessDeniedHandler;
		this.requestContentTypeMatcher = requestContentTypeMatcher;
	}


	@Override
	public void handle(HttpServletRequest request,
			HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException,
			ServletException {
		if (requestContentTypeMatcher.matches(request)) {
			contentMatchAccessDeniedHandler.handle(request, response, accessDeniedException);
		}
		else {
			defaultAccessDeniedHandler.handle(request, response, accessDeniedException);
		}
		
	}

}
