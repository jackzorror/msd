package com.morningstardance.app.security;

import javax.servlet.http.HttpServletRequest;

public interface RequestContentTypeMatcher {

	boolean matches(HttpServletRequest request);
}
