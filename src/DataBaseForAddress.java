import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.RandomAccessFile;
import java.util.HashMap;
import java.util.Scanner;

public class DataBaseForAddress {

	private String filename;
	private HashMap<Integer, DTO> map;
	public DataBaseForAddress(String filename) throws FileNotFoundException {
		super();
		this.filename = filename;
		PrintWriter writer = new PrintWriter(this.filename);
		writer.print("");
		writer.close();
		this.map = readData();
	}
	
	public HashMap<Integer, DTO> readData() throws FileNotFoundException {
		Scanner scanner = new Scanner(new FileReader(this.filename));

		HashMap<Integer, DTO> map = new HashMap<Integer, DTO>();

		while (scanner.hasNextLine()) {
			String[] values = scanner.nextLine().split(" ");
			DTO dto = new DTO();
			dto.setName(values[1]);
			dto.setPhone(values[2]);
			map.put(Integer.parseInt(values[0]), dto);
		}
		scanner.close();
		return map;
	}

	public DTO getContact(int index){
		return this.map.get(index);
	}
	
	public void insertData(int index, String name, String phone) throws IOException {
		if(map.containsKey(index)){
			System.out.println("Duplicated index");
		} else {
			DTO dto = new DTO();
			dto.setName(name);
			dto.setPhone(phone);		
			this.map.put(index, dto);
		}
		//saveAtNthLine(index, this.map.get(index).get("name"), this.map.get(index).get("phone"));
		appendData(index, name, phone);
	}
	
	public void appendData(int index, String name, String phone) {
		try {
			BufferedWriter out = new BufferedWriter(new FileWriter(this.filename, true));	
			out.write(index+" "+name+" "+phone);
			out.newLine();
			/*
			Set<Entry<Integer, HashMap<String, String>>> set = this.map.entrySet();

			Iterator<Entry<Integer, HashMap<String, String>>> it = set
					.iterator();

			while (it.hasNext()) {
				Map.Entry<Integer, HashMap<String, String>> e = (Map.Entry<Integer, HashMap<String, String>>) it
						.next();
				HashMap<String, String> label = e.getValue();
				out.write(e.getKey() + " " + label.get("name") + " "
						+ label.get("phone"));
				out.newLine();
			}
			*/
			out.close();
		} catch (Exception ex) {

		}
	}

	
	
	public void saveAtNthLine(int index, String name, String phone) throws IOException {
	    RandomAccessFile raf = new RandomAccessFile(this.filename, "rw");

	    // Leave the n first lines unchanged.
	    for (int i = 0; i < index; i++)
	        raf.readLine();
	    raf.writeUTF(index+" "+name+" "+phone+"\n");
	    
	    /*
	    // Shift remaining lines upwards.
	    long writePos = raf.getFilePointer();
	    raf.readLine();
	    long readPos = raf.getFilePointer();

	    byte[] buf = new byte[1024];
	    int n;
	    while (-1 != (n = raf.read(buf))) {
	        raf.seek(writePos);
	        raf.write(buf, 0, n);
	        readPos += n;
	        writePos += n;
	        raf.seek(readPos);
	    }

	    raf.setLength(writePos);
	    */
	    raf.close();
	}	
	
}