// Check if user is logged in
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display user name
    const user = JSON.parse(currentUser);
    document.getElementById('userName').textContent = user.name;
    
    // Load products
    loadProducts();
    
    // Set up category filters
    setupFilters();
    
    // Set up logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Set up search functionality
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Add event listener to product grid for viewing details
    document.getElementById('productsGrid').addEventListener('click', (e) => {
        if (e.target.closest('.product-card')) {
            const productId = e.target.closest('.product-card').getAttribute('data-id');
            viewProductDetails(productId);
        } else if (e.target.classList.contains('add-to-cart')) {
            e.stopPropagation();
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        } else if (e.target.classList.contains('view-details')) {
            e.stopPropagation();
            const productId = e.target.getAttribute('data-id');
            viewProductDetails(productId);
        }
    });
});

// Load products from JSON file
async function loadProducts(category = 'all') {
    try {
        // Show loading animation
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
        
        // In a real application, this would be an API call
        // For this example, we'll use a simulated response with more products
        setTimeout(() => {
            const products = [
                {
                    id: 1,
                    name: "Mango Tree (আম)",
                    category: "fruit",
                    price: 29.99,
                    image: "https://images.unsplash.com/photo-1553272725-086d8df16c97",
                    description: "Mango trees are tropical trees that produce sweet, juicy fruits. They require warm climates and well-drained soil.",
                    planting: "Plant in full sun with plenty of space for growth. Water regularly during the first few years.",
                    uses: "Produces delicious fruits, provides shade, and has ornamental value.",
                    facts: "Mango is the national fruit of India, Pakistan, and the Philippines. A single tree can live for over 100 years."
                },
                {
                    id: 2,
                    name: "Jackfruit Tree (কাঁঠাল)",
                    category: "fruit",
                    price: 39.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Jackfruit trees produce the world's largest tree-borne fruits, weighing up to 55 kg.",
                    planting: "Requires tropical climate, well-drained soil, and plenty of space.",
                    uses: "Fruits are edible, wood is used for furniture, and latex has various uses.",
                    facts: "Jackfruit is a popular meat substitute due to its texture when unripe."
                },
                {
                    id: 3,
                    name: "Krishnachura (Delonix regia)",
                    category: "flowering",
                    price: 49.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Known for its stunning red flowers that cover the tree during blooming season.",
                    planting: "Thrives in tropical climates with well-drained soil and full sun.",
                    uses: "Primarily ornamental, provides excellent shade during summer.",
                    facts: "The flowers are so vibrant that they can make entire landscapes appear red during peak bloom."
                },
                {
                    id: 4,
                    name: "Teak Tree (সেগুন)",
                    category: "timber",
                    price: 79.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Premium timber tree known for its durability and water resistance.",
                    planting: "Grows best in well-drained soil with moderate rainfall.",
                    uses: "High-quality furniture, shipbuilding, and construction.",
                    facts: "Teak wood contains natural oils that make it resistant to termites and rotting."
                },
                {
                    id: 5,
                    name: "Neem Tree (নিম)",
                    category: "medicinal",
                    price: 34.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Medicinal tree with numerous health benefits and insect-repelling properties.",
                    planting: "Grows in various soil types, drought-resistant once established.",
                    uses: "Medicinal purposes, natural pesticide, and air purification.",
                    facts: "Neem is called 'the village pharmacy' in India due to its many medicinal uses."
                },
                {
                    id: 6,
                    name: "Banyan Tree (বট)",
                    category: "shade",
                    price: 89.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Massive tree with aerial roots that grow into secondary trunks.",
                    planting: "Requires ample space to grow, prefers well-drained soil.",
                    uses: "Provides extensive shade, often planted in parks and large spaces.",
                    facts: "The Great Banyan in India covers 4.67 acres and is over 250 years old."
                },
                {
                    id: 7,
                    name: "Banana Tree (কলা)",
                    category: "fruit",
                    price: 24.99,
                    image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf",
                    description: "Fast-growing plant that produces nutritious fruits.",
                    planting: "Prefers rich, well-drained soil and plenty of water.",
                    uses: "Fruit production, leaves used for cooking and serving food.",
                    facts: "Banana plants are not trees but giant herbs, and each plant produces only one bunch of bananas."
                },
                {
                    id: 8,
                    name: "Guava Tree (পেয়ারা)",
                    category: "fruit",
                    price: 27.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Small tree that produces fragrant, nutrient-rich fruits.",
                    planting: "Adapts to various soil types, prefers full sun.",
                    uses: "Fruit production, medicinal leaves, and ornamental value.",
                    facts: "Guava contains 4 times more vitamin C than oranges."
                },
                {
                    id: 9,
                    name: "Coconut Tree (নারকেল)",
                    category: "fruit",
                    price: 44.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Palm tree that produces coconuts and grows in tropical coastal areas.",
                    planting: "Requires sandy soil, full sun, and high humidity.",
                    uses: "Food, oil, fiber, building materials, and many other uses.",
                    facts: "Every part of the coconut tree has economic value, earning it the name 'tree of life'."
                },
                {
                    id: 10,
                    name: "Ashok Tree (অশোক)",
                    category: "ornamental",
                    price: 37.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Beautiful evergreen tree with dense foliage and fragrant flowers.",
                    planting: "Prefers well-drained soil and partial to full sun.",
                    uses: "Ornamental planting, religious significance in Hinduism and Buddhism.",
                    facts: "The Ashok tree is mentioned in the Ramayana as the tree under which Sita was held captive."
                },
                {
                    id: 11,
                    name: "Sal Tree (শাল)",
                    category: "timber",
                    price: 64.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Large deciduous tree valued for its hard and durable timber.",
                    planting: "Grows in well-drained soil, common in deciduous forests.",
                    uses: "Construction, railway sleepers, furniture, and resin production.",
                    facts: "Sal tree is sacred to Hindus and Buddhists, believed to be the birthplace of Lord Buddha."
                },
                {
                    id: 12,
                    name: "Arjun Tree (অর্জুন)",
                    category: "medicinal",
                    price: 42.99,
                    image: "https://images.unsplash.com/photo-1596436889106-be35e8435c75",
                    description: "Medicinal tree known for its cardiovascular benefits.",
                    planting: "Prefers moist, well-drained soil and full sun to partial shade.",
                    uses: "Medicinal purposes, particularly for heart health, and ornamental planting.",
                    facts: "The bark of the Arjun tree has been used in Ayurvedic medicine for over 3000 years."
                }
            ];
            
            displayProducts(products, category);
        }, 1000); // Simulate loading delay
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="error">Failed to load products. Please try again later.</p>';
    }
}

// Display products in the grid
function displayProducts(products, category) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-id', product.id);
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="view-details" data-id="${product.id}">Details</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Set up category filters
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Filter products
            const category = e.target.getAttribute('data-category');
            loadProducts(category);
        });
    });
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.trim() === '') {
        loadProducts();
        return;
    }
    
    // Show loading animation
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
    
    // Simulate API call
    setTimeout(() => {
        // This would normally be an API call to search products
        // For demo, we'll use the same products array and filter
        const products = []; // This would be the full products array
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts, 'all');
    }, 500);
}

// Add product to cart
function addToCart(productId) {
    // In a real application, this would update a cart in state or localStorage
    showToast(`Product added to cart!`, true);
    
    // Save to localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === parseInt(productId));
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: parseInt(productId),
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// View product details
function viewProductDetails(productId) {
    // Save the product ID to localStorage and redirect to details page
    localStorage.setItem('viewingProduct', productId);
    window.location.href = 'product-details.html';
}

// Show toast notification
function showToast(message, isSuccess = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${isSuccess ? 'success' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}