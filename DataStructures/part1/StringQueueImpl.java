import java.io.PrintStream;
import java.util.NoSuchElementException; 

public class StringQueueImpl<T> implements StringQueue<T>{
	
	private Node<T> head = null;
    private Node<T> tail = null;
	private static int Qsize = 0;
	
	public StringQueueImpl() {
	}
	
	public boolean isEmpty(){
		return head == null;
	}
	
	public void put(T item){                 
		Node<T> n = new Node<>(item);
		Qsize++;
        if (isEmpty()) {
            head = n;
            tail = n;
        } else {
            tail.setNext(n);
            tail = n;
        }
	}
	
	public T get() throws NoSuchElementException{
		if (isEmpty())
            throw new NoSuchElementException();
		Qsize--;
		T data = head.getData();
		if(head == tail){
			head = tail = null;
		}else{
			head = head.getNext();
		}
		return data;
		
	}
	
	public T peek() throws NoSuchElementException{
		if (isEmpty())
            throw new NoSuchElementException();
		T data = head.getData();
		return data;

	}

	public void printQueue(PrintStream stream){
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
		return Qsize;
	}
}