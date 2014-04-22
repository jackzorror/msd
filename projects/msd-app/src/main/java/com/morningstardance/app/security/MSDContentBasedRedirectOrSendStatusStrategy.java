package com.morningstardance.app.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;

public class MSDContentBasedRedirectOrSendStatusStrategy implements RedirectStrategy {

    private RedirectStrategy defaultRedirectStrategy = new DefaultRedirectStrategy();
    
    private RequestContentTypeMatcher sendStatusRequestContentTypeMatcher;
    
    private int statusCode;
    
    private String statusMessage;    
    
	public void setDefaultRedirectStrategy(RedirectStrategy defaultRedirectStrategy) {
		this.defaultRedirectStrategy = defaultRedirectStrategy;
	}
		
	public void setSendStatusRequestContentTypeMatcher(
			RequestContentTypeMatcher sendStatusRequestContentTypeMatcher) {
		this.sendStatusRequestContentTypeMatcher = sendStatusRequestContentTypeMatcher;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}

	@Override
	public void sendRedirect(HttpServletRequest request,
			HttpServletResponse response, String url) throws IOException {
		
		if (sendStatusRequestContentTypeMatcher.matches(request)) {
			sendStatus(response);
		}
		else {
			defaultRedirectStrategy.sendRedirect(request, response, url);
		}

	}

	protected void sendStatus(HttpServletResponse response) throws IOException {
	    HttpServletResponse httpResponse = (HttpServletResponse) response;
	    httpResponse.sendError(statusCode, statusMessage);
	}
	
}
