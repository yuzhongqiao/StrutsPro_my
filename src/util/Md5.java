package util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5 {
	public static String md5(String pwd) {
		MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("md5");
			md5.update(pwd.getBytes());
			pwd = new BigInteger(1,md5.digest()).toString(16);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}	
		return pwd;
	}
}
