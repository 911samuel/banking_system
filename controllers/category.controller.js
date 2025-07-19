import Category from '../models/Category.js';

const createCategory = async (req, res) => {
  const { name, salaryPerShift, orgId } = req.body;
  if (!name || !salaryPerShift || !orgId) {
    return res.status(400).json({ message: 'Name, salary per shift, and organization ID are required' });
  }
  try {
    const newCategory = await Category.create({ name, salaryPerShift, orgId });
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCategoriesByOrg = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { orgId: req.params.id } });
    res.json(categories);
  } catch (error) {
    console.error('Get categories by organization error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Get category by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const { name, salaryPerShift } = req.body;
    if (name) category.name = name;
    if (salaryPerShift) category.salaryPerShift = salaryPerShift;
    await category.save();
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  createCategory,
  getCategoriesByOrg,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
