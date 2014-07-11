import java.io.IOException;


public class Contacts {

	public static void main(String[] args) throws IOException {

		DataBaseForAddress dba =  new DataBaseForAddress("test.txt");
		long startTime = System.currentTimeMillis();
		System.out.println("Insert start");
		for(int i=0;i<100;i++){
			dba.insertData(i,"냥냥냥"+i,"0001010");
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Time : " + (endTime-startTime) + "ms");
		
		//System.out.println(dba.getContact(100));
		
	}

}
