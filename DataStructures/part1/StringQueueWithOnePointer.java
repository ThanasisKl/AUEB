import java.io.PrintStream;
import java.util.NoSuchElementException;

public class  StringQueueWithOnePointer<T> {

    private Node<T> headail = null;
    private static int CirclQsize;
    
    public StringQueueWithOnePointer(){
    }

    public boolean isEmpty(){
        return headail == null;
    }

    public void put(T item){                     
		Node<T> n = new Node<>(item);
		CirclQsize++;
		if (isEmpty()){
			n.setNext(n);
		}else{
			n.setNext(headail.getNext());
			headail.setNext(n);
		}
		headail = n;
	}

	public T get() throws NoSuchElementException{               
		if (isEmpty())
            throw new NoSuchElementException();
		CirclQsize--;
		T data = headail.getData();
		if(headail.getNext() == headail){
			headail = null;
		}else{
			headail.setNext(headail.getNext().getNext());
		}
		return data;
	}

	public T peek() throws NoSuchElementException{
		if (isEmpty())
            throw new NoSuchElementException();
		return headail.getNext().getData();

	}

	public void printQueue(PrintStream stream){
		if (isEmpty()){
            System.out.println("List is empty ");
		}else{
			Node iterator = headail.getNext();
			for(int i=1; i <= size() ; i++){
				System.out.print(iterator.getData()+" ");
				iterator = iterator.getNext();
			}			
		}
	}

	public int size(){
		return CirclQsize;
	}

}