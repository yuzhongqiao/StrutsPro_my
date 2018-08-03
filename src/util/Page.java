package util;


import java.io.Serializable;
import java.util.List;

public class Page implements Serializable {
	private int current;//当前页码
	private int up;//上一页
	private int next;//下一页
	private int allpages;//最大页码
	private int allcount;//多少条数据
	private int pis;//每页多少条

	public int getCurrent() {
		return current;
	}
	public void setCurrent(int current) {
		this.current = current;
	}
	public int getUp() {
		this.up=this.current-1;
		if(up<1){
			up=1;
		}
		
		return up;
	}
	public void setUp(int up) {
		this.up = up;
	}
	public int getNext() {
		this.next=this.current+1;
		if(next>allpages){
			next=this.allpages;
		}
		
		return next;
	}
	public void setNext(int next) {
		this.next = next;
	}
	public int getAllpages() {
		return allpages;
	}
	public void setAllpages(int allpages) {
		this.allpages = allpages;
	}
	public int getAllcount() {
		return allcount;
	}
	public void setAllcount(int allcount) {
		this.allcount = allcount;
	}
	
	public void setpage(int allcount,int pis){
		this.pis=pis;
		this.allcount=allcount;
		this.allpages=allcount%pis==0?allcount/pis:(allcount/pis)+1;
	}
}
