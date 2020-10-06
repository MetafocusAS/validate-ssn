<%@page contentType="text/xml"
   import="java.util.*"
%>
<%
String ssn=""+request.getParameter("ssn");
ssn=ssn.replace("-","");
String code="212121212";
String sum="";
Integer a=0;
Integer b=0;
Integer start=0;

if(ssn.length()>11){
	    if(ssn.length()==12){
				start=2;
		}
		for (int i=0;i<9;i++){
			
			a=Character.digit(ssn.charAt(i+start),10);
			b=Character.digit(code.charAt(i),10);
			sum+=a*b;
		}
		
		a=0;
		for(int j=0;j<sum.length();j++){
			a+=Character.digit(sum.charAt(j),10);
		}
		b=(10-(a % 10))% 10;
		if(b==Character.digit(ssn.charAt(9+start),10)){
			out.print("<test>true</test>");
		}
		else 
			out.print("<test></test>");	
}
else 
		out.print("<test></test>");

%>
