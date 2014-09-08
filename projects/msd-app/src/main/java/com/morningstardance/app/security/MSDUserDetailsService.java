package com.morningstardance.app.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morningstardance.domain.entity.MsdUser;
import com.morningstardance.domain.entity.MsdUserRole;
import com.morningstardance.domain.springdata.jpa.repository.UserJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.UserRoleJPARepository;

@Service("msdUserDetailsService")
@Transactional(readOnly = true)
public class MSDUserDetailsService implements UserDetailsService {

	@Autowired
	private UserJPARepository userJPARepository;
	
	@Autowired
	private UserRoleJPARepository userroleJPARepository;
 
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			MsdUser msduser = userJPARepository.findByUsername(username);

			boolean enabled = true;
			boolean accountNonExpired = true;
			boolean credentialsNonExpired = true;
			boolean accountNonLocked = true;
			
			if (null == msduser) 
				throw new UsernameNotFoundException(username);
			
			if (msduser.getStatus() != 1)
				enabled = false;
			
			return new User(
					msduser.getUsername(), 
					msduser.getPassword(),
					enabled,
					accountNonExpired,
					credentialsNonExpired,
					accountNonLocked,
					getAuthorities(msduser.getId().intValue()));
		} catch (UsernameNotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public Collection<? extends GrantedAuthority> getAuthorities(int userId) {
		List<MsdUserRole> roles = userroleJPARepository.findByUserId(userId);
		List<String> roleStrings = new ArrayList<String>();
		for (MsdUserRole role : roles) {
			switch(role.getRole()) {
			case 1:
				roleStrings.add("ROLE_USER");
				break;
			case 2:
				roleStrings.add("ROLE_ADMIN");
				break;
			default:
				;
			}
		}
		
		List<GrantedAuthority> authList = getGrantedAuthorities(roleStrings);
		return authList;
	}

	public static List<GrantedAuthority> getGrantedAuthorities(List<String> roles) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}
		return authorities;
	}
}
