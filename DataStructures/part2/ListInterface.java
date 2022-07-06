public interface ListInterface<T> {

	public Node<T> getHead();

    void insertAtFront(T data);

    void insertAtBack(T data);

    T removeFromFront() throws EmptyListException;

    T removeFromBack() throws EmptyListException;

    boolean isEmpty();
}
