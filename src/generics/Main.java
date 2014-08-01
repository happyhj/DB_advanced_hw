package generics;

public class Main {

	public static void main(String[] args) {
		Generic<String> g = new Generic<String>();

		g.add("a");
		g.add("b");
		g.add("c");
		
		while(g.next()) {
			System.out.println(g.get());
		}
		
		Generic2 g2 = new Generic2();

		g2.add("a");
		g2.add("b");
		g2.add("c");
		g2.add("d");
		g2.add("e");
		
		while(g2.next()) {
			System.out.println(g2.get());
		}
	}

}
