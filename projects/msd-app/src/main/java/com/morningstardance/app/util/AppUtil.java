package com.morningstardance.app.util;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.codec.Base64;
import org.springframework.util.DigestUtils;

public class AppUtil {

	public static String getSessionId(ServletRequest request) {
		String sessionId = "";
		if (request instanceof HttpServletRequest) {
			HttpSession session = ((HttpServletRequest) request)
					.getSession(true);
			if (session != null) {
				sessionId = session.getId();
			}
		}
		return sessionId;
	}

	public static String getProcessTimer() {
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG,
				DateFormat.LONG, Locale.US);

		String formattedDate = dateFormat.format(date);
		return formattedDate;
	}

	public static String getMd5Base64Digest(String s) {
		if (s != null) {
			byte[] digest = DigestUtils.md5Digest(s.getBytes());
			byte[] base64Digest = Base64.encode(digest);
			return new String(base64Digest);
		}
		return null;
	}

}
