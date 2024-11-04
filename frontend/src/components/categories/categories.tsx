const Categories: React.FC = () => {
    const categories = ['Fictional', 'Non-fictional', 'Horror', 'Sci-Fi', 'Romance', 'History', 'Biography', 'Psychology','Politics', 'Thriller', 'Mystery', 'Education', 'Science', 'Comics'];
    return (
        <div className="text-primary_4 mt-5 pb-16 border-b-2 border-accent-primary_4_light mx-20">
            <p className="text-center font-bold text-lg mb-3">Categories</p>

            <div className="right-24 absolute flex gap-3">
                {categories.map((category, index) => (
                    <div key={index} className="border py-2 px-6 rounded-lg shadow bg-primary_4 cursor-pointer">
                        <p className="font-semibold text-primary_2">{category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories;
