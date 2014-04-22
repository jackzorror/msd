package com.morningstardance.app.security;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

public class AjaxRequestContentTypeMatcher implements RequestContentTypeMatcher {

	private Set<String> ajaxContentTypes;
	
	
	public AjaxRequestContentTypeMatcher(Set<String> ajaxContentTypes) {
		this.ajaxContentTypes = ajaxContentTypes;
	}

	public void setAjaxContentTypes(Set<String> ajaxContentTypes) {
		this.ajaxContentTypes = ajaxContentTypes;
	}

	@Override
	public boolean matches(HttpServletRequest request) {
		String acceptHeader = request.getHeader("Accept");
		
		//If no accept header cant determine if request is of ajax content type
		if (StringUtils.isBlank(acceptHeader)) return false;
		
	    // get first header group
		int endIndex = acceptHeader.indexOf(';', 0);
        String firstAcceptHeaderGroup = endIndex < 1 ? acceptHeader.toLowerCase() : acceptHeader.toLowerCase().substring(0, endIndex);
    
        // if any of the first group accept headers are text/html, then this is not a ajax content type        
        if (firstAcceptHeaderGroup.contains("text/html"))
            return false;		

        // now check first header to see if it's a ajax accept header we expect
        endIndex = acceptHeader.indexOf(',', 0);
		String firstAcceptHeader = endIndex < 1 ? acceptHeader.toLowerCase() : acceptHeader.toLowerCase().substring(0, endIndex);
		if ((firstAcceptHeader != null) && (ajaxContentTypes.contains(firstAcceptHeader))) {
			return true;
		}

		// this accept header is not for ajax content type
		return false;
	}

}
