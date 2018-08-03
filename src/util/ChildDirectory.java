package util;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ChildDirectory {
	public static String getChildDirectory(String realPath){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String path = sdf.format(date);
		File file =new File(realPath,path);
		if(!file.exists()){
			file.mkdirs();
		}
		return path;
	}
	
	public static String getChild(){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmssSS");
		String path = sdf.format(date);
		
		return path;
	}
}
