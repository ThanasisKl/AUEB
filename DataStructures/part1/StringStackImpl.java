import java.io.PrintStream;
import java.util.NoSuchElementException;

public class StringStackImpl<T> implements StringStack<T>{
	
	private Node<T> head = null;
    private Node<T> tail = null;
	private static int StackSize = 0;
	
	public StringStackImpl() {
	}
	
	public boolean isEmpty(){
        return head == null;
    }

	
	
	public void push(T item){         		
		Node<T> n = new Node<>(item);
		StackSize++;
        if (isEmpty()) {
            head = n;
            tail = n;
        } else {
            n.setNext(head);
            head = n;
        }
	}
	
	public T pop() throws NoSuchElementException{             
		if (isEmpty())
            throw new NoSuchElementException();
        T data = head.getData();
		StackSize--;
        if (head == tail)
            head = tail = null;
        else
            head = head.getNext();

        return data;
	}

	
	public T peek() throws NoSuchElementException{
		if (isEmpty())
            throw new NoSuchElementException();
		T data = head.getData();
		return data;
	}
	
	public void printStack(PrintStream stream){
		if (isEmpty()){
            System.out.println("List is empty ");
		}else{
            Node<T> iterator = head;
			for(int i=1; i <= size() ; i++){
				System.out.print(iterator.getData()+" ");
				iterator = iterator.getNext();
			}		
		}
	}
	
	public int size(){
		return StackSize;
	}
}