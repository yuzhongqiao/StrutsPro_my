package util;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.ehcache.constructs.web.filter.Filter;

public class LoginFilter extends Filter{

	@Override
	protected void doDestroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void doFilter(HttpServletRequest req, HttpServletResponse resp,
			FilterChain chain) throws Throwable {
		// TODO Auto-generated method stub
		HttpServletRequest request=(HttpServletRequest)req;
		HttpServletResponse response=(HttpServletResponse)resp;
		HttpSession session=request.getSession();
		if(session.getAttribute("loginUser")==null){
			request.setAttribute("message", "您还没有登录，请先登录！");
			request.getRequestDispatcher("/index.jsp").forward(request, response);
		}else{
			chain.doFilter(request, response);
		}
		
	}

	@Override
	protected void doInit(FilterConfig arg0) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
