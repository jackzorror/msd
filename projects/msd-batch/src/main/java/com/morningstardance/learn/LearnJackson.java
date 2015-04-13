package com.morningstardance.learn;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.morningstardance.app.msdstudentfeepayment.MSDStudentFeePaymentDto;

public class LearnJackson {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
			LearnJackson learn = new LearnJackson();
			learn.run();
	}
	
	void run() {

			ObjectMapper mapper = new ObjectMapper();
			DateFormat nf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			DateFormat nf1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
			mapper.setDateFormat(nf);
			
			try {
				String fname = "/Users/junzuo/test/msdstudentfeepayment.json";
				@SuppressWarnings("unchecked")
				List<MSDStudentFeePaymentDto> values = mapper.readValue(new File(fname), new TypeReference<List<MSDStudentFeePaymentDto>>(){});

				for (MSDStudentFeePaymentDto dto : values) {
					System.out.println(dto.toString());
					Date pt = dto.getPayTime();
					if (null != pt) {
					System.out.println(" nf : " + nf.format(pt));
					System.out.println(" nf1 : " + nf1.format(pt));
					}
				}
			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}

}
