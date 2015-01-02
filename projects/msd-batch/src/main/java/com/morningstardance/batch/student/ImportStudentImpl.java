package com.morningstardance.batch.student;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("importStudent")
public class ImportStudentImpl implements ImportStudent {

	@Resource
	MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	MSDStudentClassJPARepository msdStudentClassJPARepository;
	
	@Override
	public void importStudent(String fname) {
		BufferedReader in = null;
		String line = null;
		try {
			FileReader fr = new FileReader(fname);
			in = new BufferedReader(fr);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		try {
			while ((line = in.readLine()) != null) {
				try {
					processRecord(line);
				} 
				catch (Exception ex) {
					ex.printStackTrace();
					System.out.println("error in line: " + line);
				}
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private MSDStudent saveStudent(MSDStudent s) {
		MSDStudent student = msdStudentJPARepository.findByFirstNameAndLastName(s.getFirstName(), s.getLastName());
		if (null != student) { 
			s.setId(student.getId());
			System.out.println("Student already exist: " + s.toString());
			return msdStudentJPARepository.saveAndFlush(s);
		}
		else { 
			return msdStudentJPARepository.save(s);
		}
	}

	private void processRecord(String line) {
		if (line.contains("Given Name")) return;
		
		String [] fields = line.split(",");
		MSDStudent student = new MSDStudent();
		student.setIsActive((byte)1);
		student.setFirstName(fields[0]);
		student.setLastName(fields[1]);
		if (fields.length > 4 && null != fields[4] && !fields[4].isEmpty())
			student.setSchoolName(fields[4]);

		if (fields.length > 3 && null != fields[3] && !fields[3].isEmpty())
			parseStudentParentName(student, fields[3]);
		
		if (fields.length > 6 && null != fields[6] && !fields[6].isEmpty())
			student.setEmailAddress(fields[6]);

		if (fields.length > 7 && null != fields[7] && !fields[7].isEmpty()) {
			parseStudentSecondEmail(student, fields[8]);
		}
		
		if (fields.length > 9) {
			parseStudentPhone(student, fields[9], fields[10]);
		}
		
		if (fields.length > 11) {
			parseStudentSecondPhone(student, fields[11], fields[12]);
		}
		
		student = saveStudent(student);
		
		if (null != student && null != fields[2] && !fields[2].isEmpty()) {
			MSDStudentClass sc = new MSDStudentClass();
			sc.setIsActive((byte)1);
			sc.setMsdStudentId(student.getId().intValue());
			if ("Beginner".equals(fields[2])) 
				sc.setMsdClassId(1);
			else if ("L1sat".equals(fields[2]))
				sc.setMsdClassId(2);
			else if ("L1sat2".equals(fields[2]))
				sc.setMsdClassId(3);
			else if ("L1sun".equals(fields[2]))
				sc.setMsdClassId(4);
			else if ("L2sat".equals(fields[2]))
				sc.setMsdClassId(5);
			else if ("L2sun".equals(fields[2]))
				sc.setMsdClassId(6);
			else if ("L3sat".equals(fields[2]))
				sc.setMsdClassId(7);
			else if ("L3sun".equals(fields[2]))
				sc.setMsdClassId(7);
			else if ("L4sat".equals(fields[2]))
				sc.setMsdClassId(9);
			else if ("L4sun".equals(fields[2]))
				sc.setMsdClassId(10);
			else if ("L5".equals(fields[2]))
				sc.setMsdClassId(11);
			else if ("PP".equals(fields[2]))
				sc.setMsdClassId(12);

			saveStudentClass(sc);
		}
	}

	private void saveStudentClass(MSDStudentClass sc) {
		MSDStudentClass studentClass = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentIdAndIsActive(sc.getMsdClassId(), sc.getMsdStudentId(), (byte) 1);
		if (null != studentClass) {
			System.out.println("Student already register to class: " + studentClass.toString());
		} else {
			msdStudentClassJPARepository.save(sc);
		}
		
	}

	private void parseStudentPhone(MSDStudent student, String type, String number) {
		if (number.contains("/")) {
			String [] numbers = number.split("/");
			if (null != numbers[0] && !numbers[0].isEmpty())
				numbers[0] = numbers[0].replaceAll("-", "");
			if (null != numbers[1] && !numbers[1].isEmpty())
				numbers[1] = numbers[1].replaceAll("-", "");
			
			if ("Home".equals(type))
				student.setHomePhone(numbers[0]);
			else if ("Mobile".equals(type))
				student.setCellPhone(numbers[0]);
			
			if (null == student.getMsdStudentParents() || student.getMsdStudentParents().size() == 0) {
				student.setMsdStudentParents(new ArrayList<MSDStudentParent>());
				student.getMsdStudentParents().add(new MSDStudentParent());
				student.getMsdStudentParents().get(0).setMsdStudent(student);
			}
			student.getMsdStudentParents().get(0).setCellPhone(numbers[1]);
			
		} else {
			if (null != number && !number.isEmpty())
				number = number.replaceAll("-", "");
			
			if ("Home".equals(type))
				student.setHomePhone(number);
			else if ("Mobile".equals(type))
				student.setCellPhone(number);		}
	}

	private void parseStudentSecondPhone(MSDStudent student, String type,String number) {
		if (number.contains("/")) {
			String [] numbers = number.split("/");
			if (null != numbers[0] && !numbers[0].isEmpty())
				numbers[0] = numbers[0].replaceAll("-", "");
			if (null != numbers[1] && !numbers[1].isEmpty())
				numbers[1] = numbers[1].replaceAll("-", "");

			if (null == student.getMsdStudentParents() || student.getMsdStudentParents().size() == 0) {
				student.setMsdStudentParents(new ArrayList<MSDStudentParent>());
				student.getMsdStudentParents().add(new MSDStudentParent());
				student.getMsdStudentParents().get(0).setMsdStudent(student);
				student.getMsdStudentParents().add(new MSDStudentParent());
				student.getMsdStudentParents().get(1).setMsdStudent(student);
			} else if (null == student.getMsdStudentParents() || student.getMsdStudentParents().size() == 1) {
				student.getMsdStudentParents().add(new MSDStudentParent());
				student.getMsdStudentParents().get(1).setMsdStudent(student);
			}
			
			if ("Work".equals(type)) {
				student.getMsdStudentParents().get(0).setWorkPhone(numbers[0]);
				student.getMsdStudentParents().get(1).setWorkPhone(numbers[1]);
			} else if ("Mobile".equals(type)) {
				student.getMsdStudentParents().get(0).setCellPhone(numbers[0]);
				student.getMsdStudentParents().get(1).setCellPhone(numbers[1]);
			}
			
		} else {
			if (null == student.getMsdStudentParents() || student.getMsdStudentParents().size() == 0) {
				student.setMsdStudentParents(new ArrayList<MSDStudentParent>());
				student.getMsdStudentParents().add(new MSDStudentParent());
				student.getMsdStudentParents().get(0).setMsdStudent(student);
			}
			
			if (null != number && !number.isEmpty())
				number = number.replaceAll("-", "");

			if ("Work".equals(type)) 
				student.getMsdStudentParents().get(0).setWorkPhone(number);
			else if ("Mobile".equals(type))
				student.getMsdStudentParents().get(0).setCellPhone(number);
		}
	}

	private void parseStudentSecondEmail(MSDStudent student, String email) {
		if (null == student.getMsdStudentParents() || student.getMsdStudentParents().size() == 0) {
			student.setMsdStudentParents(new ArrayList<MSDStudentParent>());
			student.getMsdStudentParents().add(new MSDStudentParent());
			student.getMsdStudentParents().get(0).setMsdStudent(student);
		}
		
		student.getMsdStudentParents().get(0).setEmailAddress(email);
	}

	private void parseStudentParentName(MSDStudent student, String pname) {
		if (null == pname || pname.length() < 1) return;
		if (null == student.getMsdStudentParents())
			student.setMsdStudentParents(new ArrayList<MSDStudentParent>());

		if (pname.contains("/")) {
			String [] spname = pname.split("/");
			for (String name : spname)
				parseStudentParentName(student, name);
			
			return;
		}

		MSDStudentParent sp = new MSDStudentParent();
		String [] names = null;
		if (pname.contains("-")) {
			names = pname.split("-");
			if (student.getLastName().equals(names[0])) {
				sp.setRelationship("FATHER");
			} else {
				sp.setRelationship("MOTHER");
			}
			sp.setFirstName(names[1]);
			sp.setLastName(names[0]);
		} else if (pname.contains(" ")) {
			names = pname.split(" ");
			if (student.getLastName().equals(names[1])) {
				sp.setRelationship("FATHER");
			} else {
				sp.setRelationship("MOTHER");
			}
			sp.setFirstName(names[0]);
			sp.setLastName(names[1]);
		}
		sp.setMsdStudent(student);
		student.getMsdStudentParents().add(sp);
	}
}
