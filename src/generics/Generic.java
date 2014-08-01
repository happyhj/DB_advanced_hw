package generics;

import java.util.ArrayList;

public class Generic<T> {
	private ArrayList<T> list;
	private int cursor;
	
	public Generic() {
		list =  new ArrayList<T>();
		cursor = -1;
	}

	public void add(T element) {
		list.add(element);
	}
	

	
	public boolean next() {
		if(cursor < list.size()-1) {
			cursor++;
			return true;
		} else {
			return false;
		}
	}
	
	public T get() {
		return list.get(cursor);
	}
}
