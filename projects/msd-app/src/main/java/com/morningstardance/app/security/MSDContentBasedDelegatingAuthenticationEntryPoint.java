package com.morningstardance.app.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class MSDContentBasedDelegatingAuthenticationEntryPoint implements
		AuthenticationEntryPoint {
	
    private AuthenticationEntryPoint contentMatchAuthenticationEntryPoint;
    private AuthenticationEntryPoint defaultAuthenticationEntryPoint;
    private RequestContentTypeMatcher requestContentTypeMatcher;
    
    
	public MSDContentBasedDelegatingAuthenticationEntryPoint(
			AuthenticationEntryPoint contentMatchAuthenticationEntryPoint,
			AuthenticationEntryPoint defaultAuthenticationEntryPoint,
			RequestContentTypeMatcher requestContentTypeMatcher) {
		super();
		this.contentMatchAuthenticationEntryPoint = contentMatchAuthenticationEntryPoint;
		this.defaultAuthenticationEntryPoint = defaultAuthenticationEntryPoint;
		this.requestContentTypeMatcher = requestContentTypeMatcher;
	}


	@Override
	public void commence(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {
		if (requestContentTypeMatcher.matches(request)) {
			contentMatchAuthenticationEntryPoint.commence(request, response, authException);
		}
		else {
			defaultAuthenticationEntryPoint.commence(request, response, authException);
		}
	}

}
