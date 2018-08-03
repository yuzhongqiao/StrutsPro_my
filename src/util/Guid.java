package util;

import java.math.BigInteger;
import java.util.Random;

public class Guid {
	public static String guid(){
		String id =new BigInteger(165,new Random()).toString(36).toUpperCase();
		return id;
	}
}
