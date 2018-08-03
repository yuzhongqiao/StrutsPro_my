package util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.jidian.ssh.entity.Emp;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class MyInterceptor extends AbstractInterceptor{

	@Override
	public String intercept(ActionInvocation arg0) throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		Emp emp=(Emp) session.getAttribute("loginUser");
		if(emp==null){
			session.setAttribute("message", "还未登录！");
			return "noLogin";
		}else{
			return arg0.invoke();
		}
	}

}
