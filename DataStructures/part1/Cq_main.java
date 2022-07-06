public class Cq_main{
	public static void main(String[] args) {
		
		StringQueueWithOnePointer<String> Q = new StringQueueWithOnePointer<>();
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
	}
}