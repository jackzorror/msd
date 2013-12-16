package com.morningstardance.app.login;

import org.springframework.stereotype.Service;

@Service("msdLoginFacade")
public class MSDLoginFacadeImpl implements MSDLoginFacade {

	@Override
	public boolean verifyLoginUser(String username, String password) {
		return true;
	}

}
