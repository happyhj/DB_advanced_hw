package generics;

public class Generic2 {
	private Object[] list;
	private int size = 4;
	private int cursorForAdd = 0;
	private int cursorForGet = -1;
	
	public Generic2() {
		list = new Object[size];
	}
	
	public void add(Object obj) {
		list[cursorForAdd] = obj;
		cursorForAdd++;
		if(cursorForAdd == size) {
			size *=2;
			Object temp[] = new Object[size];
			for(int i=0 ; i<cursorForAdd ; i++) {
				temp[i] = list[i];
			}
			list = temp;
		}
	}
	
	public boolean next() {
		if(cursorForGet < cursorForAdd - 1){
			cursorForGet++;
			return true;
		} else {
			return false;
		}
	}
	
	public Object get() {
		return list[cursorForGet];
	}
}
