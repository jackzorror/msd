package com.morningstardance.app.security;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.stereotype.Service;

@Service("msdAuthenticationService")
public class MSDAuthenticationServiceImpl implements MSDAuthenticationService{
 
	@Resource(name="authenticationManager")
    protected AuthenticationManager authenticationManager;
    
	@Resource(name="sas")
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy;
    
	public void validateCredentials(String username, String password) throws AuthenticationException {
		try {
			attemptAuthentication(username, password);
		}
		catch (CredentialsExpiredException credExpiredEx) {
			//Expired Credentials are ignored
		}
		catch (AuthenticationException authEx) {
			throw authEx;
		}
	}
	
	/* (non-Javadoc)
	 * @see com.ln.lnie.sp.application.security.authentication.SalesPortalAuthenticationService#attemptAuthentication(java.lang.String, java.lang.String)
	 */
	@Override
	public Authentication attemptAuthentication(String username, String password) throws AuthenticationException {
        username = username.trim();
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authRequest);
        
	}
	
	/* (non-Javadoc)
	 * @see com.ln.lnie.sp.application.security.authentication.SalesPortalAuthenticationService#authenticate(java.lang.String, java.lang.String, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public Authentication authenticate(String username, String password, HttpServletRequest request, HttpServletResponse response)  throws AuthenticationException {
        Authentication authResult;

        try {
            authResult = attemptAuthentication(username, password);
            if (authResult == null) {
                return null;
            }
            sessionAuthenticationStrategy.onAuthentication(authResult, request, response);
        }
        catch (AuthenticationException failed) {
            // Authentication failed
            unsuccessfulAuthentication(request, response, failed);
            throw failed;
        }		
		
        successfullAuthentication(request, response, authResult);
        return authResult;
	}


	protected void successfullAuthentication(HttpServletRequest request, HttpServletResponse response, Authentication authResult) {
		  SecurityContextHolder.getContext().setAuthentication(authResult);		
	}
	
	protected void unsuccessfulAuthentication( HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
		  SecurityContextHolder.clearContext();		
	}

}
