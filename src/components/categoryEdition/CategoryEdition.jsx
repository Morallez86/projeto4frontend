import React, { useState } from 'react';
import CategoryComboBox from './categoryComboBox';
import { userStore } from "../../stores/UserStore";

function CategoryEdition() {
  const [newCategoryTitle, setNewCategoryTitle] = useState(""); // State variable for new category title
  const [selectedCategory, setSelectedCategory] = useState(""); // State variable to store the selected category
  const [isAddCategorySelected, setIsAddCategorySelected] = useState(true); // State variable to track if "Add category" is selected
  const token = userStore((state) => state.token); // Get token from store
  const username2 = userStore((state) => state.username);

  // Function to handle adding a new category
  const handleAddCategory = () => {
    // Check if token is available
    if (!token) {
      console.error("Token is missing. Unable to add category.");
      return;
    }

    // Check if new category title is provided
    if (!newCategoryTitle) {
      console.error("New category title is missing. Unable to add category.");
      return;
    }

    // Create addCategoryBody for the POST request
    const addCategoryBody = {
        title: newCategoryTitle,
        id: 0,
        description: "nope",
        owner: username2
    };

    // Make a POST request to add a new category
    fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(addCategoryBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      // Reset the new category title input
      setNewCategoryTitle("");
      setIsAddCategorySelected(true); // Reset the state
      // Refresh the category list
      // You can call a function to refresh the category list here
    })
    .catch(error => {
      console.error('Error adding category:', error);
    });
  };

  const handleDeleteCategory = () => {
    // Check if token is available
    if (!token) {
      console.error("Token is missing. Unable to delete category.");
      return;
    }

    // Check if category title is provided
    if (!selectedCategory) {
      console.error("Category title is missing. Unable to delete category.");
      return;
    }

    // Make a DELETE request to delete the category
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/delete?title=${selectedCategory}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      // Refresh the category list
      setNewCategoryTitle("");
      // You can call a function to refresh the category list here
    })
    .catch(error => {
      console.error('Error deleting category:', error);
    });
  };

  const handleRenameCategory = () => {
    // Check if token is available
    if (!token) {
      console.error("Token is missing. Unable to delete category.");
      return;
    }

    // Check if category title is provided
    if (!selectedCategory) {
      console.error("Category title is missing. Unable to delete category.");
      return;
    }

    
    // Create addCategoryBody for the POST request
    const renameCategoryBody = {
        title: newCategoryTitle,
        description: "nope",
    };

    // Make a DELETE request to delete the category
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/update?title=${selectedCategory}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(renameCategoryBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      // Refresh the category list
      setNewCategoryTitle("");
      // You can call a function to refresh the category list here
    })
    .catch(error => {
      console.error('Error deleting category:', error);
    });
  };

  // Function to handle selecting an option in the CategoryComboBox
  const handleCategorySelect = (selectedValue) => {
    console.log(selectedValue);
    setIsAddCategorySelected(selectedValue === "");
    setSelectedCategory(selectedValue); // Set the selected category
  };

  return (
    <div className="text-white mt-8 flex justify-center items-center">
      <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div>
          <h1 className="text-4xl font-bold text-center mb-6">Category Edition:</h1>
          <div className="flex justify-between items-center space-x-32 mt-10">
            <div >
              <label className="mr-2" htmlFor="taskFilter">Categories:</label>
              <CategoryComboBox onRefresh={handleCategorySelect} /> {/* Pass the onRefresh function */}
            </div>
            <div>
              <label htmlFor="categoryInput">Category Title:</label>
              <input 
                type="text" 
                id="categoryInput" 
                value={newCategoryTitle} 
                onChange={(e) => setNewCategoryTitle(e.target.value)} 
                className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 py-2.5 text-sm" 
                placeholder="Category title" 
              />
            </div>
          </div>
          <div className="flex justify-end space-x-24 mt-20">
            { isAddCategorySelected && (
            <button 
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-green-500 text-white hover:bg-green-700 py-2 transition-colors duration-300" 
              onClick={handleAddCategory} // Call the function to add a new category
            >
              Add Category
            </button>
            )}
            { !isAddCategorySelected && (
              <>
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-gray-500 text-white hover:bg-gray-700 py-2 transition-colors duration-300"
                onClick={handleRenameCategory}
                >Rename Category
                </button>
                <button 
                  className="w-full mb-4 text-[18px] mt-6 rounded-full bg-red-500 text-white hover:bg-red-700 py-2 transition-colors duration-300" 
                  onClick={handleDeleteCategory} // Call the function to delete a category
                >
                  Delete Category
                </button>
                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryEdition;