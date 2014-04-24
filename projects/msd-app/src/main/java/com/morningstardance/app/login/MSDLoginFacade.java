package com.morningstardance.app.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface MSDLoginFacade {

	boolean verifyLoginUser(String username, String password, HttpServletRequest request, HttpServletResponse response);

	void logout(HttpServletRequest httpRequest, HttpServletResponse httpResponse);

}
