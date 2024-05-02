const Category = require("../models/categorySchema");




//SHOWING CATEGORY PAGE
const categoryPage = async (req, res) => {
  try {
    const dbData = await Category.find({});

    res.render("categoryManegement", { dbData: dbData });
  } catch (error) {
    console.log(error.message);
  }
};





//SHOWING ADD CATEGORY
const addCategoryPage = async (req, res) => {
  try {
    res.render("addCategory");
  } catch (error) {
    console.log(error.message);
  }
};




//ADDING CATEGORY
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const regexPattern = new RegExp(`^${name}$`,'i')
    const look = await Category.find({ name: regexPattern });
    if (look[0]) {
      res.render("addCategory", {
        message: "The category name altready exist",
      });
    } else {
      const category = new Category({
        name: name,
        description: description,
        isBlocked: false,
      });
      const check = await category.save();
      if (check) {
        res.render("addCategory", { message: "The category has been added" });
      } else {
        res.render("addCategory", {
          message: "There is a problem with add category please try again",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};





//UNLISTING CATEGORY
const unlistCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const check = await Category.findByIdAndUpdate(category_id, {
      isBlocked: true,
    });
    res.redirect("/admin/categoryManegement");
  } catch (error) {
    console.log("here is the problem  ");
  }
};





//LISTING CATEGORY
const listCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const check = await Category.findByIdAndUpdate(category_id, {
      isBlocked: false,
    });
    res.redirect("/admin/categoryManegement");
  } catch (error) {
    console.log("here is the problem yes");
  }
};

module.exports = {
  categoryPage,
  addCategoryPage,
  addCategory,
  unlistCategory,
  listCategory,
};
