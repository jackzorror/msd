package com.morningstardance.app.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public interface MSDAuthenticationService {

	public abstract void validateCredentials(String username, String password) throws AuthenticationException;
	
	public abstract Authentication attemptAuthentication(String username,
			String password) throws AuthenticationException;

	public abstract Authentication authenticate(String username,
			String password, HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException;

}