export interface Books {
    _id: string;
    title: string;
    author: string;
    publishedDate: Date;
    genres: string[];
    summary?: string;
    description?: string;
    pageCount: number;
    language: string;
    isbn: string;
    publisher?: string;
    availableCopies: number;
    coverImageUrl: string;
    price: number;
    coverType: string;
    dimensions: string;
    reviews: number;
    stars: number;
};

export interface BookContextProps {
    book: Books | null;
    setBook: React.Dispatch<React.SetStateAction<Books | null>>;
    books: Books[];
    filteredBook: Books[];
    loading: boolean;
    error: string | null;
    fetchBooks: () => Promise<boolean>;
    fetchBookById: (id: string) => Promise<boolean>;
    filterBooksByCategory: (category: string | null) => void;
    selectedCategory: string | null;
    resetCategory: () => void;
    filterBooksByTitle: (title: string) => void;
};

export interface AuthContextProps {
    user: { id: string; name: string; email: string } | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    error: string | null;
}

export interface CartItem {
    productId: Books;
    quantity: number;
    price: number;
}

export interface CartContextProps {
    cart: CartItem[];
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: { code: number | null; message: string | null } | null;
    setError: React.Dispatch<{ code: number | null; message: string | null } | null>;
    addItemToCart: (productId: string, quantity?: number) => Promise<boolean>;
    removeItemFromCart: (productId: string) => Promise<boolean>;
    updateCart: (productId: string, quantity: number) => Promise<boolean>;
    clearCart: () => Promise<boolean>;
    fetchCart: () => Promise<boolean>;
}

export interface WishlistItem {
    itemId: string; 
    title: string;
    author: string;
    price: number;
    coverImageUrl?: string; 
}

export interface WishlistContextProps {
    wishlist: WishlistItem[]; 
    loading: boolean; 
    error: { code: number | null; message: string | null } | null; 
    setLoading: (loading: boolean) => void; 
    setError: (error: { code: number | null; message: string | null } | null) => void; 
    fetchWishlist: () => Promise<boolean>;
    addItemToWishlist: (itemId: string) => Promise<boolean>;
    removeItemFromWishlist: (itemId: string) => Promise<boolean>; 
}
