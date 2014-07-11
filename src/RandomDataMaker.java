

public class RandomDataMaker {
	private int sizeOfName = 3;
	private int sizeOfPhone = 11;
	public String makeName() {
		char[] charArray = new char[sizeOfName];
		
		for(int i = 0 ;  i < sizeOfName ; i++) {
			charArray[i] = (char) ((Math.random() * 11172) + 0xAC00);
		}
		
		String name = String.valueOf(charArray);
		
		return name;
	}
	
	public String makePhone() {
		StringBuilder sb = new StringBuilder();
		
		for(int i = 0 ;  i < sizeOfPhone ; i++) {
			int temp = (int) (Math.random()*10);
			sb.append(String.valueOf(temp));
		}
		
		String phone = sb.toString();
		
		return phone;
	}
}
