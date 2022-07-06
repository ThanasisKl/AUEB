public class mainList{
	public static void main(String[] args) {
		
		StringQueue<String> Q = new StringQueueImpl<>();
		System.out.println("\nADDING 1,2,3 TO THE QUEUE");
		Q.put("1");;
		Q.put("2");
		Q.put("3");
		System.out.println("QUEUE:");
		Q.printQueue(System.out);
		System.out.println("\nThe value of method peek() is:");
		System.out.println(Q.peek());
		System.out.println("After method get(),QUEUE:");
		Q.get();
		Q.printQueue(System.out);
		System.out.println("\nSize of Queue:");
		System.out.println(Q.size());
		
		System.out.println("----------------------------------------------");
		
		StringStack<String> S = new StringStackImpl<>();
		System.out.println("ADDING A,B,C,D TO THE STACK");
		S.push("A");
		S.push("B");
		S.push("C");
		S.push("D");
		System.out.println("STACK:");
		S.printStack(System.out);
		System.out.println("\nThe value of method peek() is:");
		System.out.println(S.peek());
		System.out.println("After method pop(),QUEUE:");
		S.pop();
		S.printStack(System.out);
		System.out.println("\nSize of Queue:");
		System.out.println(S.size());
		
	}
}