package com.morningstardance.app.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.morningstardance.app.security.MSDAuthenticationService;

@Service("msdLoginFacade")
public class MSDLoginFacadeImpl implements MSDLoginFacade {
	@Autowired
	MSDAuthenticationService msdAuthenticationService;

	@Override
	public boolean verifyLoginUser(String username, String password, HttpServletRequest request, HttpServletResponse response) {
		boolean result = true;
		try {
			Authentication authResult = msdAuthenticationService.authenticate(username, password, request, response);
		
			if (authResult == null)
				result = false;
		} catch (BadCredentialsException bce) {
			result = false;
		} catch (UsernameNotFoundException une) {
			result = false;
		}
		return result;
	}

}
